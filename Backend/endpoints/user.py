from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from sqlalchemy import text, delete, func, select
from db_module.session import get_sql_db
from models.user import (
    Bet_Color,
    Bet_Number,
    Winner_Table,
    All_Time_Winner_Table,
    User,
    Result,
)
from schema.user import betdetails, user_info, password_detail, result_detail
from utils.verify import hash_password
from jwtAuth import authenticate_user
import pandas as pd
from utils.logger import setup_logger

router = APIRouter()
logger = setup_logger()


def is_convertible_to_number(some_string):
    try:
        int(some_string)
        return int(some_string)
    except ValueError:
        return False


@router.post("/create-user/")
async def create_user(user_info: user_info, db: Session = Depends(get_sql_db)):
    try:
        user = (
            db.query(User).filter(User.mobile_number == user_info.mobile_number).first()
        )
        if user:
            raise HTTPException(status_code=400, detail="Mobile number Already Exist")

        new_user = User(
            mobile_number=user_info.mobile_number,
            username=user_info.username,
            password=hash_password(user_info.password),
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return {"status_code": 200, "message": "User created Successfully"}
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)


@router.patch("/change-password/")
async def change_password(
    password_detail: password_detail,
    credentials: HTTPAuthorizationCredentials = Depends(authenticate_user),
    db: Session = Depends(get_sql_db),
):
    try:
        user = (
            db.query(User)
            .filter(User.mobile_number == credentials.mobile_number)
            .first()
        )
        if not user:
            raise HTTPException(status_code=400, detail="Do not Found User")

        if user.password == hash_password(password_detail.password):
            raise HTTPException(status_code=400, detail="Try New Password")

        user.password = hash_password(password_detail.password)
        db.commit()

        return {"status_code": 200, "message": "Password Changed Successfully"}
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)


@router.post("/create-bet/")
async def create_bet(
    betdetails: betdetails,
    credentials: HTTPAuthorizationCredentials = Depends(authenticate_user),
    db: Session = Depends(get_sql_db),
):
    try:
        user = (
            db.query(User)
            .filter(User.mobile_number == credentials.mobile_number)
            .first()
        )
        if not user:
            raise HTTPException(status_code=400, detail="Try to login Again")

        if user.balance < betdetails.bet_amount:
            raise HTTPException(status_code=400, detail="Insufficient Balance")

        user.balance = user.balance - betdetails.bet_amount

        if is_convertible_to_number(betdetails.bet_on):
            new_bet = Bet_Number(
                mobile_number=credentials.mobile_number,
                bet_amount=betdetails.bet_amount,
                bet_on=int(betdetails.bet_on),
            )

            db.add(new_bet)
            db.commit()
            db.refresh(new_bet)
        else:
            new_bet = Bet_Color(
                mobile_number=credentials.mobile_number,
                bet_amount=betdetails.bet_amount,
                bet_on=betdetails.bet_on,
            )

        db.add(new_bet)
        db.commit()
        db.refresh(new_bet)

        return {"status_code": 200, "message": f"created bet on {betdetails.bet_on}"}
    except HTTPException as e:
        logger.error(str(e))
        raise HTTPException(status_code=e.status_code, detail=e.detail)


# async def determine_winners(
#     result_color, result_number, total_amount_bet, winner_dict, minimum_loss_dict
# ):
#     try:
#         for i in range(0, 10):
#             total_amount_won = 0
#             minIndex = result_number["total_bet_amount"].nsmallest(i + 1).index[-1]
#             min_number = result_number.loc[minIndex, "bet_on"]

#             winner_dict["number_who_won"] = []
#             winner_dict["color_who_won"] = []

#             winner_dict["number_who_won"].append(min_number)

#             total_amount_won = (
#                 result_number["total_bet_amount"].iloc[minIndex] * 0.98 * 9
#             )
#             if min_number % 2 == 0:
#                 if min_number != 0:
#                     total_amount_won = (
#                         total_amount_won
#                         + result_color[result_color["bet_on"] == "red"][
#                             "total_bet_amount"
#                         ].iloc[0]
#                         * 0.98
#                         * 2
#                     )
#                     winner_dict["red"] = 2
#                 else:
#                     total_amount_won = (
#                         total_amount_won
#                         + result_color[result_color["bet_on"] == "red"][
#                             "total_bet_amount"
#                         ].iloc[0]
#                         * 0.98
#                         * 1.5
#                     )
#                     winner_dict["red"] = 1.5

#                 winner_dict["color_who_won"].append("red")

#             if min_number % 2 != 0:
#                 if min_number != 5:
#                     total_amount_won = (
#                         total_amount_won
#                         + result_color[result_color["bet_on"] == "green"][
#                             "total_bet_amount"
#                         ].iloc[0]
#                         * 0.98
#                         * 2
#                     )
#                     winner_dict["green"] = 2

#                 else:
#                     total_amount_won = (
#                         total_amount_won
#                         + result_color[result_color["bet_on"] == "green"][
#                             "total_bet_amount"
#                         ].iloc[0]
#                         * 0.98
#                         * 1.5
#                     )
#                     winner_dict["green"] = 1.5

#                 winner_dict["color_who_won"].append("green")

#             if min_number in [0, 5]:
#                 total_amount_won = (
#                     total_amount_won
#                     + result_color[result_color["bet_on"] == "violet"][
#                         "total_bet_amount"
#                     ].iloc[0]
#                     * 0.98
#                     * 4.5
#                 )
#                 winner_dict["violet"] = 4.5

#                 winner_dict["color_who_won"].append("violet")

#             winner_dict["total_amount_won"] = total_amount_won

#             if total_amount_bet > total_amount_won:
#                 winner_dict["is_profit"] = 1
#                 break
#             else:
#                 if minimum_loss_dict["total_amount_won"] > total_amount_won:
#                     minimum_loss_dict = winner_dict

#             return winner_dict, minimum_loss_dict

#     except Exception as e:
#         logger.error(str(e))
#         return "error in determine"


# async def get_result(result_detail: result_detail, db: Session = Depends(get_sql_db)):
#     print("going in get result")
#     try:
#         result_color = db.execute(
#             text(
#                 "SELECT bet_on,sum(bet_amount) As total_bet_amount FROM bet_color GROUP BY bet_on"
#             )
#         )
#         result_number = db.execute(
#             text(
#                 "SELECT bet_on,sum(bet_amount) As total_bet_amount FROM bet_number GROUP BY bet_on"
#             )
#         )

#         # result_color = [row._asdict() for row in result_color]
#         # result_number = [row._asdict() for row in result_number]

#         # result_color = pd.DataFrame(result_color)
#         # result_number = pd.DataFrame(result_number)

#         # result_color = db.execute(
#         #     select(
#         #         Bet_Color.bet_on,
#         #         func.sum(Bet_Color.bet_amount).label("total_bet_amount"),
#         #     ).group_by(Bet_Color.bet_on)
#         # )
#         # result_number = db.execute(
#         #     select(
#         #         Bet_Number.bet_on,
#         #         func.sum(Bet_Number.bet_amount).label("total_bet_amount"),
#         #     ).group_by(Bet_Number.bet_on)
#         # )

#         result_color = pd.DataFrame(result_color.mappings().all())
#         result_number = pd.DataFrame(result_number.mappings().all())

#         print(result_color.head(3))
#         print(result_number.head(10))

#         # for i in range(0, 10):
#         #     if result_number[result_number["bet_on"] == i].empty:
#         #         result_number.loc[len(result_number)] = [i, 0]

#         # for i in ["red", "green", "violet"]:
#         #     if result_color[result_color["bet_on"] == i].empty:
#         #         result_color.loc[len(result_color)] = [i, 0]

#         for color in ["red", "green", "violet"]:
#             if color not in result_color["bet_on"].values:
#                 result_color = result_color.append(
#                     {"bet_on": color, "total_bet_amount": 0}, ignore_index=True
#                 )

#         for number in range(10):
#             if number not in result_number["bet_on"].values:
#                 result_number = result_number.append(
#                     {"bet_on": number, "total_bet_amount": 0}, ignore_index=True
#                 )

#         # total_amount_bet = (
#         #     result_color["total_bet_amount"].sum()
#         #     + result_number["total_bet_amount"].sum()
#         # )

#         total_amount_bet = (
#             result_color["total_bet_amount"].sum()
#             + result_number["total_bet_amount"].sum()
#         )
#         # winner_dict, minimum_loss_dict = initialize_winner_dicts()

#         winner_dict = {
#             "total_amount_won": 0,
#             "number_who_won": [],
#             "color_who_won": [],
#             "red": 0,
#             "green": 0,
#             "violet": 0,
#             "is_profit": 0,
#         }

#         minimum_loss_dict = {
#             "total_amount_won": 10000000000000000,
#             "number_who_won": [],
#             "color_who_won": [],
#             "red": 0,
#             "green": 0,
#             "violet": 0,
#             "is_profit": 0,
#         }

#         result_color["total_bet_amount"] = result_color["total_bet_amount"].astype(
#             float
#         )
#         result_number["total_bet_amount"] = result_number["total_bet_amount"].astype(
#             float
#         )

#         winner_dict, minimum_loss_dict = determine_winners(
#             result_color,
#             result_number,
#             total_amount_bet,
#             winner_dict,
#             minimum_loss_dict,
#         )

#         db.execute(delete(Winner_Table))
#         db.commit()

#         if winner_dict["is_profit"] != 1:
#             winner_dict = minimum_loss_dict

#         new_result = Result(
#             color_who_won=winner_dict["color_who_won"],
#             number_who_won=winner_dict["number_who_won"],
#             period=result_detail.period,
#         )

#         db.add(new_result)
#         db.execute(delete(Winner_Table))
#         db.commit()

#         result_color = db.query(Bet_Color).all()
#         result_number = db.query(Bet_Number).all()

#         result_list = []

#         for row in result_color:
#             result_list.append(
#                 {
#                     "mobile_number": row.mobile_number,
#                     "amount": row.bet_amount * winner_dict[row.bet_on],
#                 }
#             )

#             new_output_winner = Winner_Table(
#                 period=result_detail.period,
#                 mobile_number=row.mobile_number,
#                 color=row.bet_on,
#                 amount_won=row.bet_amount * winner_dict[row.bet_on],
#             )
#             new_output = All_Time_Winner_Table(
#                 period=result_detail.period,
#                 mobile_number=row.mobile_number,
#                 color=row.bet_on,
#                 amount_won=row.bet_amount * winner_dict[row.bet_on],
#             )

#             db.add(new_output_winner)
#             db.add(new_output)
#             db.commit()

#         for row in result_number:
#             result_list.append(
#                 {"mobile_number": row.mobile_number, "amount": row.bet_amount * 9}
#             )

#             new_output_winner = Winner_Table(
#                 period=result_detail.period,
#                 mobile_number=row.mobile_number,
#                 number=row.bet_on,
#                 amount_won=row.bet_amount * 9,
#             )

#             new_output = All_Time_Winner_Table(
#                 period=result_detail.period,
#                 mobile_number=row.mobile_number,
#                 number=row.bet_on,
#                 amount_won=row.bet_amount * 9,
#             )

#             db.add(new_output_winner)
#             db.add(new_output)
#             db.commit()

#         sql_command = """UPDATE user
#             JOIN winner_table ON user.mobile_number = winner_table.mobile_number
#             SET user.balance = user.balance + winner_table.amount_won"""
#         db.execute(text(sql_command))
#         db.commit()

#         # db.execute(User.__table__.update().where(User.mobile_number == Winner_Table.mobile_number).values(balance=Winner_Table.amount_won + User.balance))
#         # db.execute(delete(Bet_Color))
#         # db.execute(delete(Bet_Number))

#         return result_list
#     except HTTPException as e:
#         db.rollback()
#         logger.error(str(e))
#         raise HTTPException(status_code=e.status_code, detail=e.detail)


# @router.get('/get-result/')

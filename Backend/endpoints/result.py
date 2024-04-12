from fastapi import APIRouter,HTTPException,Depends
from models.user import Result,Winner_Table,Bet_Color,Bet_Number,All_Time_Winner_Table,User,Referral_table,All_Referral_Winning
from sqlalchemy.exc import SQLAlchemyError
from pydantic import ValidationError
from sqlalchemy.orm import Session
from db_module.session import get_sql_db
from utils.logger import setup_logger
from schema.user import result_detail
from sqlalchemy import text, delete, func, select
import pandas as pd


router = APIRouter()
logger = setup_logger()


@router.get('/result-list/')
async def get_result_list(db: Session = Depends(get_sql_db)):
    try:
        result_list = db.query(Result).order_by(Result.game_id.desc()).limit(10).all()
        return result_list
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code,detail=e.detail)
    


def determine_winners(
    result_color, result_number, total_amount_bet
):
    try:
        winner_dict = {
            "total_amount_won": 1000000000,
            "number_who_won": [],
            "color_who_won": [],
            "red": 0,
            "green": 0,
            "violet": 0,
            "is_profit": 0,
        }

        minimum_loss_dict = {
            "total_amount_won": 1000000000,
            "number_who_won": [],
            "color_who_won": [],
            "red": 0,
            "green": 0,
            "violet": 0,
            "is_profit": 0,
        }

        for i in range(0, 10):
            winner_dict_form = {
                "total_amount_won": 0,
                "number_who_won": [],
                "color_who_won": [],
                "red": 0,
                "green": 0,
                "violet": 0,
                "is_profit": 0,
            }

            total_amount_won = 0
            minIndex = result_number["total_bet_amount"].nsmallest(
                i + 1).index[-1]
            min_number = result_number.loc[minIndex, "bet_on"]

            # winner_dict_form["number_who_won"] = []
            # winner_dict_form["color_who_won"] = []

            winner_dict_form["number_who_won"].append(min_number)

            total_amount_won = (
                result_number["total_bet_amount"].iloc[minIndex] * 0.98 * 9
            )
            if min_number % 2 == 0:
                if min_number != 0:
                    total_amount_won = (
                        total_amount_won
                        + result_color[result_color["bet_on"] == "red"][
                            "total_bet_amount"
                        ].iloc[0]
                        * 0.98
                        * 2
                    )
                    winner_dict_form["red"] = 2
                else:
                    total_amount_won = (
                        total_amount_won
                        + result_color[result_color["bet_on"] == "red"][
                            "total_bet_amount"
                        ].iloc[0]
                        * 0.98
                        * 1.5
                    )
                    winner_dict_form["red"] = 1.5

                winner_dict_form["color_who_won"].append("red")

            if min_number % 2 != 0:
                if min_number != 5:
                    total_amount_won = (
                        total_amount_won
                        + result_color[result_color["bet_on"] == "green"][
                            "total_bet_amount"
                        ].iloc[0]
                        * 0.98
                        * 2
                    )
                    winner_dict_form["green"] = 2

                else:
                    total_amount_won = (
                        total_amount_won
                        + result_color[result_color["bet_on"] == "green"][
                            "total_bet_amount"
                        ].iloc[0]
                        * 0.98
                        * 1.5
                    )
                    winner_dict_form["green"] = 1.5

                winner_dict_form["color_who_won"].append("green")

            if min_number in [0, 5]:
                total_amount_won = (
                    total_amount_won
                    + result_color[result_color["bet_on"] == "violet"][
                        "total_bet_amount"
                    ].iloc[0]
                    * 0.98
                    * 4.5
                )
                winner_dict_form["violet"] = 4.5

                winner_dict_form["color_who_won"].append("violet")
            winner_dict_form["total_amount_won"] = total_amount_won

            if winner_dict['total_amount_won']>winner_dict_form['total_amount_won']:
                winner_dict = winner_dict_form

            if total_amount_bet < total_amount_won:
                winner_dict["is_profit"] = 1
                break
            else:
                if minimum_loss_dict["total_amount_won"] > total_amount_won:
                    minimum_loss_dict = winner_dict
        return winner_dict, minimum_loss_dict

    except Exception as e:
        logger.error(str(e))
        return "error in determine"


@router.post('/get-result/')
async def get_result(result_detail: result_detail, db: Session = Depends(get_sql_db)):
    try:
        with db.begin():
            result_color = db.execute(
                text(
                    f"SELECT bet_on,sum(bet_amount) As total_bet_amount FROM bet_color WHERE game_id = '{result_detail.game_id}' GROUP BY bet_on"
                )
            )

            result_number = db.execute(
                text(
                    f"SELECT bet_on,sum(bet_amount) As total_bet_amount FROM bet_number WHERE game_id = '{result_detail.game_id}' GROUP BY bet_on"
                )
            )


            result_color = [row._asdict() for row in result_color] or []
            result_number = [row._asdict() for row in result_number] or []

            result_color = pd.DataFrame(result_color, columns=['bet_on', 'total_bet_amount'])
            result_number = pd.DataFrame(result_number, columns=['bet_on', 'total_bet_amount'])

            
            for i in range(0, 10):
                if result_number[result_number["bet_on"] == i].empty:
                    result_number.loc[len(result_number)] = [i, 0]

            for i in ["red", "green", "violet"]:
                if result_color[result_color["bet_on"] == i].empty:
                    result_color.loc[len(result_color)] = [i, 0]

            

            total_amount_bet = (
                result_color["total_bet_amount"].sum()
                + result_number["total_bet_amount"].sum()
            )
            # winner_dict, minimum_loss_dict = initialize_winner_dicts()

            result_color["total_bet_amount"] = result_color["total_bet_amount"].astype(
                float
            )
            result_number["total_bet_amount"] = result_number["total_bet_amount"].astype(
                float
            )
            # print(result_color.head)
            # print(result_number.head)

            winner_dict, minimum_loss_dict = determine_winners(
                result_color,
                result_number,
                total_amount_bet
            )
            db.execute(delete(Winner_Table))

            if winner_dict["is_profit"] != 1:
                winner_dict = minimum_loss_dict
            new_result = Result(
                color_who_won=winner_dict["color_who_won"],
                number_who_won=winner_dict["number_who_won"],
                game_id=result_detail.game_id,
            )

            db.add(new_result)
            # db.execute(delete(Winner_Table))
            result_color = db.query(Bet_Color).filter(Bet_Color.game_id == result_detail.game_id).all()
            result_number = db.query(Bet_Number).filter(Bet_Number.game_id == result_detail.game_id).all()


            result_list = []

            for row in result_color:
                result_list.append(
                    {
                        "mobile_number": row.mobile_number,
                        "amount": row.bet_amount * winner_dict[row.bet_on],
                    }
                )

                new_output_winner = Winner_Table(
                    game_id=result_detail.game_id,
                    mobile_number=row.mobile_number,
                    color=row.bet_on,
                    amount_won=row.bet_amount * winner_dict[row.bet_on],
                )
                new_output = All_Time_Winner_Table(
                    game_id=result_detail.game_id,
                    mobile_number=row.mobile_number,
                    color=row.bet_on,
                    amount_won=row.bet_amount * winner_dict[row.bet_on],
                )

                db.add(new_output_winner)
                db.add(new_output)

            for row in result_number:
                result_list.append(
                    {"mobile_number": row.mobile_number,
                        "amount": row.bet_amount * 9 if row.bet_on == winner_dict['number_who_won'] else 0}
                )

                new_output_winner = Winner_Table(
                    game_id=result_detail.game_id,
                    mobile_number=row.mobile_number,
                    number=row.bet_on,
                    amount_won=row.bet_amount * 9 if row.bet_on == winner_dict['number_who_won'] else 0
                )

                new_output = All_Time_Winner_Table(
                    game_id=result_detail.game_id,
                    mobile_number=row.mobile_number,
                    number=row.bet_on,
                    amount_won=row.bet_amount * 9 if row.bet_on == winner_dict['number_who_won'] else 0
                )

                db.add(new_output_winner)
                db.add(new_output)

            db.execute(User.__table__.update().where(User.mobile_number == Winner_Table.mobile_number).values(
                balance=Winner_Table.amount_won + User.balance))

            for i in result_list:
                if i["amount"]>0.0:
                    user_refer_by_level1 = db.query(Referral_table).filter(Referral_table.level_1_refer == i["mobile_number"]).first()

                    if user_refer_by_level1:
                        user = db.query(User).filter(User.mobile_number == user_refer_by_level1.mobile_number).first()

                        if user:
                            user.balance = user.balance + 0.0300*i["amount"]
                            refer_winner_entry = All_Referral_Winning(
                                mobile_number = user.mobile_number,
                                game_id = result_detail.game_id,
                                amount_won = 0.0300*i["amount"],
                                level_1_refer = i["mobile_number"]
                            )

                            db.add(refer_winner_entry)


                    user_refer_by_level2 = db.query(Referral_table).filter(Referral_table.level_2_refer == i["mobile_number"]).first()

                    if user_refer_by_level2:
                        user = db.query(User).filter(User.mobile_number == user_refer_by_level2.mobile_number).first()

                        if user:
                            user.balance = user.balance + 0.010*i["amount"]
                            refer_winner_entry_2 = All_Referral_Winning(
                                mobile_number = user.mobile_number,
                                game_id = result_detail.game_id,
                                amount_won = 0.0300*i["amount"],
                                level_2_refer = i["mobile_number"]
                            )

                            db.add(refer_winner_entry_2)

        db.commit()
        return result_list
    except ValidationError as e:
        error_messages = []
        for error in e.errors():
            error_messages.append(
                {"loc": error["loc"], "msg": error["msg"], "type": error["type"]})
        raise HTTPException(status_code=422, detail=error_messages)
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Database error occurred")
    except HTTPException as e:
        db.rollback()
        logger.error(str(e))
        raise HTTPException(status_code=e.status_code, detail=e.detail)

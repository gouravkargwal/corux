from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from sqlalchemy import text, delete, func, select, or_, and_
from db_module.session import get_sql_db
from sqlalchemy.exc import SQLAlchemyError
from pydantic import ValidationError
from models.user import (
    Bet_Color,
    Bet_Number,
    Winner_Table,
    All_Time_Winner_Table,
    User,
    Result,
    Referral_table,
    All_Referral_Winning,
)

from schema.user import betdetails, user_info, password_detail, result_detail
from utils.verify import hash_password
from jwtAuth import authenticate_user
import pandas as pd
from utils.logger import setup_logger
import string, secrets

router = APIRouter()
logger = setup_logger()


def generate_random_string(length):
    alphabet = string.ascii_letters + string.digits
    return "".join(secrets.choice(alphabet) for _ in range(length))


def is_convertible_to_number(some_string):
    try:
        int(some_string)
        return True
    except ValueError:
        return False


@router.get("/get-profile/")
async def get_profile(
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
            raise HTTPException(status_code=404, detail="User Do not Exist")

        user_refer = (
            db.query(Referral_table)
            .filter(Referral_table.mobile_number == user.mobile_number)
            .first()
        )

        return {
            "username": user.username,
            "mobile_number": user.mobile_number,
            "balance": user.balance,
            "refer_code": user_refer.referral_code_to,
        }
    except ValidationError as e:
        # Handle validation errors and return a 422 response
        error_messages = []
        for error in e.errors():
            error_messages.append(
                {"loc": error["loc"], "msg": error["msg"], "type": error["type"]}
            )
        raise HTTPException(status_code=422, detail=error_messages)
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)


@router.post("/create-user/")
async def create_user(user_info: user_info, db: Session = Depends(get_sql_db)):
    try:
        with db.begin():
            user = (
                db.query(User)
                .filter(User.mobile_number == user_info.mobile_number)
                .first()
            )
            if user:
                raise HTTPException(
                    status_code=400, detail="Mobile number Already Exist"
                )

            new_user = User(
                mobile_number=user_info.mobile_number,
                username=user_info.username,
                password=hash_password(user_info.password),
            )

            db.add(new_user)

            if user_info.refer_code:
                user_refered_by_level1 = (
                    db.query(Referral_table)
                    .filter(Referral_table.referral_code_to == user_info.refer_code)
                    .first()
                )

                if not user_refered_by_level1:
                    raise HTTPException(status_code=400, detail="Wrong Referral Code")
                if user_refered_by_level1:
                    new_refer_entry = Referral_table(
                        mobile_number=user_refered_by_level1.mobile_number,
                        referral_code_to=user_refered_by_level1.referral_code_to,
                        level_1_refer=user_info.mobile_number,
                    )

                    db.add(new_refer_entry)
                    user_refered_by_level2 = (
                        db.query(Referral_table)
                        .filter(
                            Referral_table.referral_code_to
                            == user_refered_by_level1.referral_code_from
                        )
                        .first()
                    )

                    if user_refered_by_level2:
                        new_refer_entry_2 = Referral_table(
                            mobile_number=user_refered_by_level2.mobile_number,
                            referral_code_to=user_refered_by_level2.referral_code_to,
                            referral_code_from=user_refered_by_level2.referral_code_from,
                            level_2_refer=user_info.mobile_number,
                        )

                        db.add(new_refer_entry_2)

                new_user_refer_entry = Referral_table(
                    mobile_number=user_info.mobile_number,
                    referral_code_from=user_info.refer_code,
                    referral_code_to=generate_random_string(10),
                )

                db.add(new_user_refer_entry)

            else:
                new_user_refer_entry = Referral_table(
                    mobile_number=user_info.mobile_number,
                    referral_code_to=generate_random_string(10),
                )

                db.add(new_user_refer_entry)
        db.commit()
        return {"status_code": 200, "message": "User created Successfully"}
    except ValidationError as e:
        # Handle validation errors and return a 422 response
        db.rollback()
        error_messages = []
        for error in e.errors():
            error_messages.append(
                {"loc": error["loc"], "msg": error["msg"], "type": error["type"]}
            )
        raise HTTPException(status_code=422, detail=error_messages)
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
    except ValidationError as e:
        # Handle validation errors and return a 422 response
        error_messages = []
        for error in e.errors():
            error_messages.append(
                {"loc": error["loc"], "msg": error["msg"], "type": error["type"]}
            )
        raise HTTPException(status_code=422, detail=error_messages)
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
                game_id=betdetails.game_id,
                mobile_number=credentials.mobile_number,
                bet_amount=betdetails.bet_amount,
                bet_on=0 if betdetails.bet_on == "0" else int(betdetails.bet_on),
            )

            db.add(new_bet)
            db.commit()
            db.refresh(new_bet)
        else:
            new_bet = Bet_Color(
                game_id=betdetails.game_id,
                mobile_number=credentials.mobile_number,
                bet_amount=betdetails.bet_amount,
                bet_on=betdetails.bet_on,
            )

        db.add(new_bet)
        db.commit()
        db.refresh(new_bet)

        return {"status_code": 200, "message": f"created bet on {betdetails.bet_on}"}
    except ValidationError as e:
        # Handle validation errors and return a 422 response
        error_messages = []
        for error in e.errors():
            error_messages.append(
                {"loc": error["loc"], "msg": error["msg"], "type": error["type"]}
            )
        raise HTTPException(status_code=422, detail=error_messages)
    except HTTPException as e:
        logger.error(str(e))
        raise HTTPException(status_code=e.status_code, detail=e.detail)


@router.get("/user-win/")
async def get_winning_list(
    page: int = Query(default=1, ge=1),
    size: int = Query(default=10, gt=0),
    credentials: HTTPAuthorizationCredentials = Depends(authenticate_user),
    db: Session = Depends(get_sql_db),
):
    try:
        if page < 1 or size <= 0:
            raise HTTPException(
                status_code=400, detail="Invalid page or size parameters"
            )

        skip = (page - 1) * size

        stmt = (
            db.query(
                Bet_Color.mobile_number,
                Bet_Color.game_id,
                Bet_Color.bet_id,
                Bet_Color.bet_on,
                Bet_Color.bet_amount,
                Bet_Color.CREATE_DATE,
                (All_Time_Winner_Table.amount_won).label("winning"),
            )
            .filter(Bet_Color.mobile_number == credentials.mobile_number)
            .outerjoin(
                All_Time_Winner_Table,
                and_(
                    All_Time_Winner_Table.game_id == Bet_Color.game_id,
                    All_Time_Winner_Table.color == Bet_Color.bet_on,
                    All_Time_Winner_Table.bet_id == Bet_Color.bet_id
                ),
            )
            .distinct()
            .all()
        )

        stmt2 = (
            db.query(
                Bet_Number.mobile_number,
                Bet_Number.bet_id,
                Bet_Number.game_id,
                Bet_Number.bet_on,
                Bet_Number.bet_amount,
                Bet_Number.CREATE_DATE,
                (All_Time_Winner_Table.amount_won).label("winning"),
            )
            .filter(Bet_Number.mobile_number == credentials.mobile_number)
            .outerjoin(
                All_Time_Winner_Table,
                and_(
                    All_Time_Winner_Table.game_id == Bet_Number.game_id,
                    All_Time_Winner_Table.number == Bet_Number.bet_on,
                    All_Time_Winner_Table.bet_id == Bet_Number.bet_id
                ),
            )
            .distinct()
            .all()
        )

        result = [row._asdict() for row in stmt] + [row._asdict() for row in stmt2]
        result_list = sorted(result, key=lambda x: (x["game_id"],x["CREATE_DATE"]),reverse=True)
        # result_list = sorted(result_list,key=lambda x: x["CREATE_DATE"])

        bet_count = (
            db.query(Bet_Color)
            .filter(Bet_Color.mobile_number == credentials.mobile_number)
            .count()
            + db.query(Bet_Number)
            .filter(Bet_Number.mobile_number == credentials.mobile_number)
            .count()
        )
        return {"rows": result_list[skip : skip + size + 1], "totalRows": bet_count}
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)


@router.get("/refer-page/")
async def refer_information(
    credentials: HTTPAuthorizationCredentials = Depends(authenticate_user),
    db: Session = Depends(get_sql_db),
):
    try:
        refer_result_1 = db.query(All_Referral_Winning).filter(
            and_(
                All_Referral_Winning.mobile_number == credentials.mobile_number,
                All_Referral_Winning.level_1_refer != "",
            )
        )

        # print([row._asdict() for row in refer_result_1])
        # return;
        refer_result_2 = db.query(All_Referral_Winning).filter(
            All_Referral_Winning.mobile_number == credentials.mobile_number,
            All_Referral_Winning.level_1_refer == "",
            All_Referral_Winning.level_2_refer != "",
        )

        result_list_level1 = [row.__dict__ for row in refer_result_1]

        result_list_level2 = [row.__dict__ for row in refer_result_2]

        refer_count = (
            db.query(Referral_table)
            .filter(
                or_(
                    Referral_table.level_1_refer != "",
                    Referral_table.level_2_refer != "",
                )
            )
            .filter(Referral_table.mobile_number == credentials.mobile_number)
            .count()
        )

        total_winning = (
            db.query(
                All_Referral_Winning.mobile_number,
                func.sum(All_Referral_Winning.amount_won.label("total_amount")),
            )
            .group_by(All_Referral_Winning.mobile_number)
            .filter(All_Referral_Winning.mobile_number == credentials.mobile_number)
        ).one_or_none()

        print(total_winning)
        amount_won = 0
        if total_winning:
            amount_won = total_winning[1]
            print(amount_won)
            # return amount_won

        refer_code = (
            db.query(Referral_table)
            .filter(Referral_table.mobile_number == credentials.mobile_number)
            .first()
        )

        return {
            "refer_result_level1": result_list_level1,
            "refer_result_level2": result_list_level2,
            "refer_count": refer_count,
            "total_winning": amount_won,
            "refer_code": refer_code.referral_code_to,
        }
    except Exception as e:
        print(e)
        raise HTTPException(status_code=404, detail="Cannot Fetch Refer Winning")

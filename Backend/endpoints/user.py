from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from sqlalchemy import text, delete, func, select
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
    Referral_table
)

from schema.user import betdetails, user_info, password_detail, result_detail
from utils.verify import hash_password
from jwtAuth import authenticate_user
import pandas as pd
from utils.logger import setup_logger
import string,secrets

router = APIRouter()
logger = setup_logger()


def generate_random_string(length):
    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(length))


def is_convertible_to_number(some_string):
    try:
        int(some_string)
        return int(some_string)
    except ValueError:
        return False


@router.get("/get-profile/")
async def get_profile(credentials: HTTPAuthorizationCredentials = Depends(authenticate_user), db: Session = Depends(get_sql_db)):
    try:
        user = db.query(User).filter(User.mobile_number ==
                                     credentials.mobile_number).first()
        if not user:
            raise HTTPException(status_code=404, detail="User Do not Exist")

        return {
            "username": user.username,
            "mobile_number": user.mobile_number,
            "balance": user.balance
        }
    except ValidationError as e:
        # Handle validation errors and return a 422 response
        error_messages = []
        for error in e.errors():
            error_messages.append(
                {"loc": error["loc"], "msg": error["msg"], "type": error["type"]})
        raise HTTPException(status_code=422, detail=error_messages)
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)


@router.post("/create-user/")
async def create_user(user_info: user_info, db: Session = Depends(get_sql_db)):
    try:
        with db.begin():
            user = (
                db.query(User).filter(User.mobile_number ==
                                      user_info.mobile_number).first()
            )
            if user:
                raise HTTPException(
                    status_code=400, detail="Mobile number Already Exist")

            new_user = User(
                mobile_number=user_info.mobile_number,
                username=user_info.username,
                password=hash_password(user_info.password),
            )

            db.add(new_user)

            if user_info.refer_code:
                user_refered_by_level1 = db.query(Referral_table).filter(
                    Referral_table.referral_code_to == user_info.refer_code).first()

                if not user_refered_by_level1:
                    raise HTTPException(
                        status_code=400, detail="Wrong Referral Code")
                if user_refered_by_level1:
                    new_refer_entry = Referral_table(
                        mobile_number = user_refered_by_level1.mobile_number,
                        referral_code_to = user_refered_by_level1.referral_code_to,
                        level_1_refer = user_info.mobile_number
                    )

                    db.add(new_refer_entry)
                    user_refered_by_level2 = db.query(Referral_table).filter(
                        Referral_table.referral_code_to == user_refered_by_level1.referral_code_from).first()

                    if user_refered_by_level2:
                        new_refer_entry_2 = Referral_table(
                            mobile_number = user_refered_by_level2.mobile_number,
                            referral_code_to = user_refered_by_level2.referral_code_to,
                            referral_code_from = user_refered_by_level2.referral_code_from,
                            level_2_refer = user_info.mobile_number
                        )
                        
                        db.add(new_refer_entry_2)

                new_user_refer_entry = Referral_table(
                    mobile_number=user_info.mobile_number,
                    referral_code_from=user_info.refer_code,
                    referral_code_to=generate_random_string(10)
                )

                db.add(new_user_refer_entry)

            else:
                new_user_refer_entry = Referral_table(
                    mobile_number=user_info.mobile_number,
                    referral_code_to=generate_random_string(10)
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
                {"loc": error["loc"], "msg": error["msg"], "type": error["type"]})
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
                {"loc": error["loc"], "msg": error["msg"], "type": error["type"]})
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
                bet_on=int(betdetails.bet_on),
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
                {"loc": error["loc"], "msg": error["msg"], "type": error["type"]})
        raise HTTPException(status_code=422, detail=error_messages)
    except HTTPException as e:
        logger.error(str(e))
        raise HTTPException(status_code=e.status_code, detail=e.detail)


@router.get('/user-win/')
async def get_winning_list(credentials: HTTPAuthorizationCredentials = Depends(authenticate_user),db: Session = Depends(get_sql_db)):
    try:
        # if not user_winning:
        #     raise HTTPException(status_code=404,detail="No winning")
        # return user_winning
        # user_winning = db.query(All_Time_Winner_Table).filter(All_Time_Winner_Table.mobile_number == credentials.mobile_number).order_by(All_Time_Winner_Table.game_id.desc())
        # print(user_winning)

        # user_bet_color = db.query(Bet_Color).filter(Bet_Color.mobile_number == credentials.mobile_number).order_by(Bet_Color.game_id.desc())

        # user_bet_number = db.query(Bet_Number).filter(Bet_Number.mobile_number == credentials.mobile_number).order_by(Bet_Number.game_id.desc())

        stmt = db.execute(text(
            "SELECT bet_color.mobile_number, bet_color.game_id, bet_color.bet_on, bet_color.bet_amount,all_time_winner_table.amount_won - bet_color.bet_amount as winning from corux2.bet_color bet_color left join corux2.all_time_winner_table all_time_winner_table on  all_time_winner_table.game_id = bet_color.game_id"
        ))
        stmt2 = db.execute(text(
            "SELECT bet_number.mobile_number, bet_number.game_id, bet_number.bet_on, bet_number.bet_amount,all_time_winner_table.amount_won - bet_number.bet_amount as winning from corux2.bet_number bet_number left join corux2.all_time_winner_table all_time_winner_table on  all_time_winner_table.game_id = bet_number.game_id"
        ))

        result = [row._asdict() for row in stmt] + [row._asdict() for row in stmt2]
        # results = stmt
        # return "Hello"
        return result
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code,detail=e.detail)
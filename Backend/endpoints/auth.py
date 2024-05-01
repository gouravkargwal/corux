from fastapi import APIRouter, HTTPException, Depends, Response, Request, Cookie, Header
from db_module.session import get_sql_db
from sqlalchemy import desc
from sqlalchemy.orm import Session
from jwtAuth import JWTAuth
from schema.user import (
    userdetail,
    password_detail,
    user_otp_detail,
    user_detail,
    user_info,
    mobile_number,
    forgot_password_schema,
)

from utils.verify import hash_password, verify_password
from jwtAuth import JWTAuth
from models.user import Otp_Table, User, Referral_table
from datetime import datetime, timedelta
import string
import secrets
from utils.logger import setup_logger

router = APIRouter()
authhandler = JWTAuth()
logger = setup_logger()


def generate_random_string(length):
    alphabet = string.ascii_letters + string.digits
    return "".join(secrets.choice(alphabet) for _ in range(length))


@router.post("/check-mobile-number/")
async def check_mobile_number(
    mobile_number: mobile_number, db: Session = Depends(get_sql_db)
):
    try:
        user = (
            db.query(User)
            .filter(User.mobile_number == mobile_number.mobile_number)
            .first()
        )
        if user:
            raise HTTPException(status_code=403, detail="Mobile Number Already In Use")

        return {"status_code": 200, "message": "Mobile Number not registered"}
    except Exception as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)


@router.post("/send-otp/")
async def send_otp(userdetail: userdetail, db: Session = Depends(get_sql_db)):
    try:
        otp = "123"

        otp_found = (
            db.query(Otp_Table)
            .filter(Otp_Table.mobile_number == userdetail.mobile_number)
            .first()
        )
        if otp_found:
            if otp_found.time >= (datetime.now() - timedelta(minutes=3)):
                if otp_found.count >= 3:
                    raise HTTPException(
                        status_code=400,
                        detail="Cannot Send Otp,Limit Exceed Try Again After 3 minutes",
                    )

                otp_found.count = otp_found.count + 1
                otp_found.otp = otp
                db.commit()

            else:
                otp_found.count = 1
                otp_found.otp = otp
                otp_found.time = datetime.now()

                db.commit()
        else:
            new_otp_log = Otp_Table(
                mobile_number=userdetail.mobile_number,
                time=datetime.now(),
                count=1,
                otp=otp,
            )

            db.add(new_otp_log)
            db.commit()
            db.refresh(new_otp_log)

        return {"status_code": 200, "message": "OTP Sent Successfully"}
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)
    
@router.post("/send-otp-forgot/")
async def send_otp_forgot(userdetail: userdetail, db: Session = Depends(get_sql_db)):
    try:
        user = db.query(User).filter(User.mobile_number == userdetail.mobile_number).first()
        if not user:
            raise HTTPException(status_code=400,detail="User not Registered!! Register First")
        
        otp = "1234"
        otp_found = (
            db.query(Otp_Table)
            .filter(Otp_Table.mobile_number == userdetail.mobile_number)
            .first()
        )

        if otp_found:
            if otp_found.time >= (datetime.now() - timedelta(minutes=3)):
                if otp_found.count >= 3:
                    raise HTTPException(
                        status_code=400,
                        detail="Cannot Send Otp,Limit Exceed Try Again After 3 minutes",
                    )

                otp_found.count = otp_found.count + 1
                otp_found.otp = otp
                db.commit()

            else:
                otp_found.count = 1
                otp_found.otp = otp
                otp_found.time = datetime.now()

                db.commit()
        else:
            new_otp_log = Otp_Table(
                mobile_number=userdetail.mobile_number,
                time=datetime.now(),
                count=1,
                otp=otp,
            )

            db.add(new_otp_log)
            db.commit()
            db.refresh(new_otp_log)

        return {"status_code": 200, "message": "OTP Sent Successfully"}
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)


@router.post("/verify-otp/")
async def verify_otp(
    user_otp_detail: user_otp_detail, db: Session = Depends(get_sql_db)
):
    try:
        otp_found = (
            db.query(Otp_Table)
            .filter(Otp_Table.mobile_number == user_otp_detail.mobile_number)
            .order_by(desc(Otp_Table.otp_id))
            .first()
        )
        if not otp_found:
            raise HTTPException(
                status_code=400, detail="Don not found OTP on server!!Try Again"
            )

        if (datetime.now() - timedelta(minutes=60)) > otp_found.time:
            raise HTTPException(status_code=400, detail="OTP Expired!! Try Again")

        if user_otp_detail.otp != otp_found.otp:
            raise HTTPException(status_code=400, detail="Wrong OTP!! Try Again")

        return {"status_code": 200, "message": "OTP verified Successfully"}

    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)


@router.post("/login/")
async def login(user_detail: user_detail, db: Session = Depends(get_sql_db)):
    try:
        user = (
            db.query(User)
            .filter(User.mobile_number == user_detail.mobile_number)
            .first()
        )
        if not user:
            raise HTTPException(status_code=400, detail="Do not Found User")

        if not verify_password(user_detail.password, user.password):
            raise HTTPException(status_code=400, detail="Wrong Password!! Try Again")

        payload = {"mobile_number": user.mobile_number, "user_id": user.user_id}

        access_token = authhandler.encode_token(payload)
        refresh_token = authhandler.encode_refresh_token(payload)

        return {
            "status_code": 200,
            "refresh_token": refresh_token,
            "access_token": access_token,
            "balance": user.balance,
            "mobile_number": user.mobile_number,
        }

    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)


@router.post("/register/")
async def register(user_info: user_info, db: Session = Depends(get_sql_db)):
    try:
        with db.begin():
            user = (
                db.query(User)
                .filter(User.mobile_number == user_info.mobile_number)
                .first()
            )
            if user:
                raise HTTPException(
                    status_code=409, detail="User Already Exist. Please Login."
                )

            new_user = User(
                mobile_number=user_info.mobile_number,
                username=user_info.username,
                password=hash_password(user_info.password),
            )

            db.add(new_user)
            refer_code = generate_random_string(10)
            if user_info.refer_code:
                user_refered_by_level1 = (
                    db.query(Referral_table)
                    .filter(Referral_table.referral_code_to == user_info.refer_code)
                    .first()
                )

                # if not user_refered_by_level1:
                #     pass
                    # raise HTTPException(status_code=400, detail="Wrong Referral Code")
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
                    referral_code_to=refer_code,
                )

                db.add(new_user_refer_entry)

            else:
                new_user_refer_entry = Referral_table(
                    mobile_number=user_info.mobile_number,
                    referral_code_to=refer_code,
                )

                db.add(new_user_refer_entry)
        db.commit()
        payload = {"mobile_number": new_user.mobile_number, "user_id": new_user.user_id}

        access_token = authhandler.encode_token(payload)
        refresh_token = authhandler.encode_refresh_token(payload)
        return {
            "status_code": 200,
            "refresh_token": refresh_token,
            "access_token": access_token,
            "balance": new_user.balance,
            "mobile_number": new_user.mobile_number,
            "referral_code": refer_code,
        }
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)


@router.patch("/forget-password/")
async def forgot_password(
    forgot_password: forgot_password_schema, db: Session = Depends(get_sql_db)
):
    try:
        with db.begin():
            user = (
                db.query(User)
                .filter(User.mobile_number == forgot_password.mobile_number)
                .first()
            )

            if not user:
                raise HTTPException(status_code=400, detail="Do not Found User")

            user.password = hash_password(forgot_password.password)

        db.commit()
        return {"status_code": 200, "detail": "Successfully Changed Password"}
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)


@router.post("/refresh-token/")
async def refer_codefresh_token(refresh_token: str = Header()):
    print(refresh_token)
    try:
        new_token, new_refresh_token = authhandler.refresh_token(refresh_token)
        return {"access_token": new_token, "refresh_token": new_refresh_token}
    except Exception as e:
        logger.error(str(e))
        raise HTTPException(status_code=e.status_code, detail=e.detail)

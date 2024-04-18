from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.responses import Response, JSONResponse
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from sqlalchemy import desc
from fastapi.responses import StreamingResponse
from io import BytesIO
import qrcode
from typing import Optional
from jwtAuth import authenticate_user
from utils.logger import setup_logger
from db_module.session import get_sql_db
from models.user import (
    Upi_Table,
    PaymentDepositTable,
    PaymentWithdrawTable,
    Bet_Color,
    Bet_Number,
    User,
)
from schema.user import amount_schema, utr_schema, withdraw_schema
from sqlalchemy import text, delete, func, select
import random
import base64
import uuid


router = APIRouter()
logger = setup_logger()


@router.post("/generate-qr/")
async def generate_qr(
    amount: amount_schema,
    credentials: HTTPAuthorizationCredentials = Depends(authenticate_user),
    db: Session = Depends(get_sql_db),
):
    try:
        upi_query_list = db.query(Upi_Table).all()
        upi_list = [row.upi_id for row in upi_query_list]

        x = random.randint(0, len(upi_list) - 1)
        upi_link = f"upi://pay?pa={upi_list[x]}&pn=gourav&am={amount.amount}&cu=INR"

        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(upi_link)
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")
        img_byte_arr = BytesIO()
        img.save(img_byte_arr, format="PNG")
        img_byte_arr.seek(0)

        transaction_id = uuid.uuid4()
        new_transaction_entry = PaymentDepositTable(
            MOBILE_NUMBER=credentials.mobile_number,
            ADMIN_UPI_ID="abc@abc",
            AMOUNT=amount.amount,
            TRANSACTION_ID=transaction_id,
        )

        db.add(new_transaction_entry)
        db.commit()
        img_base64 = base64.b64encode(img_byte_arr.getvalue()).decode("utf-8")

        response_data = {
            "qr_code": img_base64,
            "transaction_id": str(transaction_id),
        }

        return JSONResponse(content=response_data)

    except Exception as e:
        logger.error(f"Failed to generate QR code: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate QR code",
        )


# Patch Request to update UTR number.
@router.patch("/save-utr/")
async def save_utr(
    utr: utr_schema,
    credentials: HTTPAuthorizationCredentials = Depends(authenticate_user),
    db: Session = Depends(get_sql_db),
):
    try:
        transaction = (
            db.query(PaymentDepositTable)
            .filter(
                PaymentDepositTable.TRANSACTION_ID == uuid.UUID(utr.transaction_id),
                PaymentDepositTable.MOBILE_NUMBER == credentials.mobile_number,
            )
            .first()
        )
        if not transaction:
            raise HTTPException(status_code=404, detail="Transaction Not Found")

        transaction.UTR = utr.utr
        db.commit()
        return {"status_code": 200, "message": "Successfully Updated UTR"}
    except Exception as e:
        logger.error(f"Failed to generate QR code: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate QR code",
        )


@router.post("/withdraw/")
async def winthdraw(
    withdraw_schema: withdraw_schema,
    credentials: HTTPAuthorizationCredentials = Depends(authenticate_user),
    db: Session = Depends(get_sql_db),
):
    try:
        if withdraw_schema.amount < 100:
            raise HTTPException(status_code=400, detail="Enter Amount More than 100")

        user = (
            db.query(User)
            .filter(User.mobile_number == credentials.mobile_number)
            .first()
        )

        if not user:
            raise HTTPException(
                status_code=400, detail="Cannot Found User!!Login Again"
            )

        if user.balance < withdraw_schema.amount:
            raise HTTPException(status_code=400, detail="Insufficient Balance")

        lastest_deposit = (
            db.query(PaymentDepositTable)
            .filter(PaymentDepositTable.MOBILE_NUMBER == credentials.mobile_number)
            .order_by(desc(PaymentDepositTable.CREATE_DATE))
            .first()
        )

        if lastest_deposit:
            latest_bet_color = (
                db.query(Bet_Color)
                .filter(
                    Bet_Color.mobile_number == credentials.mobile_number,
                    Bet_Color.CREATE_DATE > lastest_deposit.CREATE_DATE,
                )
                .first()
                or None
            )
            if not latest_bet_color:
                latest_bet_number = (
                    db.query(Bet_Number)
                    .filter(
                        Bet_Number.mobile_number == credentials.mobile_number,
                        Bet_Number.CREATE_DATE > lastest_deposit.CREATE_DATE,
                    )
                    .first()
                    or None
                )
                if not latest_bet_number:
                    raise HTTPException(
                        status_code=400,
                        detail="Please play a game before using your latest deposit.",
                    )

        transaction_id = uuid.uuid4()
        new_withdraw_request = PaymentWithdrawTable(
            MOBILE_NUMBER=credentials.mobile_number,
            TRANSACTION_ID=transaction_id,
            USER_UPI_ID=withdraw_schema.user_upi,
            AMOUNT=withdraw_schema.amount,
        )

        db.add(new_withdraw_request)
        db.commit()

        return {"status_code": 200, "detail": "Successfully Placed Withdrawl request"}
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)


# @router.post("/upi")
# async def add_upi(db: Session = Depends(get_sql_db)):
#     new_upi = Upi_Table(
#         upi_id="87r@ybz",
#         name="B"
#     )

#     db.add(new_upi)
#     db.commit()

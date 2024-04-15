from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from fastapi.responses import StreamingResponse
from io import BytesIO
import qrcode
from typing import Optional
from jwtAuth import authenticate_user
from utils.logger import setup_logger
from db_module.session import get_sql_db
from models.user import Upi_Table,PaymentDepositTable
from schema.user import amount_schema
import random,uuid


router = APIRouter()
logger = setup_logger()


@router.post("/generate-qr/")
async def generate_qr(
    amount: amount_schema,
    credentials: HTTPAuthorizationCredentials = Depends(authenticate_user),
    db: Session = Depends(get_sql_db),
):
    try:
        with db.begin():
            upi_query_list = db.query(Upi_Table).filter().all()
            upi_list = [row.__dict__.get("upi_id") for row in upi_query_list]

            x = random.randint(0,len(upi_list) - 1)
            upi_link = (
                f"upi://pay?pa={upi_list[x]}&pn=gourav&am=1&cu=INR"
            )

            print("Hello")
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

            print("Hello2")
            new_transaction_entry = PaymentDepositTable(
                    MOBILE_NUMBER = credentials.mobile_number,
                    ADMIN_UPI_ID = "abc@abc",
                    AMOUNT = amount.amount
            )

            db.add(new_transaction_entry)

        db.commit()
        return StreamingResponse(img_byte_arr, media_type="image/png")
    except Exception as e:
        logger.error(f"Failed to generate QR code: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate QR code",
        )


# Patch Request to update UTR number.
@router.patch("/save-utr/")
async def save_utr(
    # amount: float,
    credentials: HTTPAuthorizationCredentials = Depends(authenticate_user),
    db: Session = Depends(get_sql_db),
):
    try:
        return {"status_code": 200, "message": "User created Successfully"}
    except Exception as e:
        logger.error(f"Failed to generate QR code: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate QR code",
        )


# @router.post("/upi")
# async def add_upi(db: Session = Depends(get_sql_db)):
#     new_upi = Upi_Table(
#         upi_id = "874@ybz",
#         name = "A"
#     )

#     db.add(new_upi)
#     db.commit()
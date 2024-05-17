from pydantic import BaseModel, EmailStr
from typing import Optional


class mobile_number(BaseModel):
    mobile_number: str
    refer_code: Optional[str] = None


class JWTPayload(BaseModel):
    mobile_number: str


class betdetails(BaseModel):
    bet_on: str
    bet_amount: float
    game_id: str


class userdetail(BaseModel):
    mobile_number: str


class password_detail(BaseModel):
    password: str


class user_otp_detail(BaseModel):
    mobile_number: str
    otp: str


class user_info(BaseModel):
    mobile_number: str
    username: str
    password: str
    refer_code: Optional[str] = None


class user_detail(BaseModel):
    mobile_number: str
    password: str


class result_detail(BaseModel):
    game_id: str


class amount_schema(BaseModel):
    amount: float


class withdraw_schema(BaseModel):
    amount: float
    user_upi: str


class utr_schema(BaseModel):
    transaction_id: str
    utr: str


class forgot_password_schema(BaseModel):
    mobile_number: str
    password: str

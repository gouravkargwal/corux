from pydantic import BaseModel,EmailStr
from typing import Optional

class mobile_number(BaseModel):
    mobile_number: str

# class mobile_no(BaseModel):
#     mobile_number:str
#     mobile_ext: str
    
# class verify_otp(BaseModel):
#     mobile_number:str
#     mobile_ext:str
#     otp:str
    
class JWTPayload(BaseModel):
    mobile_number:str
    user_id: int
    
# class profile(BaseModel):
#     mobile_number:str
#     mobile_extension:str
#     first_name:str
#     last_name:str
#     email:str
#     gender:str
#     dob:str
#     address:str
#     city:str
#     state:str
#     pincode:int
#     alternae_phone_number: Optional[str] = None
#     alernate_phone_number_ext:Optional[str] = None
#     education:str
#     occupation:str
#     annual_income:int
#     pan_number:str
    
class betdetails(BaseModel):
    bet_on:str
    bet_amount:int
    
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
    
class user_detail(BaseModel):
    mobile_number: str
    password: str

class result_detail(BaseModel):
    period: str
    
from sqlalchemy import Column,Integer,String,DateTime,VARCHAR,Boolean,JSON,ForeignKey
from sqlalchemy.orm import relationship

from sqlalchemy_utils import UUIDType
from datetime import datetime
from db_module.session import engine,Base
import uuid


# class User_log(Base):
#     __tablename__ = "user_log"

#     user_id = Column(Integer,primary_key=True,index=True,autoincrement=True)
#     mobile_extension = Column(String(length=4),unique=False,nullable=False,default='+91')
#     otp = Column(String(length=10),unique=False,nullable=True)
#     session_id = Column(UUIDType(binary=False),unique=True,nullable=False,default=uuid.uuid4())
#     mobile_number = Column(String(length=12),unique=False,nullable=False)
#     login_time = Column(DateTime,unique=False,nullable=False,default=datetime.utcnow())
#     logout_time = Column(DateTime,unique=False,nullable=True)

# class User_Profile(Base):
#     __tablename__ = "user_profile"

#     user_id = Column(Integer,index=True,autoincrement=True)
#     mobile_extension = Column(String(length=4),unique=False,nullable=False,default='+91')
#     mobile_number = Column(String(length=12),primary_key=True,unique=True,nullable=False)
#     is_profile = Column(Boolean,unique=False,nullable=False,default=False)
#     is_active = Column(Boolean,unique=False,nullable=False,default=True)
#     is_deleted = Column(Boolean,unique=False,nullable=False,default=False)

# class User_Info(Base):
#     __tablename__ ="user_info"

#     user_id = Column(Integer,index=True,autoincrement=True)
#     mobile_extension = Column(String(4),unique=False,nullable=False,default='+91')
#     mobile_number = Column(String(12),primary_key=True,unique=True,nullable=False)
#     first_name = Column(String(length=100),unique=False,nullable=False)
#     last_name = Column(String(length=100),unique=False,nullable=False)
#     email = Column(String(length=100),unique=True,nullable=False)
#     gender = Column(String(length=10),unique=False,nullable=False)
#     dob_date = Column(DateTime,unique=False,nullable=False)
#     address = Column(String(length=100),unique=False,nullable=False)
#     city = Column(String(length=100),unique=False,nullable=False)
#     state = Column(String(length=100),unique=False,nullable=False)
#     pincode = Column(Integer,unique=False,nullable=False)
#     alernate_phone_number = Column(String(length=12),unique=True,nullable=True)
#     alernate_phone_number_ext = Column(String(length=4),unique=False,nullable=True,default='+91')
#     education = Column(String(length=200),unique=False,nullable=False)
#     occupation = Column(String(length=100),unique=False,nullable=False)
#     annual_income = Column(Integer,unique=False,nullable=False)
#     pan_number = Column(String(length=10),unique=True,nullable=True)
#     create_date = Column(DateTime,unique=False,nullable=False,default=datetime.utcnow())
#     uppdate_date = Column(DateTime,unique=False,nullable=False,default=datetime.utcnow())
    
    
    
    
# class users(Base):
#     __tablename__ = 'user'
    
#     user_id = Column(Integer,primary_key=True,index=True,autoincrement=True)
#     mobile_number = Column(String(10),unique=True,nullable=False)
#     account_number = Column(String(3),unique=True,nullable=False)
    
    
class Bet_Color(Base):
    __tablename__ = 'bet_color'
    
    mobile_number = Column(String(10),unique=False,nullable=False)
    bet_id = Column(Integer,primary_key=True,index=True,autoincrement=True)
    bet_on = Column(VARCHAR(10),unique=False,nullable=True)
    bet_amount = Column(Integer,unique=False,nullable=True,default=0)
    

class Bet_Number(Base):
    __tablename__ = 'bet_number'

    mobile_number = Column(String(10),unique=False,nullable=False)
    bet_id = Column(Integer,primary_key=True,index=True,autoincrement=True)    
    bet_on = Column(Integer,unique=False,nullable=True)
    bet_amount = Column(Integer,unique=False,nullable=True,default=0)
    
class All_Time_Winner_Table(Base):
    __tablename__ = 'all_time_winner_table'
    
    result_id = Column(Integer,primary_key=True,index=True,autoincrement=True)
    mobile_number = Column(String(10),unique=False,nullable=False)
    color = Column(String(10),unique=False,nullable=True,default='grey')
    number = Column(Integer,unique=False,nullable=True,default=-1)
    amount_won = Column(Integer,unique=False,nullable=True,default=0)
    period = Column(String(20),nullable=False)
    
class Otp_Table(Base):
    __tablename__ = 'otp_table'
    
    otp_id = Column(Integer,primary_key=True,index=True,autoincrement=True)
    mobile_number = Column(String(10),unique=False,nullable=False)
    otp = Column(String(6),unique=False,nullable=True)
    count = Column(Integer,unique=False,nullable=True,default=1)
    time = Column(DateTime,unique=False,nullable=False,default=datetime.now())
    
class User(Base):
    __tablename__ = 'user'
    
    user_id = Column(Integer,primary_key=True,index=True,autoincrement=True)
    username = Column(String(30),unique=False,nullable=False)
    mobile_number = Column(String(10),unique=True,nullable=False)
    account_number = Column(String(3),unique=True,nullable=True)
    ifsc_code = Column(String(10),unique=False,nullable=True)
    password = Column(String(200),unique=False,nullable=False)
    create_date = Column(DateTime,unique=False,nullable=False,default=datetime.now())
    balance = Column(Integer,unique=False,nullable=False,default=0)

    
class Winner_Table(Base):
    __tablename__ = 'winner_table'
    
    result_id = Column(Integer,primary_key=True,index=True,autoincrement=True)
    mobile_number = Column(String(10),ForeignKey('user.mobile_number'))
    color = Column(String(10),unique=False,nullable=True,default='grey')
    number = Column(Integer,unique=False,nullable=True,default=-1)
    amount_won = Column(Integer,unique=False,nullable=True,default=0)
    period = Column(String(20),nullable=False)

    user = relationship('User',back_populates='winner_table')

User.winner_table = relationship("Winner_Table",back_populates="user")


class Result(Base):
    __tablename__ = 'result'

    result_id = Column(Integer,primary_key=True,index=True,autoincrement=True)
    color_who_won = Column(JSON,unique=False,nullable=False,default=[])
    number_who_won = Column(Integer,unique=False,nullable=False)
    period = Column(String(20),unique=True,nullable=False)

Base.metadata.create_all(bind=engine)
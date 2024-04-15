from sqlalchemy import Column, Integer, String, DateTime, VARCHAR, Boolean, JSON, ForeignKey, ARRAY, Float
from sqlalchemy.orm import relationship
# from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy_utils import UUIDType
from datetime import datetime
from db_module.session import engine, Base
import uuid


class Bet_Color(Base):
    __tablename__ = 'bet_color'

    mobile_number = Column(String(10), unique=False, nullable=False)
    game_id = Column(String(14), unique=False, nullable=False)
    bet_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    bet_on = Column(VARCHAR(10), unique=False, nullable=True)
    bet_amount = Column(Integer, unique=False, nullable=True, default=0)



class Bet_Number(Base):
    __tablename__ = 'bet_number'

    mobile_number = Column(String(10), unique=False, nullable=False)
    game_id = Column(String(14), unique=False, nullable=False)
    bet_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    bet_on = Column(Integer, unique=False, nullable=True)
    bet_amount = Column(Integer, unique=False, nullable=True, default=0)


class All_Time_Winner_Table(Base):
    __tablename__ = 'all_time_winner_table'

    result_id = Column(Integer, primary_key=True,
                       index=True, autoincrement=True)
    mobile_number = Column(String(10), unique=False, nullable=False)
    game_id = Column(String(14), unique=False, nullable=False)
    color = Column(String(10), unique=False, nullable=True, default='grey')
    number = Column(Integer, unique=False, nullable=True, default=-1)
    amount_won = Column(Integer, unique=False, nullable=True, default=0)


class Otp_Table(Base):
    __tablename__ = 'otp_table'

    otp_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    mobile_number = Column(String(10), unique=False, nullable=False)
    otp = Column(String(6), unique=False, nullable=True)
    count = Column(Integer, unique=False, nullable=True, default=1)
    time = Column(DateTime, unique=False,
                  nullable=False, default=datetime.now())


class User(Base):
    __tablename__ = 'user'

    user_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String(30), unique=False, nullable=False)
    mobile_number = Column(String(10), unique=True,nullable=False)
    is_kyc = Column(Boolean, unique=False, nullable=False, default=False)
    is_blocked = Column(Boolean, unique=False, nullable=False, default=False)
    password = Column(String(200), unique=False, nullable=False)
    create_date = Column(DateTime, unique=False,
                         nullable=False, default=datetime.now())
    balance = Column(Integer, unique=False, nullable=False, default=0)


class Account_Detail(Base):
    __tablename__ = 'account_detail'

    account_detail_id = Column(
        Integer, index=True, unique=True, autoincrement=True)
    mobile_number = Column(String(10), primary_key=True,
                           unique=True, nullable=True)
    account_number = Column(VARCHAR(20), unique=False, nullable=True)
    upi_id = Column(VARCHAR(25), unique=False, nullable=True)
    ifsc_code = Column(VARCHAR(20), unique=False, nullable=True)
    account_name = Column(VARCHAR(30), unique=False, nullable=False)


class Winner_Table(Base):
    __tablename__ = 'winner_table'

    result_id = Column(Integer, primary_key=True,
                       index=True, autoincrement=True)
    mobile_number = Column(String(10), ForeignKey('user.mobile_number'))
    game_id = Column(String(14), unique=False, nullable=False)
    color = Column(String(10), unique=False, nullable=True, default='grey')
    number = Column(Integer, unique=False, nullable=True, default=-1)
    amount_won = Column(Integer, unique=False, nullable=True, default=0)

    user = relationship('User', back_populates='winner_table')


User.winner_table = relationship("Winner_Table", back_populates="user")


class Result(Base):
    __tablename__ = 'result'

    result_id = Column(Integer, primary_key=True,
                       index=True, autoincrement=True)
    game_id = Column(String(14), unique=True, nullable=False)
    color_who_won = Column(JSON, unique=False, nullable=False, default=[])
    number_who_won = Column(Integer, unique=False, nullable=False)


class Referral_table(Base):
    __tablename__ = "referral_table"

    referaal_id = Column(Integer, index=True,primary_key=True, unique=True, autoincrement=True)
    mobile_number = Column(String(10), ForeignKey('user.mobile_number'))
    referral_code_to = Column(
        String(10), unique=False, nullable=False)
    referral_code_from = Column(String(10), unique=False, nullable=True)
    level_1_refer = Column(VARCHAR(256), unique=False,
                           nullable=True, default="")
    level_2_refer = Column(VARCHAR(256), unique=False,
                           nullable=True, default="")
    
    user = relationship('User', back_populates='referral_table')


class All_Referral_Winning(Base):
    __tablename__ = "all_referral_winning"

    id = Column(Integer,primary_key=True,unique=True,autoincrement=True)
    mobile_number = Column(String(10), ForeignKey('user.mobile_number'))
    game_id = Column(String(14), unique=True, nullable=False)
    level_1_refer = Column(VARCHAR(256), unique=False,
                           nullable=True, default="")
    level_2_refer = Column(VARCHAR(256), unique=False,
                           nullable=True, default="")
    amount_won = Column(Integer, unique=False, nullable=True, default=0)
    

class Upi_Table(Base):
    __tablename__ = "upi_table"

    id = Column(Integer,primary_key=True,unique=True,index=True,autoincrement=True)
    upi_id = Column(String(20),unique=True,nullable=False)
    name = Column(String(20),unique=False,nullable=False,default="")
    created_at = Column(DateTime,unique=False,nullable=False,default=datetime.now())
    updated_at = Column(DateTime,unique=False,nullable=False,default=datetime.now())


# class Transaction_Table(Base):
#     __tablename__ = "transaction_table"

#     id = Column(Integer,primary_key=True,unique=True,index=True,autoincrement=True)
#     transaction_id = Column(UUIDType(binary=False),unique=True,nullable=False,default=uuid.uuid4())
#     utr = Column(Integer,unique=False,nullable=True)
#     created_at = Column(DateTime,unique=False,nullable=False,default=datetime.now())
#     updated_at = Column(DateTime,unique=False,nullable=False,default=datetime.now())
class PaymentDepositTable(Base):
    __tablename__ = 'DEPOSIT'

    ID = Column(Integer, primary_key=True, autoincrement=True)
    MOBILE_NUMBER = Column(String(10),unique=False, nullable=False)
    # TRANSACTION_ID = Column(UUIDType(binary=False),unique=True,nullable=False,default=uuid.uuid4())
    ADMIN_UPI_ID = Column(String(50), nullable=True)
    UTR = Column(String(50), nullable=True,unique=False)
    CREATE_DATE = Column(DateTime,unique=False,nullable=False,default=datetime.now())
    AMOUNT = Column(Float, nullable=False)
    APPROVE_DEPOSIT = Column(Boolean,nullable=False,unique=False, default=False)
    DENY_DEPOSIT = Column(Boolean,nullable=False,unique=False, default=False)
    # UPDATE_DATE = Column(DateTime,unique=False,nullable=False,onupdate=datetime.now())


class PaymentWithdrawTable(Base):
    __tablename__ = 'WITHDRAW'

    ID = Column(Integer, primary_key=True, autoincrement=True)
    MOBILE_NUMBER = Column(String(15), nullable=False)
    TRANSACTION_ID = Column(UUIDType(binary=False),unique=True,nullable=False,default=uuid.uuid4())
    UTR = Column(String(50), nullable=True)
    USER_UPI_ID = Column(String(50), nullable=False)
    ADMIN_UPI_ID = Column(String(50), nullable=True)
    CREATE_DATE = Column(DateTime,unique=False,nullable=False,default=datetime.now())
    AMOUNT = Column(Float, nullable=False,unique=False)
    APPROVE_WITHDRAW = Column(Boolean, default=False)
    DENY_WITHDRAW = Column(Boolean, default=False)
    # UPDATE_DATE = Column(DateTime,unique=False,nullable=False,onupdate=datetime.now())

User.referral_table = relationship("Referral_table", back_populates="user")
Base.metadata.create_all(bind=engine)

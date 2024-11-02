from sqlalchemy import (
    Column,
    String,
    DateTime,
    VARCHAR,
    Boolean,
    JSON,
    ForeignKey,
    ARRAY,
    Float,
    BigInteger,
    Double
)
from sqlalchemy.orm import relationship

# from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy_utils import UUIDType
from datetime import datetime
from db_module.session import engine, Base
import uuid
import pytz

from datetime import datetime, timezone, timedelta
import pytz
from utils.logger import setup_logger

logger = setup_logger()
kolkata_timezone = pytz.timezone('Asia/Kolkata')


def get_current_time_in_kolkata():
    # IST = timezone(timedelta(hours=5, minutes=30))
    # return datetime.now()
    kolkata_timezone = pytz.timezone('Asia/Kolkata')
    logger.info(datetime.now(kolkata_timezone))
    return datetime.now(kolkata_timezone)


class Bet_Color(Base):
    __tablename__ = "BET_COLOR"

    mobile_number = Column(
        String(12), unique=False, nullable=False, name="MOBILE_NUMBER"
    )
    game_id = Column(String(14), unique=False, nullable=False, name="GAME_ID")
    bet_id = Column(
        BigInteger, primary_key=True, index=True, autoincrement=True, name="BET_ID"
    )
    bet_on = Column(VARCHAR(10), unique=False, nullable=True, name="BET_ON")
    bet_amount = Column(
        Double, unique=False, nullable=True, default=0, name="BET_AMOUNT"
    )
    CREATE_DATE = Column(
        DateTime,
        unique=False,
        nullable=False,
        default=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
        name="CREATE_DATE",
    )
    UPDATE_DATE = Column(
        DateTime,
        unique=False,
        nullable=False,
        default=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
        onupdate=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
        name="UPDATE_DATE",
    )


class Bet_Number(Base):
    __tablename__ = "BET_NUMBER"

    mobile_number = Column(
        String(12), unique=False, nullable=False, name="MOBILE_NUMBER"
    )
    game_id = Column(String(14), unique=False, nullable=False, name="GAME_ID")
    bet_id = Column(
        BigInteger, primary_key=True, index=True, autoincrement=True, name="BET_ID"
    )
    bet_on = Column(BigInteger, unique=False, nullable=True, name="BET_ON")
    bet_amount = Column(
        Double, unique=False, nullable=True, name="BET_AMOUNT", default=0
    )
    CREATE_DATE = Column(
        DateTime,
        unique=False,
        nullable=False,
        name="CREATE_DATE",
        default=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
    )
    UPDATE_DATE = Column(
        DateTime,
        unique=False,
        nullable=False,
        name="UPDATE_DATE",
        default=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
        onupdate=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
    )


class All_Time_Winner_Table(Base):
    __tablename__ = "ALL_TIME_WINNER_TABLE"

    result_id = Column(
        BigInteger, primary_key=True, index=True, autoincrement=True, name="RESULT_ID"
    )
    bet_id = Column(BigInteger, unique=False, nullable=False, name="BET_ID")
    mobile_number = Column(
        String(12), unique=False, nullable=False, name="MOBILE_NUMBER"
    )
    game_id = Column(String(14), unique=False, nullable=False, name="GAME_ID")
    color = Column(
        String(10), unique=False, nullable=True, name="COLOR", default="grey"
    )
    number = Column(BigInteger, unique=False, nullable=True,
                    name="NUMBER", default=-1)
    amount_won = Column(
        Double, unique=False, nullable=True, name="AMOUNT_WON", default=0
    )
    CREATE_DATE = Column(
        DateTime,
        unique=False,
        nullable=False,
        name="CREATE_DATE",
        default=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
    )
    UPDATE_DATE = Column(
        DateTime,
        unique=False,
        nullable=False,
        name="UPDATE_DATE",
        default=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
        onupdate=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
    )


class Otp_Table(Base):
    __tablename__ = "OTP_TABLE"

    otp_id = Column(
        BigInteger, primary_key=True, index=True, autoincrement=True, name="OTP_ID"
    )
    mobile_number = Column(
        String(12), unique=False, name="MOBILE_NUMBER", nullable=False
    )
    otp = Column(String(6), unique=False, name="OTP", nullable=True)
    count = Column(BigInteger, unique=False, name="COUNT",
                   nullable=True, default=1)
    time = Column(
        DateTime, unique=False, name="TIME", nullable=False, default=datetime.now()
    )
    CREATE_DATE = Column(
        DateTime,
        unique=False,
        name="CREATE_DATE",
        nullable=False,
        default=datetime.now(),
    )
    UPDATE_DATE = Column(
        DateTime,
        unique=False,
        name="UPDATE_DATE",
        nullable=False,
        default=datetime.now(),
        onupdate=datetime.now(),
    )


class User(Base):
    __tablename__ = "USER"

    user_id = Column(
        BigInteger, primary_key=True, index=True, autoincrement=True, name="USER_ID"
    )
    username = Column(String(30), unique=False,
                      name="USER_NAME", nullable=False)
    mobile_number = Column(
        String(12), unique=True, name="MOBILE_NUMBER", nullable=False
    )
    is_kyc = Column(Boolean, unique=False, name="IS_KYC",
                    nullable=False, default=False)
    is_blocked = Column(
        Boolean, unique=False, name="IS_BLOCKED", nullable=False, default=False
    )
    password = Column(String(200), unique=False,
                      name="PASSWORD", nullable=False)
    CREATE_DATE = Column(
        DateTime,
        unique=False,
        name="CREATE_DATE",
        nullable=False,
        default=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
    )
    balance = Column(Double, unique=False, name="BALANCE",
                     nullable=False, default=0)
    promotional_balance = Column(Double, unique=False, name="PROMOTIONAL_BALANCE",
                                 nullable=False, default=50)

    winning_balance = Column(Double, unique=False,
                             nullable=False, name="WINNING_BALANCE", default=0)
    UPDATE_DATE = Column(
        DateTime,
        unique=False,
        name="UPDATE_DATE",
        nullable=False,
        default=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
        onupdate=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
    )

    winnings = relationship("Winner_Table", back_populates="user")
    referrals = relationship("Referral_table", back_populates="user")


class Account_Detail(Base):
    __tablename__ = "ACCOUNT_DETAIL"

    account_detail_id = Column(
        BigInteger, index=True, unique=True, autoincrement=True, name="ACCOUNT_DETAIL_ID"
    )
    mobile_number = Column(
        String(12), primary_key=True, unique=True, name="MOBILE_NUMBER", nullable=True
    )
    account_number = Column(
        VARCHAR(20), unique=False, name="ACCOUNT_NUMBER", nullable=True
    )
    upi_id = Column(VARCHAR(25), unique=False, name="UPI_ID", nullable=True)
    ifsc_code = Column(VARCHAR(20), unique=False,
                       name="IFSC_CODE", nullable=True)
    account_name = Column(
        VARCHAR(30), unique=False, name="ACCOUNT_NAME", nullable=False
    )
    CREATE_DATE = Column(
        DateTime,
        unique=False,
        name="CREATE_DATE",
        nullable=False,
        default=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
    )
    UPDATE_DATE = Column(
        DateTime,
        unique=False,
        name="UPDATE_DATE",
        nullable=False,
        default=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
        onupdate=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
    )


class Winner_Table(Base):
    __tablename__ = "WINNER_TABLE"

    result_id = Column(
        BigInteger, primary_key=True, index=True, autoincrement=True, name="RESULT_ID"
    )
    mobile_number = Column(
        String(12), ForeignKey("USER.MOBILE_NUMBER"), name="MOBILE_NUMBER"
    )
    game_id = Column(String(14), unique=False, name="GAME_ID", nullable=False)
    color = Column(
        String(10), unique=False, name="COLOR", nullable=True, default="grey"
    )
    number = Column(BigInteger, unique=False, name="NUMBER",
                    nullable=True, default=-1)
    amount_won = Column(
        Double, unique=False, name="AMOUNT_WON", nullable=True, default=0
    )
    CREATE_DATE = Column(
        DateTime,
        unique=False,
        name="CREATE_DATE",
        nullable=False,
        default=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
    )
    UPDATE_DATE = Column(
        DateTime,
        unique=False,
        name="UPDATE_DATE",
        nullable=False,
        default=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
        onupdate=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
    )

    user = relationship("User", back_populates="winnings")


# User.WINNER_TABLE = relationship("WINNER_TABLE", back_populates="USER")


class Result(Base):
    __tablename__ = "RESULT"

    result_id = Column(
        BigInteger, primary_key=True, index=True, autoincrement=True, name="RESULT_ID"
    )
    game_id = Column(String(14), unique=True, name="GAME_ID", nullable=False)
    color_who_won = Column(
        JSON, unique=False, name="COLOR_WHO_WON", nullable=False, default=[]
    )
    number_who_won = Column(
        BigInteger, unique=False, name="NUMBER_WHO_WON", nullable=False
    )
    CREATE_DATE = Column(
        DateTime,
        unique=False,
        name="CREATE_DATE",
        nullable=False,
        default=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
    )
    UPDATE_DATE = Column(
        DateTime,
        unique=False,
        name="UPDATE_DATE",
        nullable=False,
        default=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
        onupdate=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
    )


class Referral_table(Base):
    __tablename__ = "REFERRAL_TABLE"

    referaal_id = Column(
        BigInteger,
        index=True,
        primary_key=True,
        unique=True,
        autoincrement=True,
        name="REFERRAL_ID",
    )
    mobile_number = Column(
        String(12), ForeignKey("USER.MOBILE_NUMBER"), name="MOBILE_NUMBER"
    )
    referral_code_to = Column(
        String(10), unique=False, name="REFERRAL_CODE_TO", nullable=False
    )
    referral_code_from = Column(
        String(10), unique=False, name="REFERRAL_CODE_FROM", nullable=True
    )
    level_1_refer = Column(
        VARCHAR(256), unique=False, name="LEVEL_1_REFER", nullable=True, default=""
    )
    level_2_refer = Column(
        VARCHAR(256), unique=False, name="LEVEL_2_REFER", nullable=True, default=""
    )
    CREATE_DATE = Column(
        DateTime,
        unique=False,
        name="CREATE_DATE",
        nullable=False,
        default=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
    )
    UPDATE_DATE = Column(
        DateTime,
        unique=False,
        name="UPDATE_DATE",
        nullable=False,
        default=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
        onupdate=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
    )

    user = relationship("User", back_populates="referrals")
    # USER = relationship('User', back_populates='REFERRAL_TABLE')


class All_Referral_Winning(Base):
    __tablename__ = "ALL_REFERRAL_WINNING"

    id = Column(BigInteger, primary_key=True, unique=True,
                autoincrement=True, name="ID")
    mobile_number = Column(
        String(12), ForeignKey("USER.MOBILE_NUMBER"), name="MOBILE_NUMBER"
    )
    game_id = Column(String(14), unique=False, name="GAME_ID", nullable=False)
    level_1_refer = Column(
        VARCHAR(256), unique=False, name="LEVEL_1_REFER", nullable=True, default=""
    )
    level_2_refer = Column(
        VARCHAR(256), unique=False, name="LEVEL_2_REFER", nullable=True, default=""
    )
    amount_won = Column(
        Double, unique=False, name="AMOUNT_WON", nullable=True, default=0
    )
    CREATE_DATE = Column(
        DateTime,
        unique=False,
        name="CREATE_DATE",
        nullable=False,
        default=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
    )
    UPDATE_DATE = Column(
        DateTime,
        unique=False,
        name="UPDATE_DATE",
        nullable=False,
        default=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
        onupdate=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
    )


class Upi_Table(Base):
    __tablename__ = "UPI_TABLE"

    id = Column(
        BigInteger,
        primary_key=True,
        unique=True,
        index=True,
        autoincrement=True,
        name="ID",
    )
    upi_id = Column(String(40), unique=True, name="UPI_ID", nullable=False)
    name = Column(
        String(40), unique=False, name="USER_NAME", nullable=False, default=""
    )
    CREATE_DATE = Column(
        DateTime,
        unique=False,
        name="CREATE_DATE",
        nullable=False,
        default=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
    )
    UPDATE_DATE = Column(
        DateTime,
        unique=False,
        name="UPDATE_DATE",
        nullable=False,
        default=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
        onupdate=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
    )


class PaymentDepositTable(Base):
    __tablename__ = "DEPOSIT"

    ID = Column(BigInteger, primary_key=True, autoincrement=True)
    MOBILE_NUMBER = Column(String(10), unique=False, nullable=False)
    TRANSACTION_ID = Column(
        UUIDType(binary=False), unique=True, nullable=False, default=uuid.uuid4
    )
    ADMIN_UPI_ID = Column(String(50), nullable=True)
    UTR = Column(String(50), nullable=True, unique=False)
    CREATE_DATE = Column(DateTime, unique=False, nullable=False,
                         default=lambda: datetime.now(pytz.timezone('Asia/Kolkata')))
    AMOUNT = Column(Double, nullable=False)
    APPROVE_DEPOSIT = Column(Boolean, nullable=False,
                             unique=False, default=False)
    DENY_DEPOSIT = Column(Boolean, nullable=False, unique=False, default=False)
    IS_PROMOTIONAL = Column(Boolean, unique=False,
                            nullable=False, default=False)
    UPDATE_DATE = Column(
        DateTime,
        unique=False,
        nullable=False,
        default=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
        onupdate=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
    )


class PaymentWithdrawTable(Base):
    __tablename__ = "WITHDRAW"

    ID = Column(BigInteger, primary_key=True, autoincrement=True)
    MOBILE_NUMBER = Column(String(12), nullable=False)
    UTR = Column(String(50), nullable=True)
    USER_UPI_ID = Column(String(50), nullable=False)
    ADMIN_UPI_ID = Column(String(50), nullable=True)
    CREATE_DATE = Column(DateTime, unique=False, nullable=False,
                         default=lambda: datetime.now(pytz.timezone('Asia/Kolkata')))
    AMOUNT = Column(Double, nullable=False, unique=False)
    APPROVE_WITHDRAW = Column(Boolean, default=False)
    DENY_WITHDRAW = Column(Boolean, default=False)
    UPDATE_DATE = Column(
        DateTime,
        unique=False,
        nullable=False,
        default=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
        onupdate=lambda: datetime.now(pytz.timezone('Asia/Kolkata')),
    )


# User. = relationship("", back_populates="USER")
Base.metadata.create_all(bind=engine)

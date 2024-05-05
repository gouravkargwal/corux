from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_ENGINE = os.getenv("DATABASE_ENGINE")
DATABASE_USERNAME = os.getenv("DATABASE_USERNAME")
DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD").replace('@','%40')
DATABASE_NAME = os.getenv("DATABASE_NAME")
IP_PUBLIC = os.getenv("IP_PUBLIC")


DATABASE_URL = f"mysql+pymysql://{DATABASE_USERNAME}:{DATABASE_PASSWORD}@{IP_PUBLIC}/{DATABASE_NAME}"

# DATABASE_URL = f"mysql+pymysql://{DATABASE_USERNAME}:{DATABASE_PASSWORD}@localhost/{DATABASE_NAME}"


# Create an engine instance
engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_sql_db():
    try:
        _db = SessionLocal()
        yield _db
    finally:
        _db.close()

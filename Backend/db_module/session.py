from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Construct connection URL from environment variables
database_engine = os.getenv("DATABASE_ENGINE", "mysql+pymysql")
database_user = os.getenv("DATABASE_USER", "root")
database_password = os.getenv("DATABASE_PASSWORD", "admin@123").replace("@", "%40")
database_host = os.getenv("DATABASE_HOST", "127.0.0.1")
database_port = os.getenv("DATABASE_PORT", "3306")
database_name = os.getenv("DATABASE_NAME", "corux")

connection_url = f"{database_engine}://{database_user}:{database_password}@{database_host}:{database_port}/{database_name}"


engine = create_engine(connection_url, pool_recycle=3600)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_sql_db():
    try:
        _db = SessionLocal()
        yield _db
    finally:
        _db.close()

from fastapi import APIRouter, HTTPException, Depends
from models.user import Result, Winner_Table, Bet_Color, Bet_Number, All_Time_Winner_Table, User, Referral_table, All_Referral_Winning
from sqlalchemy.exc import SQLAlchemyError
from pydantic import ValidationError
from sqlalchemy.orm import Session
from db_module.session import get_sql_db
from utils.logger import setup_logger
from schema.user import result_detail
from sqlalchemy import text, delete, func, select,desc
import pandas as pd


router = APIRouter()
logger = setup_logger()


@router.get('/result-list/')
async def get_result_list(db: Session = Depends(get_sql_db)):
    try:
        result_list = db.query(Result).order_by(desc(Result.CREATE_DATE)).limit(10).all()
        return result_list
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)

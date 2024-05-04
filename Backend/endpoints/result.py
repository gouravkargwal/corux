from fastapi import APIRouter, HTTPException, Depends, Query
from models.user import (
    Result,
    Winner_Table,
    Bet_Color,
    Bet_Number,
    All_Time_Winner_Table,
    User,
    Referral_table,
    All_Referral_Winning,
)
from sqlalchemy.exc import SQLAlchemyError
from pydantic import ValidationError
from sqlalchemy.orm import Session
from db_module.session import get_sql_db
from utils.logger import setup_logger
from schema.user import result_detail
from sqlalchemy import text, delete, func, select, desc,asc
import pandas as pd
from typing import Optional


router = APIRouter()
logger = setup_logger()


@router.get("/result-list/")
async def get_result_list(
    page: int = Query(default=1, ge=1),
    size: int = Query(default=10, gt=0),
    db: Session = Depends(get_sql_db),
):
    try:
        if page < 1 or size <= 0:
            raise HTTPException(
                status_code=400, detail="Invalid page or size parameters"
            )

        skip = (page - 1) * size
        result_list = (
            db.query(Result)
            .order_by(desc(Result.game_id))
            .offset(skip)
            .limit(size)
            .all()
        )
        total_count = db.query(Result).count()

        return {"rows": result_list, "totalRows": total_count}
    except HTTPException as e:
        logger.error(str(e))
        raise HTTPException(status_code=e.status_code, detail=e.detail)
    except Exception as e:
        logger.error(str(e))
        raise HTTPException(status_code=500, detail=str(e))

from fastapi import APIRouter, HTTPException
from sqlalchemy import text, delete, and_, or_
from sqlalchemy.orm import Session
from db_module.session import get_sql_db
from models.user import (
    Bet_Color,
    Bet_Number,
    Winner_Table,
    All_Time_Winner_Table,
    User,
    Result,
    Referral_table,
    All_Referral_Winning,
)
from utils.logger import setup_logger
from db_module.session import SessionLocal
import pandas as pd
from pydantic import ValidationError
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime
import random


router = APIRouter()
logger = setup_logger()


def determine_winners(result_color, result_number, total_amount_bet):
    try:
        flag = 0
        winner_dict = {
            "total_amount_won": 0,
            "number_who_won": [],
            "color_who_won": [],
            "red": 0,
            "green": 0,
            "violet": 0,
            "is_profit": 0,
            "profit_ratio": 0,
        }

        shuffled_list = list(range(10))
        random.shuffle(shuffled_list)

        for i in shuffled_list:
            winner_dict_form = {
                "total_amount_won": 0,
                "number_who_won": [],
                "color_who_won": [],
                "red": 0,
                "green": 0,
                "violet": 0,
                "is_profit": 0,
                "profit_ratio": 0,
            }

            total_amount_won = 0
            minIndex = result_number["total_bet_amount"].nsmallest(
                i + 1).index[-1]
            min_number = result_number.loc[minIndex, "bet_on"]

            winner_dict_form["number_who_won"].append(min_number)

            total_amount_won = result_number["total_bet_amount"].iloc[minIndex] * 9
            if min_number % 2 == 0:
                if min_number != 0:
                    total_amount_won = (
                        total_amount_won
                        + result_color[result_color["bet_on"] == "red"][
                            "total_bet_amount"
                        ].iloc[0]
                        * 2
                    )
                    winner_dict_form["red"] = 2
                else:
                    total_amount_won = (
                        total_amount_won
                        + result_color[result_color["bet_on"] == "red"][
                            "total_bet_amount"
                        ].iloc[0]
                        * 1.5
                    )
                    winner_dict_form["red"] = 1.5

                winner_dict_form["color_who_won"].append("red")

            if min_number % 2 != 0:
                if min_number != 5:
                    total_amount_won = (
                        total_amount_won
                        + result_color[result_color["bet_on"] == "green"][
                            "total_bet_amount"
                        ].iloc[0]
                        * 2
                    )
                    winner_dict_form["green"] = 2

                else:
                    total_amount_won = (
                        total_amount_won
                        + result_color[result_color["bet_on"] == "green"][
                            "total_bet_amount"
                        ].iloc[0]
                        * 1.5
                    )
                    winner_dict_form["green"] = 1.5

                winner_dict_form["color_who_won"].append("green")

            if min_number in [0, 5]:
                total_amount_won = (
                    total_amount_won
                    + result_color[result_color["bet_on"] == "violet"][
                        "total_bet_amount"
                    ].iloc[0]
                    * 4.5
                )
                winner_dict_form["violet"] = 4.5

                winner_dict_form["color_who_won"].append("violet")
            winner_dict_form["total_amount_won"] = total_amount_won

            if total_amount_bet == 0:
                return winner_dict_form

            winner_dict_form["profit_ratio"] = (
                total_amount_bet - total_amount_won
            ) / total_amount_bet

            if flag is None:
                winner_dict = winner_dict_form
                flag = 1

            elif (
                winner_dict_form["profit_ratio"] > winner_dict["profit_ratio"]
                and winner_dict["profit_ratio"] < 0.25
            ):
                winner_dict = winner_dict_form

            elif (
                winner_dict_form["profit_ratio"] < winner_dict["profit_ratio"]
                and winner_dict_form["profit_ratio"] >= 0.25
            ):
                winner_dict = winner_dict_form

            else:
                pass

        return winner_dict

    except Exception as e:
        logger.error({"event": "determine_winners_error", "error": str(e)})
        return "error in determine"


async def get_result(game_id):
    db = SessionLocal()
    try:
        with db.begin():
            result_color = db.execute(
                text(
                    f"SELECT bet_on,sum(bet_amount) As total_bet_amount FROM BET_COLOR WHERE game_id = '{game_id}' GROUP BY bet_on"
                )
            )

            result_number = db.execute(
                text(
                    f"SELECT bet_on,sum(bet_amount) As total_bet_amount FROM BET_NUMBER WHERE game_id = '{game_id}' GROUP BY bet_on"
                )
            )
            result_color = [row._asdict() for row in result_color] or []
            result_number = [row._asdict() for row in result_number] or []

            result_color = pd.DataFrame(
                result_color, columns=["bet_on", "total_bet_amount"]
            )
            result_number = pd.DataFrame(
                result_number, columns=["bet_on", "total_bet_amount"]
            )

            for i in range(0, 10):
                if result_number[result_number["bet_on"] == i].empty:
                    result_number.loc[len(result_number)] = [i, 0]
            for i in ["red", "green", "violet"]:
                if result_color[result_color["bet_on"] == i].empty:
                    result_color.loc[len(result_color)] = [i, 0]
            total_amount_bet = (
                result_color["total_bet_amount"].sum()
                + result_number["total_bet_amount"].sum()
            )

            result_color["total_bet_amount"] = result_color["total_bet_amount"].astype(
                float
            )
            result_number["total_bet_amount"] = result_number[
                "total_bet_amount"
            ].astype(float)

            winner_dict = determine_winners(
                result_color, result_number, total_amount_bet
            )
            db.execute(delete(Winner_Table))

            new_result = Result(
                color_who_won=winner_dict["color_who_won"],
                number_who_won=winner_dict["number_who_won"],
                game_id=game_id,
            )

            db.add(new_result)
            db.execute(delete(Winner_Table))
            result_color = (
                db.query(Bet_Color).filter(Bet_Color.game_id == game_id).all()
            )
            result_number = (
                db.query(Bet_Number).filter(
                    Bet_Number.game_id == game_id).all()
            )

            result_list = []

            for row in result_color:
                amount_won = row.bet_amount * winner_dict[row.bet_on]
                result_list.append(
                    {
                        "mobile_number": row.mobile_number,
                        "amount": round(amount_won, 2),
                        "bet_on": row.bet_on,
                        "create_date": row.CREATE_DATE.isoformat(),
                    }
                )

                new_output_winner = Winner_Table(
                    game_id=game_id,
                    mobile_number=row.mobile_number,
                    color=row.bet_on,
                    amount_won=round(amount_won, 2),
                )
                new_output = All_Time_Winner_Table(
                    game_id=game_id,
                    bet_id=row.bet_id,
                    mobile_number=row.mobile_number,
                    color=row.bet_on,
                    amount_won=round(amount_won, 2),
                )

                db.add(new_output_winner)
                db.add(new_output)

            for row in result_number:
                amount_won = (
                    row.bet_amount * 9
                    if row.bet_on in winner_dict["number_who_won"]
                    else 0
                )
                result_list.append(
                    {
                        "mobile_number": row.mobile_number,
                        "amount": round(amount_won, 2),
                        "bet_on": row.bet_on,
                        "create_date": row.CREATE_DATE.isoformat(),
                    }
                )
                new_output_winner = Winner_Table(
                    game_id=game_id,
                    mobile_number=row.mobile_number,
                    number=row.bet_on,
                    amount_won=round(amount_won, 2),
                )

                new_output = All_Time_Winner_Table(
                    game_id=game_id,
                    bet_id=row.bet_id,
                    mobile_number=row.mobile_number,
                    number=row.bet_on,
                    amount_won=round(amount_won, 2),
                )

                db.add(new_output_winner)
                db.add(new_output)

            db.execute(
                User.__table__.update()
                .where(User.mobile_number == Winner_Table.mobile_number)
                .values(balance=Winner_Table.amount_won + User.balance)
            )

            for i in result_list:
                if i["amount"] > 0:
                    actual_amount_won = i["amount"]
                    if i["bet_on"] in ["green", "violet", "red"]:
                        user_bet = (
                            db.query(Bet_Color)
                            .filter(
                                and_(
                                    Bet_Color.game_id == game_id,
                                    Bet_Color.mobile_number == i["mobile_number"],
                                    Bet_Color.bet_on == i["bet_on"],
                                    Bet_Color.CREATE_DATE == datetime.fromisoformat(
                                        i["create_date"]),
                                )
                            )
                            .first()
                        )

                        actual_amount_won = i["amount"] - user_bet.bet_amount
                    else:
                        user_bet = (
                            db.query(Bet_Number)
                            .filter(
                                and_(
                                    Bet_Number.game_id == game_id,
                                    Bet_Number.mobile_number == i["mobile_number"],
                                    Bet_Number.CREATE_DATE == datetime.fromisoformat(
                                        i["create_date"]),
                                    Bet_Number.bet_on == i["bet_on"],
                                )
                            )
                            .first()
                        )

                        actual_amount_won = i["amount"] - user_bet.bet_amount
                    # print(actual_amount_won)
                    user_win = (
                        db.query(User)
                        .filter(User.mobile_number == i["mobile_number"])
                        .first()
                    )
                    if user_win:
                        user_won_amount = user_win.balance + i["amount"]
                        user_win.balance = round(user_won_amount, 2)
                    user_refer_by_level1 = (
                        db.query(Referral_table)
                        .filter(Referral_table.level_1_refer == i["mobile_number"])
                        .first()
                    )

                    if user_refer_by_level1:
                        user_level1 = (
                            db.query(User)
                            .filter(
                                User.mobile_number == user_refer_by_level1.mobile_number
                            )
                            .first()
                        )

                        if user_level1:
                            user_level1_win_commission = 0.03 * actual_amount_won

                            user_level1.balance = user_level1.balance + round(
                                user_level1_win_commission, 2
                            )
                            new_refer_win = All_Referral_Winning(
                                game_id=game_id,
                                mobile_number=user_level1.mobile_number,
                                level_1_refer=i["mobile_number"],
                                amount_won=round(
                                    user_level1_win_commission, 2),
                            )

                            db.add(new_refer_win)

                        user_refer_by_level2 = (
                            db.query(Referral_table)
                            .filter(Referral_table.level_2_refer == i["mobile_number"])
                            .first()
                        )

                        if user_refer_by_level2:
                            user_level2 = (
                                db.query(User)
                                .filter(
                                    User.mobile_number
                                    == user_refer_by_level2.mobile_number
                                )
                                .first()
                            )

                            if user_level2:
                                user_level2_win_commission = 0.015 * actual_amount_won
                                user_level2.balance = user_level2.balance + round(
                                    user_level2_win_commission, 2
                                )
                                new_refer_win_2 = All_Referral_Winning(
                                    game_id=game_id,
                                    mobile_number=user_level2.mobile_number,
                                    level_2_refer=i["mobile_number"],
                                    amount_won=round(
                                        user_level2_win_commission, 2),
                                )

                                db.add(new_refer_win_2)

        db.commit()
        logger.info(
            {"event": "result_calculated", "game_id": game_id, "winners": result_list}
        )
        return result_list
    except ValidationError as e:
        error_messages = []
        for error in e.errors():
            error_messages.append(
                {"loc": error["loc"], "msg": error["msg"],
                    "type": error["type"]}
            )
        logger.error({"event": "validation_error", "error": error_messages})
        raise HTTPException(status_code=422, detail=error_messages)
    except SQLAlchemyError as e:
        db.rollback()
        logger.error({"event": "sqlalchemy_error", "error": str(e)})
        raise HTTPException(status_code=500, detail="Database error occurred")
    except HTTPException as e:
        db.rollback()
        logger.error(
            {
                "event": "http_exception",
                "status_code": e.status_code,
                "detail": e.detail,
            }
        )
        raise HTTPException(status_code=e.status_code, detail=e.detail)
    except Exception as e:
        db.rollback()
        logger.error({"event": "unknown_error", "error": str(e)})
        raise HTTPException(
            status_code=500, detail="An unexpected error occurred")

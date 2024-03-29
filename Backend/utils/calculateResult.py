from fastapi import APIRouter, HTTPException
from sqlalchemy import text, delete, func, select
from sqlalchemy.orm import Session
from db_module.session import get_sql_db
from models.user import (
    Bet_Color,
    Bet_Number,
    Winner_Table,
    All_Time_Winner_Table,
    User,
    Result,
)
from schema.user import result_detail
from utils.logger import setup_logger

router = APIRouter()
logger = setup_logger()


async def determine_winners(result_color, result_number, total_amount_bet, winner_dict, minimum_loss_dict):
    try:
        logger.info("In determine winner")
        # Log the input dictionaries for debugging purposes
        logger.info(f"Result Number: {result_number}")
        logger.info(f"Result Color: {result_color}")

        # Prepare the winner_dict structure
        winner_dict["number_who_won"] = []
        winner_dict["color_who_won"] = []

        # Convert result_number to a list of tuples and sort by total_bet_amount
        sorted_numbers = sorted(result_number.items(), key=lambda x: x[1])

        for i in range(10):
            # Assume the first element is the one with the minimum total_bet_amount
            min_number, min_amount = sorted_numbers[i]

            # Reset the winners for each iteration based on the current minimum
            winner_dict["number_who_won"] = [min_number]
            winner_dict["color_who_won"] = []

            # Initial total amount won calculation for the current minimum number
            total_amount_won = min_amount * 0.98 * 9  # Assuming a fixed multiplier for simplification

            # Process color winnings based on the current minimum number's parity
            if min_number % 2 == 0 and min_number != 0:
                if "red" in result_color:
                    total_amount_won += result_color["red"] * 0.98 * 2  # Double winnings for red
                    winner_dict["color_who_won"].append("red")
                    winner_dict["red"] = 2  # Store winning multiplier for red
            elif min_number % 2 != 0:
                if "green" in result_color:
                    total_amount_won += result_color["green"] * 0.98 * 2  # Double winnings for green
                    winner_dict["color_who_won"].append("green")
                    winner_dict["green"] = 2  # Store winning multiplier for green

            # Additional conditions based on your game's logic
            # For example, handling specific numbers or conditions for "violet"
            # Adjust the logic below according to those specific rules
            
            # Update the total amount won in winner_dict
            winner_dict["total_amount_won"] = total_amount_won

            # Check if the current state is profitable
            if total_amount_bet > total_amount_won:
                winner_dict["is_profit"] = 1  # Mark as profit
                break  # Exit the loop if a profitable state is found
            else:
                # Update minimum_loss_dict if a lower loss is encountered
                if minimum_loss_dict["total_amount_won"] > total_amount_won:
                    minimum_loss_dict = dict(winner_dict)  # Ensure a deep copy is made

        logger.info(winner_dict)
        logger.info(minimum_loss_dict)
        return winner_dict, minimum_loss_dict
    except Exception as e:
        logger.error(f"Error in determine_winners: {str(e)}")
        # Return empty structures in case of an error
        raise HTTPException(status_code=400, detail=str(e))


async def get_result(result_detail: result_detail, db: Session):
    logger.info("going in get result")
    try:
        # with get_sql_db() as db:
            logger.info(123)
            result_color = (
                db.query(
                    Bet_Color.bet_on,
                    func.sum(Bet_Color.bet_amount).label("total_bet_amount"),
                )
                .group_by(Bet_Color.bet_on)
                .all()
            )

            result_number = (
                db.query(
                    Bet_Number.bet_on,
                    func.sum(Bet_Number.bet_amount).label("total_bet_amount"),
                )
                .group_by(Bet_Number.bet_on)
                .all()
            )

            result_color_dict = {
                item.bet_on: item.total_bet_amount for item in result_color
            }
            result_number_dict = {
                item.bet_on: item.total_bet_amount for item in result_number
            }

            logger.info(result_color_dict)
            logger.info(result_number_dict)

            for color in ["red", "green", "violet"]:
                if color not in result_color_dict:
                    result_color_dict[color] = 0

            for number in range(10):
                if number not in result_number_dict:
                    result_number_dict[number] = 0

            total_amount_bet = sum(result_color_dict.values()) + sum(
                result_number_dict.values()
            )

            winner_dict = {
                "total_amount_won": 0,
                "number_who_won": [],
                "color_who_won": [],
                "red": 0,
                "green": 0,
                "violet": 0,
                "is_profit": 0,
            }

            minimum_loss_dict = {
                "total_amount_won": float("inf"),
                "number_who_won": [],
                "color_who_won": [],
                "red": 0,
                "green": 0,
                "violet": 0,
                "is_profit": 0,
            }

            winner_dict, minimum_loss_dict = await determine_winners(
                result_color_dict,
                result_number_dict,
                total_amount_bet,
                winner_dict,
                minimum_loss_dict,
            )

            logger.info(winner_dict)
            logger.info(minimum_loss_dict)

            db.query(Winner_Table).delete()
            db.commit()

            if winner_dict["is_profit"] != 1:
                winner_dict = minimum_loss_dict

            new_result = Result(
                color_who_won=winner_dict["color_who_won"],
                number_who_won=winner_dict["number_who_won"],
                period=result_detail,
            )

            db.add(new_result)
            db.commit()

            result_color = db.query(Bet_Color).all()
            result_number = db.query(Bet_Number).all()

            result_list = []

            for row in result_color:
                result_list.append(
                    {
                        "mobile_number": row.mobile_number,
                        "amount": row.bet_amount * winner_dict[row.bet_on],
                    }
                )

                new_output_winner = Winner_Table(
                    period=result_detail,
                    mobile_number=row.mobile_number,
                    color=row.bet_on,
                    amount_won=row.bet_amount * winner_dict[row.bet_on],
                )
                new_output = All_Time_Winner_Table(
                    period=result_detail,
                    mobile_number=row.mobile_number,
                    color=row.bet_on,
                    amount_won=row.bet_amount * winner_dict[row.bet_on],
                )

                logger.info(new_output)
                logger.info(new_output_winner)
                db.add(new_output_winner)
                db.add(new_output)
                db.commit()

                logger.info(result_number)

            for row in result_number:
                logger.info(row)
                result_list.append(
                    {"mobile_number": row.mobile_number, "amount": row.bet_amount * 9}
                )

                new_output_winner = Winner_Table(
                    period=result_detail,
                    mobile_number=row.mobile_number,
                    number=row.bet_on,
                    amount_won=row.bet_amount * 9,
                )

                new_output = All_Time_Winner_Table(
                    period=result_detail,
                    mobile_number=row.mobile_number,
                    number=row.bet_on,
                    amount_won=row.bet_amount * 9,
                )

                logger.info(new_output)
                logger.info(new_output_winner)
                db.add(new_output_winner)
                db.add(new_output)
                db.commit()

            users_to_update = (
                db.query(User)
                .join(Winner_Table, User.mobile_number == Winner_Table.mobile_number)
                .all()
            )

            logger.info(users_to_update)
            for user in users_to_update:
                logger.info(user)
                user.balance += (
                    db.query(func.sum(Winner_Table.amount_won))
                    .filter(Winner_Table.mobile_number == user.mobile_number)
                    .scalar()
                )
            db.commit()
            logger.info(result_list)
            return result_list

    except Exception as e:
        db.rollback()
        logger.error(str(e))
        raise HTTPException(status_code=400, detail=str(e))


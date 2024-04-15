# game_manager.py
from datetime import datetime, timedelta
from fastapi_socketio import SocketManager
from db_module.crud import get_game_state, update_game_state, create_game_state
from utils.calculateResult import get_result
from utils.logger import setup_logger
import asyncio

logger = setup_logger()

game_duration = timedelta(minutes=3)  # each game runs for 3 minutes

async def game_cycle(sio_manager: SocketManager, db_session):
    while True:  # Loop to start a new game after one ends
        game_state = get_game_state(db_session)
        if not game_state or not game_state.active:
            await asyncio.sleep(10)  # Check every 10 seconds if the game should start
            continue

        start_time = datetime.now()
        game_id = start_time.strftime("%Y%m%d%H%M%S")
        create_game_state(db_session, game_id, start_time)

        while (datetime.now() - start_time) < game_duration:
            remaining_time = game_duration - (datetime.now() - start_time)
            await sio_manager.emit("game_state", {"remaining_time": int(remaining_time.total_seconds()), "game_id": game_id})
            await asyncio.sleep(1)  # Update every second

        # Calculate result
        winning_user_id = await get_result(game_id, db_session)
        await sio_manager.emit("winner_notification", {"message": "Congratulations!", "user_list": winning_user_id})
        update_game_state(db_session, game_id, result_calculated=True)

        if not game_state.continue_game:
            break  # Exit the loop if stop has been requested

        await asyncio.sleep(5)  # Optional delay before next game starts

async def start_game_cycle(sio_manager: SocketManager, db_session):
    create_game_state(db_session, active=True, continue_game=True)  # Set the game as active
    await game_cycle(sio_manager, db_session)

async def stop_game_cycle(db_session):
    game_state = get_game_state(db_session)
    if game_state:
        update_game_state(db_session, continue_game=False)  # This will cause the game cycle loop to exit after the current game

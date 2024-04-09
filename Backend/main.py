from fastapi import FastAPI
from endpoints.auth import router as Authrouter
from endpoints.user import router as Userrouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, WebSocket
from fastapi.responses import JSONResponse
from datetime import datetime, timedelta
from typing import List
from fastapi_socketio import SocketManager
from utils.calculateResult import get_result
from utils.logger import setup_logger
from db_module.session import SessionLocal

logger = setup_logger()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allow_headers=["*"],
)

app.include_router(Authrouter, tags=["Auth"], prefix="/auth")
app.include_router(Userrouter, tags=["User"], prefix="/user")


# Initialize Socket.IO manager
sio_manager = SocketManager(app=app, path="/ws")

# Initialize your game variables
game_id = None
start_time = None
game_duration = timedelta(minutes=1.5)
betting_duration = timedelta(minutes=1)
result_calculated = False


def generate_game_id():
    now = datetime.now()  # Using UTC to avoid timezone confusion
    game_id = now.strftime("%Y%m%d%H%M%S")  # Formatting the date and time
    return game_id


@app.on_event("startup")
async def startup():
    # db = SessionLocal()
    # await get_result(123516, db)
    sio_manager.start_background_task(notify_timer)
    await start_game()  # Automatically start a game on server startup


async def start_game():
    global start_time, game_id, result_calculated
    start_time = datetime.utcnow()
    game_id = generate_game_id()
    result_calculated = False
    return {"message": "Game started!", "game_id": game_id}


async def notify_timer():
    try:
        db = SessionLocal()
        global game_id, start_time, result_calculated
        while True:
            if start_time is None:
                await sio_manager.emit("game_state", {"error": "Game not started"})
            else:
                now = datetime.utcnow()
                elapsed_time = now - start_time
                remaining_time = game_duration - elapsed_time

                if elapsed_time < betting_duration:
                    phase = "betting"
                else:
                    phase = "results"

                await sio_manager.emit(
                    "game_state",
                    {
                        "phase": phase,
                        "remaining_time": int(remaining_time.total_seconds()),
                        "game_id": game_id,
                    },
                )

                if (
                    elapsed_time >= game_duration - timedelta(seconds=30)
                    and not result_calculated
                ):
                    winning_user_id = await get_result(game_id, db)
                    result_calculated = True

                if elapsed_time >= game_duration and result_calculated:
                    await sio_manager.sleep(5)
                    await sio_manager.emit(
                        "winner_notification",
                        {
                            "message": "Congratulations!",
                            "user_list": winning_user_id,
                        },
                    )
                    await sio_manager.sleep(5)
                    await start_game()

            await sio_manager.sleep(1)
    except Exception as e:
        logger.error(str(e))


from fastapi import FastAPI, HTTPException
from endpoints.auth import router as Authrouter
from endpoints.user import router as Userrouter
from endpoints.result import router as Resultrouter
from endpoints.wallet import router as Walletrouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, WebSocket
from fastapi.responses import JSONResponse
from datetime import datetime, timedelta
from typing import List
from fastapi_socketio import SocketManager
from utils.calculateResult import get_result
from utils.logger import setup_logger
from db_module.session import SessionLocal
from models.user import Upi_Table
import asyncio

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
app.include_router(Resultrouter, tags=["Result"], prefix="/result")
app.include_router(Walletrouter, tags=["Wallet"], prefix="/wallet")

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


# @app.on_event("startup")
# async def startup_event():
#     global background_task
#     # Initialize the background task but do not start it yet
#     background_task = asyncio.create_task(notify_timer)


async def start_game():
    global start_time, game_id, result_calculated, game_inprocess,game_finishing
    start_time = datetime.now()
    game_id = generate_game_id()
    game_inprocess = True
    game_finishing = False
    result_calculated = False
    return {"message": "Game started!", "game_id": game_id}


async def notify_timer():
    try:
        global task_running, game_inprocess,game_finishing
        global game_id, start_time, result_calculated

        while task_running:
            if start_time is None:
                await sio_manager.emit("game_state", {"error": "Game not started"})
            else:
                now = datetime.now()
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
                    elapsed_time >= game_duration - timedelta(seconds=28)
                    and not result_calculated
                ):
                    winning_user_id = await get_result(game_id)
                    result_calculated = True

                if elapsed_time >= game_duration and result_calculated:
                    game_finishing = True
                    await sio_manager.sleep(5)
                    await sio_manager.emit(
                        "winner_notification",
                        {
                            "message": "Congratulations!",
                            "user_list": winning_user_id,
                        },
                    )
                    game_inprocess = False
                    await sio_manager.sleep(5)
                    await start_game()
                    game_finishing = False

            await sio_manager.sleep(1)
    except Exception as e:
        logger.error(str(e))


@app.post("/control/timer/start")
async def start_timer():
    try:
        global task_running, game_inprocess
        game_inprocess = True
        task_running = False
        if not task_running:
            task_running = True
            sio_manager.start_background_task(notify_timer)
            await start_game()
            return {"status": "Timer started"}
        else:
            logger.error("Error1")
        raise HTTPException(status_code=400, detail="Timer already running")
    except Exception as e:
        raise HTTPException(status_code=400, detail="Unable To Stop Timer")


@app.post("/control/timer/stop")
async def stop_timer():
    try:
        global task_running, game_inprocess,game_finishing
        if task_running:
            while game_inprocess and not game_finishing:
                await asyncio.sleep(1)
            task_running = False
            game_inprocess= False
            return {"status": "Timer stopped"}
        else:
            logger.error("Error")
            raise HTTPException(status_code=400, detail="Timer is not running")
    except Exception as e:
        logger.error("Error in Stop Timer")
        raise HTTPException(status_code=400, detail="Unable To Stop Timer")

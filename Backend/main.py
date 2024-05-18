from fastapi import FastAPI, HTTPException, Request, Depends, Query
from db_module.session import get_sql_db
from fastapi.middleware.cors import CORSMiddleware
from fastapi_socketio import SocketManager
from utils.calculateResult import get_result
from utils.logger import setup_logger
from game_logic import Game
from datetime import datetime
import asyncio
import traceback
import os

# Import routers for your application
from endpoints.auth import router as Authrouter
from endpoints.user import router as Userrouter
from endpoints.result import router as Resultrouter
from endpoints.wallet import router as Walletrouter

logger = setup_logger()
app = FastAPI(docs_url=None)
# app = FastAPI()

allowed_origins = ["https://vegagaming.fun", "https://adminvegagaming.online"]
# allowed_origins = ["http://127.0.0.1:8080"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# @app.middleware("https")
# async def log_requests(request: Request, call_next):
#     logger.info(f"Request headers: {request.headers}")
#     response = await call_next(request)
#     logger.info(f"Response headers: {response.headers}")
#     return response

# Include routers for endpoints
app.include_router(Authrouter, tags=["Auth"], prefix="/auth")
app.include_router(Userrouter, tags=["User"], prefix="/user")
app.include_router(Resultrouter, tags=["Result"], prefix="/result")
app.include_router(Walletrouter, tags=["Wallet"], prefix="/wallet")


sio_manager = SocketManager(
    app=app, cors_allowed_origins=allowed_origins, mount_location='/ws', socketio_path='/')

game = Game()
task_running = False
connected_clients = set()
game_inprocess = False
game_finishing = False


@sio_manager.on("connect")
async def handle_connect(sid, environ=None, auth=None):
    try:
        connected_clients.add(sid)
        game_state = game.update_state()
        if game_inprocess:
            await sio_manager.emit("game_state", game_state, room=sid)
        logger.info(f"Client connected: SID={sid}, Game State={game_state}")
    except Exception as e:
        logger.error(f"Connection error on connect: {str(e)}", exc_info=True)
        await sio_manager.emit('error', {'error': 'Connection failed'}, room=sid)


@sio_manager.on("disconnect")
async def handle_disconnect(sid):
    try:
        connected_clients.remove(sid)
        logger.info(f"Client disconnected: SID={sid}")
    except Exception as e:
        logger.error(
            f"Connection error on disconnect: {str(e)}", exc_info=True)


async def notify_timer():
    global task_running, game_inprocess, game_finishing
    while task_running:
        game_inprocess = True
        game_finishing = False
        try:
            game_state = game.update_state()
            if game_state:
                if connected_clients:
                    await sio_manager.emit("game_state", game_state)
                    # logger.info(
                    #     {"event": "game_state_emitted", "state": game_state})

                if game.is_result_ready():
                    max_retries = 3
                    retry_count = 0
                    success = False

                    while retry_count < max_retries and not success:
                        try:
                            winning_user_id = await get_result(game.game_id)
                            success = True
                        except Exception as e:
                            retry_count += 1
                            logger.error(
                                {
                                    "event": "result_calculation_error",
                                    "attempt": retry_count,
                                    "error": str(e),
                                }
                            )
                            logger.error(traceback.format_exc())
                            await asyncio.sleep(1)  # Wait before retrying

                    if not success:
                        logger.error(
                            {
                                "event": "result_calculation_failed",
                                "message": "Retries exhausted. Moving to the next game.",
                                "game_id": game.game_id,
                            }
                        )
                    game.finalize_results()
                    game_finishing = True

                    if connected_clients and success:
                        await sio_manager.emit(
                            "winner_notification",
                            {
                                "message": "Congratulations!",
                                "user_list": winning_user_id,
                            },
                        )
                        logger.info(
                            {
                                "event": "winner_notification_emitted",
                                "user_list": winning_user_id,
                            }
                        )
                    game_inprocess = False
            if not game_inprocess:
                await asyncio.sleep(5)
                game.start_game()
                game_finishing = False

            await asyncio.sleep(1)
        except Exception as e:
            logger.error({"event": "notify_timer_error", "error": str(e)})
            logger.error(traceback.format_exc())


@app.post("/control/timer/start")
async def start_timer():
    global task_running
    try:
        if not task_running:
            task_running = True
            game.start_game()
            sio_manager.start_background_task(notify_timer)
            return {"status": "Timer started"}
        raise HTTPException(status_code=400, detail="Timer already running")
    except Exception as e:
        logger.error({"event": "timer_start_error", "error": str(e)})
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail="Unable to start timer")


@app.post("/control/timer/stop")
async def stop_timer():
    try:
        global task_running, game_inprocess, game_finishing
        if task_running:
            while game_inprocess and not game_finishing:
                await asyncio.sleep(1)
            task_running = False
            game_inprocess = False
            # sio_manager.disconnect()
            # connected_clients.clear()
            # game.update_state()
            return {"status": "Timer stopped"}
        else:
            logger.error("Error")
            raise HTTPException(status_code=400, detail="Timer is not running")
    except Exception as e:
        logger.error("Error in Stop Timer")
        raise HTTPException(status_code=400, detail="Unable To Stop Timer")

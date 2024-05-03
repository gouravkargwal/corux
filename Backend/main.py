# from fastapi import FastAPI, HTTPException
# from endpoints.auth import router as Authrouter
# from endpoints.user import router as Userrouter
# from endpoints.result import router as Resultrouter
# from endpoints.wallet import router as Walletrouter
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi import FastAPI, WebSocket
# from fastapi.responses import JSONResponse
# from datetime import datetime, timedelta
# from typing import List
# from fastapi_socketio import SocketManager
# from utils.calculateResult import get_result
# from utils.logger import setup_logger
# from db_module.session import SessionLocal
# from models.user import Upi_Table
# import asyncio


# logger = setup_logger()
# app = FastAPI()


# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
#     allow_headers=["*"],
# )

# app.include_router(Authrouter, tags=["Auth"], prefix="/auth")
# app.include_router(Userrouter, tags=["User"], prefix="/user")
# app.include_router(Resultrouter, tags=["Result"], prefix="/result")
# app.include_router(Walletrouter, tags=["Wallet"], prefix="/wallet")


# # Initialize Socket.IO manager
# sio_manager = SocketManager(app=app, path="/ws")


# # Initialize your game variables
# i = 0
# game_id = None
# start_time = None
# game_duration = timedelta(minutes=1.5)
# betting_duration = timedelta(minutes=1)
# result_calculated = False
# start_game_lock = asyncio.Lock()
# task_running = False
# game_state = {
#     "phase": "betting",
#     "remaining_time": int(
#         timedelta(minutes=1.5).total_seconds()
#     ),  # Example remaining time in seconds
#     "game_id": game_id,
# }


# def generate_game_id():
#     now = datetime.now()  # Using UTC to avoid timezone confusion
#     game_id = now.strftime("%Y%m%d%H%M%S")  # Formatting the date and time
#     return game_id


# @app.on_event("startup")
# async def startup():
#     # db = SessionLocal()
#     # # await get_result(123516, db)
#     await sio_manager.start_background_task(notify_timer)
#     # await sio_manager.start_background_task(emit_game_state)
#     await start_game()  # Automatically start a game on server startup


# @sio_manager.on("disconnect")
# async def handle_disconnect(sid):
#     # Logic to handle disconnection
#     logger.error(f"Client disconnected")


# @sio_manager.on("connect")
# async def handle_connect(sid, environ=None, auth=None):
#     try:
#         logger.error(f"Client connected")
#         global start_time, game_duration, betting_duration, game_id
#         now_conn = datetime.now()
#         elapsed_time_conn = now_conn - start_time
#         remaining_time_conn = game_duration - elapsed_time_conn
#         if elapsed_time_conn < betting_duration:
#             phase_conn = "betting"
#         else:
#             phase_conn = "results"
#         game_state.update(
#             {
#                 "phase": phase_conn,
#                 "remaining_time": int(remaining_time_conn.total_seconds()),
#                 "game_id": game_id,
#             }
#         )
#     except Exception as e:
#         logger.error(str(e))


# async def start_game():
#     global start_time, game_id, result_calculated, game_inprocess, game_finishing
#     async with start_game_lock:
#         start_time = datetime.now()
#         game_id = generate_game_id()
#         game_inprocess = True
#         game_finishing = False
#         result_calculated = False
#         game_state.update(
#             {
#                 "phase": "betting",
#                 "remaining_time": int(timedelta(minutes=1.5).total_seconds()),
#                 "game_id": game_id,
#             }
#         )
#         return {"message": "Game started!", "game_id": game_id}


# # async def emit_game_state():
# #     global task_running,start_time,betting_duration,game_id,game_inprocess
# #     """Periodically emits the game state to all connected clients."""
# #     while task_running:
# #         async with start_game_lock:
# #             if start_time is None:
# #                 await sio_manager.emit("game_state", {"error": "Game not started"})
# #             else:
# #                 now = datetime.now()
# #                 elapsed_time = now - start_time
# #                 remaining_time = game_duration - elapsed_time
# #                 if elapsed_time < betting_duration:
# #                     phase = "betting"
# #                 else:
# #                     phase = "results"
# #                 game_state.update({
# #                     "phase": phase,
# #                     "remaining_time": int(remaining_time.total_seconds()),
# #                     "game_id": game_id,
# #                 })
# #                 await sio_manager.emit(
# #                     "game_state",
# #                     game_state,
# #                 )
# #                 if elapsed_time >= game_duration:
# #                     # game_finishing = True
# #                     await sio_manager.sleep(6)
# #                     # game_inprocess = False
# #             if not game_inprocess:
# #                 await sio_manager.sleep(5)
# #                 await start_game()
# #                 # game_finishing = False
# #             await sio_manager.sleep(1)


# async def notify_timer():
#     try:
#         global task_running, game_inprocess, game_finishing
#         global game_id, start_time, result_calculated, i
#         while task_running:
#             async with start_game_lock:
#                 if start_time is None:
#                     await sio_manager.emit("game_state", {"error": "Game not started"})
#                 else:
#                     now = datetime.now()
#                     elapsed_time = now - start_time
#                     remaining_time = game_duration - elapsed_time
#                     if elapsed_time < betting_duration:
#                         phase = "betting"
#                     else:
#                         phase = "results"
#                     game_state.update(
#                         {
#                             "phase": phase,
#                             "remaining_time": int(remaining_time.total_seconds()),
#                             "game_id": game_id,
#                         }
#                     )
#                     if sio_manager.is_connected():
#                         await sio_manager.emit(
#                             "game_state",
#                             game_state,
#                         )

#                     if (
#                         elapsed_time >= game_duration - timedelta(seconds=28)
#                         and not result_calculated
#                     ):
#                         winning_user_id = await get_result(game_id)
#                         result_calculated = True
#                     if elapsed_time >= game_duration and result_calculated:
#                         game_finishing = True
#                         await sio_manager.sleep(5)
#                         await sio_manager.emit(
#                             "winner_notification",
#                             {
#                                 "message": "Congratulations!",
#                                 "user_list": winning_user_id,
#                             },
#                         )
#                         game_inprocess = False
#             if not game_inprocess:
#                 await sio_manager.sleep(5)
#                 await start_game()
#                 game_finishing = False
#             await sio_manager.sleep(1)
#     except Exception as e:
#         logger.error(str(e))


# @app.post("/control/timer/start")
# async def start_timer():
#     try:
#         global task_running, game_inprocess
#         game_inprocess = True
#         task_running = False
#         if not task_running:
#             task_running = True
#             await start_game()
#             # sio_manager.start_background_task(emit_game_state)
#             sio_manager.start_background_task(notify_timer)
#             return {"status": "Timer started"}
#         else:
#             logger.error("Error1")
#         raise HTTPException(status_code=400, detail="Timer already running")
#     except Exception as e:
#         raise HTTPException(status_code=400, detail="Unable To Stop Timer")


# @app.post("/control/timer/stop")
# async def stop_timer():
#     try:
#         global task_running, game_inprocess, game_finishing
#         if task_running:
#             while game_inprocess and not game_finishing:
#                 await asyncio.sleep(1)
#             task_running = False
#             game_inprocess = False
#             return {"status": "Timer stopped"}
#         else:
#             logger.error("Error")
#             raise HTTPException(status_code=400, detail="Timer is not running")
#     except Exception as e:
#         logger.error("Error in Stop Timer")
#         raise HTTPException(status_code=400, detail="Unable To Stop Timer")

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi_socketio import SocketManager
from utils.calculateResult import get_result
from utils.logger import setup_logger
from game_logic import Game
import asyncio
import traceback

# Import routers for your application
from endpoints.auth import router as Authrouter
from endpoints.user import router as Userrouter
from endpoints.result import router as Resultrouter
from endpoints.wallet import router as Walletrouter

logger = setup_logger()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allow_headers=["*"],
)

# Include routers for endpoints
app.include_router(Authrouter, tags=["Auth"], prefix="/auth")
app.include_router(Userrouter, tags=["User"], prefix="/user")
app.include_router(Resultrouter, tags=["Result"], prefix="/result")
app.include_router(Walletrouter, tags=["Wallet"], prefix="/wallet")

sio_manager = SocketManager(app=app, path="/ws")
game = Game()
task_running = False
connected_clients = set()


@sio_manager.on("connect")
async def handle_connect(sid, environ=None, auth=None):
    try:
        connected_clients.add(sid)
        game_state = game.update_state()
        await sio_manager.emit("game_state", game_state, room=sid)
        logger.info({"event": "client_connected", "sid": sid})
    except Exception as e:
        logger.error({"event": "connection_error", "error": str(e)})
        logger.error(traceback.format_exc())


@sio_manager.on("disconnect")
async def handle_disconnect(sid):
    connected_clients.remove(sid)
    logger.info({"event": "client_disconnected", "sid": sid})


# async def notify_timer():
#     global task_running
#     while task_running:
#         try:
#             game_state = game.update_state()
#             if game_state:
#                 if connected_clients:
#                     await sio_manager.emit("game_state", game_state)
#                     logger.info({"event": "game_state_emitted", "state": game_state})

#                 if game.is_result_ready():
#                     try:
#                         winning_user_id = await get_result(game.game_id)
#                     except Exception as e:
#                         logger.error(
#                             {"event": "result_calculation_error", "error": str(e)}
#                         )
#                         continue

#                     game.finalize_results()
#                     if connected_clients:
#                         await sio_manager.emit(
#                             "winner_notification",
#                             {
#                                 "message": "Congratulations!",
#                                 "user_list": winning_user_id,
#                             },
#                         )
#                         logger.info(
#                             {
#                                 "event": "winner_notification_emitted",
#                                 "user_list": winning_user_id,
#                             }
#                         )
#                     await asyncio.sleep(5)
#                     game.start_game()

#             await asyncio.sleep(1)
#         except Exception as e:
#             logger.error({"event": "notify_timer_error", "error": str(e)})
#             logger.error(traceback.format_exc())


async def notify_timer():
    global task_running
    while task_running:
        try:
            game_state = game.update_state()
            if game_state:
                if connected_clients:
                    await sio_manager.emit("game_state", game_state)
                    logger.info({"event": "game_state_emitted", "state": game_state})

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
                    await asyncio.sleep(5)
                    game.start_game()

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
    global task_running
    try:
        if task_running:
            task_running = False
            return {"status": "Timer stopped"}
        raise HTTPException(status_code=400, detail="Timer is not running")
    except Exception as e:
        logger.error({"event": "timer_stop_error", "error": str(e)})
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail="Unable to stop timer")

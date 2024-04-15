from fastapi_socketio import SocketManager

sio_manager = SocketManager()

def attach(app):
    sio_manager.init_app(app)

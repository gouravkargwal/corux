from sqlalchemy.orm import Session
from models.game_state import GameState
from datetime import datetime


def get_game_state(db: Session):
    return db.query(GameState).order_by(GameState.start_time.desc()).first()


def create_game_state(db: Session, game_id: str, start_time: datetime):
    db_game_state = GameState(
        game_id=game_id, start_time=start_time, active=True, result_calculated=False
    )
    db.add(db_game_state)
    db.commit()
    return db_game_state


def update_game_state(db: Session, game_id: str, **kwargs):
    db.query(GameState).filter(GameState.game_id == game_id).update(kwargs)
    db.commit()

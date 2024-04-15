from sqlalchemy import Column, String, Boolean, DateTime
from db_module.session import Base

class GameState(Base):
    __tablename__ = "game_states"

    game_id = Column(String, primary_key=True)
    start_time = Column(DateTime)
    active = Column(Boolean, default=True)
    result_calculated = Column(Boolean, default=False)

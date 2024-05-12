from datetime import datetime, timedelta
import logging


class Game:
    def __init__(self, game_duration_minutes=180, betting_duration_minutes=150):
        self.game_duration = timedelta(seconds=game_duration_minutes)
        self.betting_duration = timedelta(seconds=betting_duration_minutes)
        self.start_time = None
        self.game_id = None
        self.result_calculated = False
        self.state = {
            "phase": "betting",
            "remaining_time": int(self.game_duration.total_seconds()),
            "game_id": None,
        }
        self.logger = logging.getLogger(__name__)

    def generate_game_id(self):
        return datetime.now().strftime("%Y%m%d%H%M%S")

    def start_game(self):
        self.start_time = datetime.now()
        self.game_id = self.generate_game_id()
        self.result_calculated = False
        # self.logger.info(
        #     {
        #         "event": "game_started",
        #         "game_id": self.game_id,
        #         "start_time": str(self.start_time),
        #     }
        # )
        self.update_state()

    def update_state(self):
        if not self.start_time:
            return None

        now = datetime.now()
        elapsed_time = now - self.start_time
        remaining_time = self.game_duration - elapsed_time

        if remaining_time.total_seconds() < 0:
            remaining_time = timedelta(seconds=0)

        phase = "betting" if elapsed_time < self.betting_duration else "results"
        self.state.update(
            {
                "phase": phase,
                "remaining_time": int(remaining_time.total_seconds()),
                "game_id": self.game_id,
            }
        )
        # self.logger.info(
        #     {
        #         "event": "game_state_updated",
        #         "game_id": self.game_id,
        #         "state": self.state,
        #     }
        # )

        return self.state

    def is_result_ready(self):
        is_ready = (
            self.start_time
            and (datetime.now() - self.start_time) >= self.game_duration
            and not self.result_calculated
        )
        if is_ready:
            self.logger.info(
                {"event": "result_ready", "game_id": self.game_id})
        return is_ready

    def finalize_results(self):
        self.result_calculated = True
        self.logger.info(
            {"event": "results_finalized", "game_id": self.game_id})

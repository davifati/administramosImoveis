import os
from datetime import datetime

class BotLogger:
    def __init__(self, bot_name):
        self.log_dir = "logs"
        if not os.path.exists(self.log_dir):
            os.makedirs(self.log_dir)

        timestamp = datetime.
import os

import pandas as pd
from dotenv import load_dotenv
from games.arrow_game import analyse_arrow_game
from lib.db import DB

load_dotenv(".env")
db = DB(os.getenv("DOCUMENT_URI"))


test_data = pd.DataFrame(
    {
        "accuracy": [True, True, True, True],
        "reactionTime": [504, 386, 372, 489],
        "primerDir": ["right", "right", "right", "right"],
        "topFlankerDir": ["left", "right", "right", "left"],
        "bottomFlankerDir": ["right", "right", "left", "right"],
    }
)

print(analyse_arrow_game(test_data))

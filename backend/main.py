import os

from dotenv import load_dotenv
from lib.db import DB

load_dotenv(".env.local")
db = DB(os.getenv("DOCUMENT_URI"))
print(db.get_collection("test"))

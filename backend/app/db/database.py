# ← Database setup
from motor.motor_asyncio import AsyncIOMotorClient
import os

from dotenv import load_dotenv

load_dotenv()

MONGO_URL_LINK = os.getenv("MONGO_URL")
DATABASE_NAME = os.getenv("DB_NAME")

client = AsyncIOMotorClient(MONGO_URL_LINK)
database = client[DATABASE_NAME]

todo_collection = database.get_collection("todos")

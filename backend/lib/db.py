"""
This module defines the DB class created through the singleton pattern
"""

from pymongo import MongoClient


class DB:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super().__new__(cls)
            cls._instance._initialize(*args, **kwargs)
        return cls._instance

    def _initialize(self, db_uri):
        self.collection = MongoClient(db_uri)["test"]

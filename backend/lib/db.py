"""
This module defines the DB class created through the singleton pattern
"""

from pymongo import MongoClient


class DB:
    _instance = None
    client = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super().__new__(cls)
            cls._instance._initialize(*args, **kwargs)
        return cls._instance

    def _initialize(self, db_uri):
        """Initializes the db"""
        self.client = MongoClient(db_uri)

    def get_collection(self, collection_name):
        """Get a collection from the database."""
        return self.client[collection_name]

    def close(self):
        """Close the MongoDB client connection."""
        self.client.close()
        DB._instance = None



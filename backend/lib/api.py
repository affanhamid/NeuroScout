import os

import pandas as pd
from bson import ObjectId
from dotenv import load_dotenv
from lib.db import DB

load_dotenv(".env")
db = DB(os.getenv("DOCUMENT_URI"))


def get_player_observations(player_id: str):
    player_object_id = ObjectId(player_id)

    pipeline = [
        {"$match": {"_id": player_object_id}},
        {"$addFields": {"string_id": {"$toString": "$_id"}}},
        {
            "$lookup": {
                "from": "game observations",
                "localField": "string_id",
                "foreignField": "playerId",
                "as": "gameObservations",
            }
        },
        {
            "$project": {
                "firstName": 1,
                "lastName": 1,
                "age": 1,
                "position": 1,
                "organizationId": 1,
                "gameObservations": {
                    "$map": {
                        "input": "$gameObservations",
                        "as": "observation",
                        "in": {
                            "gameId": "$$observation.gameId",
                            "data": "$$observation.data",
                            "scores": "$$observation.scores",
                            "reactionTimes": "$$observation.reactionTimes",
                            "createdAt": "$$observation.createdAt",
                        },
                    }
                },
            }
        },
    ]

    try:
        players_collection = db.get_collection("test").players
        players_data = list(players_collection.aggregate(pipeline))

        if not players_data:
            raise Exception(f"No player found with ID: {player_id}")

        player = players_data[0]

        player_dict = {
            "playerId": str(player["_id"]),
            "firstName": player["firstName"],
            "lastName": player["lastName"],
            "age": player["age"],
            "position": player["position"],
            "organizationId": str(player["organizationId"]),
            "gameObservations": {},
        }

        for observation in player.get("gameObservations", []):
            game_id = str(observation.get("gameId", ""))
            player_dict["gameObservations"][game_id] = {
                "gameId": game_id,
                "data": observation.get("data", {}),
                "scores": observation.get("scores", []),
                "reactionTimes": observation.get("reactionTimes", []),
                "createdAt": observation.get("createdAt"),
            }

        return player_dict

    except Exception as e:
        print(f"Error processing database query: {str(e)}")
        raise

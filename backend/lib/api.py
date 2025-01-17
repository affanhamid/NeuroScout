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

def get_organization_observations(organization_id: str):
    try:
        organizations_collection = db.get_collection("test").get_collection("organizations")
        organization = organizations_collection.find_one({"_id": ObjectId(organization_id)})
        
        if not organization:
            raise Exception(f"No organization found with ID: {organization_id}")
            
        players_collection = db.get_collection("test").get_collection("players")
        players = list(players_collection.find({"organizationId": organization_id}))
        
        organization_dict = {
            "organizationId": organization_id,
            "name": organization["name"],
            "numberOfPlayers": len(players),
            "gameObservations": pd.DataFrame()
        }
        
        if not players:
            return organization_dict
            
        all_observations = []
        
        for player in players:
            player_id = str(player["_id"])
            try:
                player_data = get_player_observations(player_id)
                
                if player_data and player_data.get("gameObservations"):
                    for game_id, game_data in player_data["gameObservations"].items():
                        if game_data.get("data") and game_data.get("data").get("scores"):
                            game_df = pd.DataFrame(game_data["data"]["scores"])
                            game_df["playerId"] = player_id
                            game_df["playerName"] = f"{player_data['firstName']} {player_data['lastName']}"
                            game_df["position"] = player_data["position"]
                            game_df["age"] = player_data["age"]
                            game_df["gameId"] = game_id
                            game_df["createdAt"] = game_data["createdAt"]
                            
                            all_observations.append(game_df)
                            
            except Exception as e:
                continue
                
        if all_observations:
            organization_dict["gameObservations"] = pd.concat(all_observations, ignore_index=True)
            
        return organization_dict
            
    except Exception as e:
        raise

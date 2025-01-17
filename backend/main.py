import os

import pandas as pd
from dotenv import load_dotenv
from games.arrow_game import analyse_arrow_game
from lib.api import get_player_observations, get_organization_observations
from lib.db import DB

ARROW_GAME_ID = "67543176ab5e87f35d194611"


def test_arrow_game(scores_data):
    df = pd.DataFrame(scores_data)

    categorical_columns = ["primerDir", "topFlankerDir", "bottomFlankerDir"]
    for col in categorical_columns:
        df[col] = df[col].astype("category")

    print("\nArrow Game Analysis Results:")
    print(analyse_arrow_game(df))


def test_player_observations():
    try:
        player_id = "677eab6ba71bdcc0d97662f0"  # here change player id to the player you want to test with
        print(f"\nFetching observations for player ID: {player_id}")

        player_df = get_player_observations(player_id)

        if not player_df == None:
            print("\nPlayer Details:")
            print(f"Name: {player_df['firstName']} {player_df['lastName']}")
            print(f"Position: {player_df['position']}")
            print(f"Age: {player_df['age']}")
            print(f"Organization ID: {player_df['organizationId']}")

            game_obs = player_df["gameObservations"]
            print(f"\nGame Observations ({len(game_obs)} total):")

            if game_obs:
                for game_id, game_data in game_obs.items():
                    print(f"\nGame ID: {game_id}")
                    print(f"Created At: {game_data['createdAt']}")
                    print(f"Scores: {len(game_data['scores'])} entries")
                    print(f"Reaction Times: {len(game_data['reactionTimes'])} entries")

                    if (
                        game_id == ARROW_GAME_ID
                    ):  # checks if its an arrow game to test with the analyze_arrow_game function
                        print("\nFound Arrow Game data! Running analysis...")
                        if "data" in game_data and "scores" in game_data["data"]:
                            test_arrow_game(game_data["data"]["scores"])
                        else:
                            print("Arrow game data format not as expected")

                    if game_data["data"]:
                        print(game_data["data"])
            else:
                print("No game observations found")

    except Exception as e:
        print(f"Error testing player observations: {str(e)}")
        raise

def test_organization_observations():
    try:
        organization_id = "6765254294b4101df01adc7a"  # here change organisation id to organization you want to test with
        print(f"\nFetching observations for organization ID: {organization_id}")

        org_data = get_organization_observations(organization_id)
        
        print("\nOrganization Details:")
        print(f"Organization ID: {org_data['organizationId']}")
        print(f"Name: {org_data['name']}")
        print(f"Number of Players: {org_data['numberOfPlayers']}")
        
        df = org_data['gameObservations']
        if not df.empty:
            player_games = df.groupby(['playerName', 'gameId', 'position', 'age', 'createdAt']).size().reset_index()
            
            print("\nPlayer Game Summary:")
            for _, row in player_games.iterrows():
                print(f"\nPlayer: {row['playerName']}")
                print(f"Game ID: {row['gameId']}")
                if row['gameId'] == ARROW_GAME_ID:
                    print("\nFound Arrow Game data! Running analysis...")
                    game_data = df[df['gameId'] == ARROW_GAME_ID].copy()
                    if 'accuracy' in game_data.columns:
                        game_data['accuracy'] = pd.to_numeric(game_data['accuracy'], errors='coerce')
                    if 'reactionTime' in game_data.columns:
                        game_data['reactionTime'] = pd.to_numeric(game_data['reactionTime'], errors='coerce')
                    categorical_columns = ['primerDir', 'topFlankerDir', 'bottomFlankerDir']
                    for col in categorical_columns:
                        if col in game_data.columns:
                            game_data[col] = game_data[col].astype('category')
                    scores_list = game_data.to_dict('records')
                    if scores_list:
                        test_arrow_game(scores_list)
                    else:
                        print("No valid scores data found for arrow game analysis")
        else:
            print("No game observations found")

    except Exception as e:
        print(f"Error testing organization observations: {str(e)}")
        raise


if __name__ == "__main__":
    load_dotenv(".env")
    db = DB(os.getenv("DOCUMENT_URI"))
    test_organization_observations()


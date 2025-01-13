import pandas as pd
from analysis.analysis import create_analysis
from analysis.pipeline import create_pipeline
from analysis.stage import FormatData, Stage, SummaryStatistics

"""
    accuracy, reactionTime, primerDir, topFlankerDir, bottomFlankerDir
    true    , 424         , right    , left         , left
"""


def analyse_arrow_game(data: pd.DataFrame):
    """
    Takes in arrow game observations (arrow_game_obs) and produces the analysis
    for it.

    :param arrow_game_obs: Pandas data frame with the following strucutre:
                        accuracy, reactionTime, topFlankerDir, bottomFlankerDir
    """

    descriptive_analysis = (
        create_pipeline().add_stage(FormatData).add_stage(SummaryStatistics)
    )
    analysis = create_analysis().add_pipeline(descriptive_analysis)

    """
        Todo:
        Descriptive analysis:
        - Descriptive analysis of accuracy (accuracy rate)
        - Distribution analysis
        - Response time by condition

        Congruency analysis:
        - Accuracy vs consistency between primer andeach flank
        - Reaction time vs consistency between primer and each flank

        Consistency analysis:
        - Variability in reaction times
        - Variability in accuracy times

        Correlations:
        - Reaction times vs accuracy

        Learning rate:
        - Accuracy over time
        - Reaction time over time
        
    """

    return analysis.run(data)["summary"]

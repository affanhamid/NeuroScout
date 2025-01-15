import pandas as pd
from analysis.analysis import create_analysis
from analysis.pipeline import create_pipeline
from analysis.stages import (
    BooleanSummary,
    CategoricalSummary,
    ClassifyColumns,
    Correlation,
    FormatData,
    NumericalSummary,
)

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

    """
        Todo:
        Descriptive analysis:
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

    descriptive_analysis = (
        create_pipeline()
        .add_stage(ClassifyColumns)
        .add_stage(NumericalSummary)
        .add_stage(BooleanSummary)
        .add_stage(CategoricalSummary)
    )

    distribution_analysis = create_pipeline()
    intervariable_analysis = create_pipeline().add_stage(Correlation)

    analysis = (
        create_analysis()
        .add_preprocessor(FormatData)
        .add_pipeline(descriptive_analysis)
        .add_pipeline(distribution_analysis)
        .add_pipeline(intervariable_analysis)
    )

    return analysis.run(data)

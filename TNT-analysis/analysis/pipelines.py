from analysis.pipeline import create_pipeline
from analysis.stages import (
    BooleanSummary,
    CategoricalSummary,
    ClassifyColumns,
    NumericalSummary,
)


def descriptive_pipeline():
    return (
        create_pipeline()
        .add_stage(ClassifyColumns)
        .add_stage(NumericalSummary)
        .add_stage(BooleanSummary)
        .add_stage(CategoricalSummary)
    )

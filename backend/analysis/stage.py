from typing import Any

import pandas as pd

"""
This module defines a stage. A stage is a single point of analysis that takes
in data and produces data
"""


class Stage:
    """
    This is a stage class
    """

    @classmethod
    def run(cls, data: dict[str, Any]) -> dict[str, Any]:
        """
        Runs the stage
        """
        return data


class SummaryStatistics(Stage):
    """
    This stage creates the summary statistics for a given data
    """

    @classmethod
    def run(cls, data: dict[str, Any]) -> dict[str, Any]:

        data["summary"]["numerical_cols"] = data["data"].describe()
        return data


class ClassifyColumns(Stage):
    """
    This stage creates the summary statistics for a given data
    """

    @classmethod
    def run(cls, data: dict[str, Any]) -> dict[str, Any]:

        numerical_cols = data["data"].select_dtypes(include=["number"]).columns
        boolean_cols = data["data"].select_dtypes(include=["bool"]).columns
        categorical_cols = data["data"].select_dtypes(include=["category"]).columns
        data["columns"] = {
            "numerical": numerical_cols,
            "boolean": boolean_cols,
            "category": categorical_cols,
        }
        return data


class FormatData(Stage):
    """
    This stage formats a pd.DataFrame into a dict containing that data frame
    """

    @classmethod
    def run(cls, data: pd.DataFrame) -> dict[str, Any]:
        return {
            "data": data,
            "columns": {
                "numerical": [],
                "boolean": [],
                "categorical": [],
            },
            "summary": {
                "numerical_cols": {},
                "boolean_cols": {},
                "categorical_cols": {},
            },
        }

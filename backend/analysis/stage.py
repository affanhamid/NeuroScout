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


class NumericalSummary(Stage):
    """
    This stage creates the summary statistics for the numerical columns of the given data
    """

    @classmethod
    def run(cls, data: dict[str, Any]) -> dict[str, Any]:
        columns = data["columns"]

        data["summary"]["numerical"] = data["data"][columns["numerical"]].describe()
        return data


class BooleanSummary(Stage):
    """
    This stage creates the summary statistics for the boolean columns of the given data
    """

    @classmethod
    def run(cls, data: dict[str, Any]) -> dict[str, Any]:
        summary = {}
        boolean_columns = data["columns"]["boolean"]

        for col in boolean_columns:
            summary[col] = {
                "mean": data["data"][col].mean(),
                "std": data["data"][col].std(),
            }

        data["summary"]["boolean"] = pd.DataFrame(summary)
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
            "categorical": categorical_cols,
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
                "numerical": {},
                "boolean": {},
                "categorical": {},
            },
        }

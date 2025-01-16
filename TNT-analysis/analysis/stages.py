from typing import Any

import numpy as np
import pandas as pd
from analysis.stage import Stage


class Correlation(Stage):
    """
    This method finds all correlations in the dataframe
    """

    @classmethod
    def run(cls, data: dict[str, Any]) -> dict[str, Any]:
        columns = data["columns"]

        data["intervariable"]["correlation"] = data["data"][columns["numerical"]].corr()
        return data


class NumericalSummary(Stage):
    """
    This stage creates the summary statistics for the numerical columns of the
    given data
    """

    @classmethod
    def run(cls, data: dict[str, Any]) -> dict[str, Any]:
        columns = data["columns"]

        data["summary"]["numerical"] = data["data"][columns["numerical"]].describe()
        return data


class BooleanSummary(Stage):
    """
    This stage creates the summary statistics for the boolean columns of the
    given data
    """

    @classmethod
    def run(cls, data: dict[str, Any]) -> dict[str, Any]:
        boolean_columns = data["columns"]["boolean"]

        data["summary"]["boolean"] = data["data"][boolean_columns].agg(["mean", "std"])
        return data


class CategoricalSummary(Stage):
    """
    This stage creates the summary statistics for the categorical columns of
    the given data
    """

    @classmethod
    def run(cls, data: dict[str, Any]) -> dict[str, Any]:
        categorical_cols = data["columns"]["categorical"]

        data["summary"]["categorical"] = data["data"][categorical_cols].apply(
            pd.Series.value_counts, normalize=True
        )
        return data


class ClassifyColumns(Stage):
    """
    This method classifies the columns of a df into numerical, boolean,
    and categorical
    A boolean column is a categorical column with just two possible values
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
            "intervariable": {
                "correlation": {},
            },
        }

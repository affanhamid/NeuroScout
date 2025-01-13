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

        data["summary"] = data["data"].describe()
        return data


class FormatData(Stage):
    """
    This stage formats a pd.DataFrame into a dict containing that data frame
    """

    @classmethod
    def run(cls, data: pd.DataFrame) -> dict[str, Any]:
        return {"data": data}

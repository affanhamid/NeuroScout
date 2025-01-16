from typing import Any

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

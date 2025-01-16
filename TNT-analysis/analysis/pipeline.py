"""
This module defines a pipeline class
"""

from typing import Any

from analysis.stage import Stage


class Pipeline:
    """
    This is a pipeline class. A pipeline is an ordered list of stages that run
    after each other
    """

    def __init__(self):
        self.stages = []

    def add_stage(self, stage: Stage):
        self.stages.append(stage)
        return self

    def run(self, data: dict[str, Any]):
        for s in self.stages:
            data = s.run(data)
        return data


def create_pipeline(*args, **kwargs):
    return Pipeline(*args, **kwargs)

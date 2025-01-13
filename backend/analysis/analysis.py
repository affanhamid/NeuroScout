"""
This module contains an analysis class to join together different
pipelines and produce a single result
"""

from typing import Any

from analysis.pipeline import Pipeline


class Analysis:
    """
    This is an analysis class
    """

    def __init__(self):
        self.pipelines = []

    def add_pipeline(self, pipeline: Pipeline):
        self.pipelines.append(pipeline)
        return self

    def run(self, data: dict[str, Any]):
        for p in self.pipelines:
            data = p.run(data)
        return data


def create_analysis(*args, **kwargs):
    return Analysis(*args, **kwargs)

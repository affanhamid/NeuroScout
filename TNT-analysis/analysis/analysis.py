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
        self.preprocessor = None

    def add_pipeline(self, pipeline: Pipeline):
        self.pipelines.append(pipeline)
        return self

    def add_preprocessor(self, preprocessor: Pipeline):
        self.preprocessor = preprocessor
        return self

    def run(self, data: dict[str, Any]):
        res = self.preprocessor.run(data)
        for p in self.pipelines:
            res = p.run(res)
        return res


def create_analysis(*args, **kwargs):
    return Analysis(*args, **kwargs)

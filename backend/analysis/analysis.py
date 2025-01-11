"""
This module contains an analysis class to join together different
pipelines and produce a single result
"""

from pipeline import Pipeline


class Analysis:
    """
    This is an analysis class
    """

    def __init__(self):
        self.pipelines = []

    def add_pipeline(self, pipeline: Pipeline):
        self.pipelines.append(pipeline)

"""
This module defines a pipeline class
"""

from stage import Stage


class Pipeline:
    """
    This is a pipeline class. A pipeline is an ordered list of stages that run
    after each other
    """

    def __init__(self):
        self.stages = []

    def add_stage(self, stage: Stage):
        self.stages.append(stage)

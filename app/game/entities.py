from __future__ import annotations
import dataclasses
from typing import List


@dataclasses.dataclass
class Point:
    x: int = 0
    y: int = 0


@dataclasses.dataclass
class Rect:
    left_top: Point = Point()
    right_bottom: Point = Point()


@dataclasses.dataclass
class Sides:
    top: bool = False
    bottom: bool = False
    right: bool = False
    left: bool = False

    @property
    def count(self) -> int:
        return self.top + self.bottom + self.right + self.left


@dataclasses.dataclass
class Board:
    height: int
    width: int
    matrix: List[List[int]]

    def __init__(self, height: int, width: int):
        self.height = height
        self.width = width
        self.matrix = [[0 for _ in range(width)] for _ in range(height)]
        for x in range(width):
            self.matrix[0][x] = 3
            self.matrix[height - 1][x] = 3
        for y in range(height):
            self.matrix[y][0] = 3
            self.matrix[y][width - 1] = 3

    def is_valid_cords(self, x: int, y: int) -> bool:
        return 0 <= y < self.height and 0 <= x < self.width

    def is_valid_rect(self, rect: Rect) -> bool:
        sides = Sides()
        for x in range(rect.left_top.x, rect.right_bottom.x + 1):
            for y in range(rect.left_top.y, rect.right_bottom.y + 1):
                if self.matrix[y][x] != 0:
                    return False
        left_x = rect.left_top.x - 1
        right_x = rect.right_bottom.x + 1
        # verticals
        for y in range(rect.left_top.y, rect.right_bottom.y + 1):
            if self.is_valid_cords(left_x, y) and self.matrix[y][left_x] != 0:
                sides.left = True
            if self.is_valid_cords(right_x, y) and self.matrix[y][right_x] != 0:
                sides.right = True
        top_y = rect.left_top.y - 1
        bottom_y = rect.right_bottom.y + 1
        # horizontals
        for x in range(rect.left_top.x, rect.right_bottom.x + 1):
            if self.is_valid_cords(x, top_y) and self.matrix[top_y][x] != 0:
                sides.top = True
            if self.is_valid_cords(x, bottom_y) and self.matrix[bottom_y][x] != 0:
                sides.bottom = True
        return sides.count >= 2

    def insert(self, player_value: int, rect: Rect):
        if not self.is_valid_rect(rect):
            raise ValueError
        for x in range(rect.left_top.x, rect.right_bottom.x + 1):
            for y in range(rect.left_top.y, rect.right_bottom.y + 1):
                self.matrix[y][x] = player_value

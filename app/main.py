from __future__ import annotations

import dataclasses
from typing import List, Dict

from fastapi import FastAPI, WebSocket, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import random
import json

from game.entities import Board, Rect

app = FastAPI()
app.mount(
    "/static",
    StaticFiles(directory=Path(__file__).parent.parent.absolute() / "static"),
    name="static",
)

templates = Jinja2Templates(directory="../templates")
sessions: Dict[int, GameSession] = dict()


@app.get("/")
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


def roll_dice():
    return random.randint(1, 7)


def random_coord(max_value: int):
    return random.randint(0, max_value)


@app.post("/create_session?id={session_id}&height={height}&width={width}")
async def create_session(session_id: int, height: int, width: int):
    global sessions
    game_session: GameSession = GameSession(
        session_id=session_id,
        board_width=width,
        board_height=height,
    )
    sessions[session_id] = game_session
    print(f"Created session(id={session_id})")


@app.websocket("/join_session?id={session_id}&username={username}")
async def join_session(player_socket: WebSocket, session_id: int, username: str):
    session = sessions.get(session_id)
    if session is None:
        await player_socket.send_text("Not valid session id")
        return
    player = Player(player_socket, username)
    await session.connect_player(player)
    await handle_game_events(player, session)


async def handle_game_events(player: Player, game: GameSession):
    while True:
        received_json = await player.socket.receive_json()
        response_data = json.loads(received_json)
        event = response_data["event"]
        if event["type"] == "game_started":
            pass
        elif event["type"] == "rectangle":
            pass


@dataclasses.dataclass
class Player:
    socket: WebSocket
    username: str


class GameSession:
    def __init__(
            self,
            session_id: int,
            board_height: int,
            board_width: int):
        self.session_id = session_id
        self.players: List[Player] = []
        self.board: Board = Board(height=board_height, width=board_width)
        self.is_first_player = True

    async def connect_player(self, player: Player):
        if len(self.players) == 2:
            await player.socket.send_text("Session has 2 players already")
            await player.socket.close()
            return
        self.players.append(player)
        await player.socket.accept()
        if len(self.players) == 2:
            await self.start_a_game()

    async def start_a_game(self):
        player_1, player_2 = self.players[0], self.players[1]
        for player in self.players:
            await player.socket.send_json({
                "event": {
                    "type": "game_started",
                    "player_1": player_1.username,
                    "player_2": player_2.username
                }
            })

    async def game_step(self, rectangle: Rect):
        self.board.insert(player_value=1 if self.is_first_player else 2, rect=rectangle)
        self.is_first_player = not self.is_first_player

        for player in self.players:
            await player.socket.send_json(rectangle.__dict__)

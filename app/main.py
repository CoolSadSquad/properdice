from fastapi import FastAPI, WebSocket, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import uvicorn
from pathlib import Path

app = FastAPI()

templates = Jinja2Templates(directory="../templates")
app.mount(
    "/static",
    StaticFiles(directory=Path(__file__).parent.parent.absolute() / "static"),
    name="static",
)


@app.get("/")
async def root(request: Request):
    return templates.TemplateResponse(
        "index.html", {"request": request}
    )


# @app.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket):
#     await websocket.accept()
#     while True:
#         data = await websocket.receive_text()
#         await websocket.send_text(f"Message text was: {data}")

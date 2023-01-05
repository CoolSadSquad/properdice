function addNewRect(height, width) {
    return new Rectangle(height, width, startX, startY, "first", id)
}

class Rectangle {
    constructor(height, width, coordX, coordY, player, id) {
        this.height = height;
        this.width = width;
        this.coordX = coordX;
        this.coordY = coordY;
        this.player = player;
        this.id = id;
    }
}

let bufferRectangle = []
let id = 0;
let height = 0;
let width = 0;
let startX = 0;
let startY = 0;

function initRect(data) {
    let height = data["height"], width = data["width"], startX = data["start_x"], startY = data["start_y"],
        id = data["rect_id"];
    let newRectangle = addNewRect(height, width, startX, startY, id);
    pole.fillStyle = "lightgrey";
    pole.fillRect(startX * 30, startY * 30, newRectangle.width * 30, newRectangle.height * 30);
    pole.clearRect(startX * 30 + 1, startY * 30 + 1, newRectangle.width * 30 - 2, newRectangle.height * 30 - 2);
    app.height = height;
    app.width = width;
}

function removeRect() {
    pole.fillStyle = "#2B2B2B"
    pole.clearRect(
        bufferRectangle[id - 1].coordX * 30,
        bufferRectangle[id - 1].coordY * 30,
        bufferRectangle[id - 1].width * 30,
        bufferRectangle[id - 1].height * 30
    )
    bufferRectangle.pop();
    id--;
}

let app = new Vue({
    el: '#app',
    data: {
        height: '123',
        width: '123',
    }
})

let canvas = document.getElementById("canvas");
let pole = canvas.getContext("2d");
let client_id = Date.now()
let ws = new WebSocket(`ws://89.232.192.92:25565/ws/${client_id}`);
ws.onmessage = function (event) {
    let messages = document.getElementById('messages')
    let message = document.createElement('li')
    let content = document.createTextNode(event.data)
    message.appendChild(content)
    messages.appendChild(message)
    console.log(typeof (event.data))
    initRect(JSON.parse(event.data))
};

function sendMessage(event, msg) {
    ws.send(msg)
    event.preventDefault()
}

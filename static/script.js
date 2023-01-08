function addNewRect(height, width){
     return new Rectangle(height, width, startX, startY, "first", id)
}
function rollDice(){
    return Math.floor(Math.random() * 6)+1;
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
function randomCoordsX(){
    return Math.floor(Math.random() * 40);
}
function randomCoordsY(){
  return Math.floor(Math.random() * 30);
}
let bufferRectangle = []
let id = 0
function createNewPole(){
   newheight = rollDice();
  newwidth = rollDice();
  startX = randomCoordsX();
  startY = randomCoordsY();
  let newRectangle = addNewRect(newheight, newwidth, startX, startY, id);
  bufferRectangle.push(newRectangle)
  pole.fillStyle = "lightgrey";
  pole.fillRect(startX*30, startY*30, newRectangle.width*30, newRectangle.height*30);
  pole.clearRect(startX*30+1, startY*30+1, newRectangle.width*30-2, newRectangle.height*30-2);
  app.height = newheight;
  app.width = newwidth;
  id++;
}
let app = new Vue({
    el: '#app',
    data:{
      height: '',
      width: ''
    }
  })
function removePole(){
  pole.fillStyle = "#2B2B2B"
  pole.clearRect(bufferRectangle[id-1].coordX*30, bufferRectangle[id-1].coordY*30, bufferRectangle[id-1].width*30, bufferRectangle[id-1].height*30)
  bufferRectangle.pop()
  id--
}
let canvas = document.getElementById("canvas");
let pole = canvas.getContext("2d");
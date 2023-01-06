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
    return Math.floor(Math.random() * 30);
}
function randomCoordsY(){
  return Math.floor(Math.random() * 20);
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
  pole.strokeStyle = "lightgrey";
  pole.strokeRect(startX*40, startY*40, newRectangle.width*40, newRectangle.height*40);
  app.height = newheight;
  app.width = newwidth
  id++
}
let app = new Vue({
    el: '#app',
    data:{
      height: '',
      width: ''
    }
  })
function removePole(){
  pole.strokeStyle = "#2B2B2B"
  pole.strokeRect(bufferRectangle[id-1].coordX*40, bufferRectangle[id-1].coordY*40, bufferRectangle[id-1].width*40, bufferRectangle[id-1].height*40)
  bufferRectangle.pop()
  id--
}
const canvas = document.getElementById("canvas");
const pole = canvas.getContext("2d");
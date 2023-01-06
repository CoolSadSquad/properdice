function addNewRect(height, width){
     return new Rectangle(height, width, "0,0", "first", 0)
}
function rollDice(){
    return Math.floor(Math.random() * 6)+1;
}
class Rectangle {
  constructor(height, width, coords, player, id) {
    this.height = height;
    this.width = width;
    this.coords = coords;
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
function createNewPole(){
  newheight = rollDice();
  newwidth = rollDice();
  let newRectangle = addNewRect(newheight, newwidth);
  pole.strokeStyle = "lightgrey";
  pole.strokeRect(randomCoordsX()*40, randomCoordsY()*40, newRectangle.height*40, newRectangle.width*40);
  app.height = newheight;
  app.width = newwidth
}
let app = new Vue({
    el: '#app',
    data:{
      height: '',
      width: ''
    }
  })
const canvas = document.getElementById("canvas");
const pole = canvas.getContext("2d");
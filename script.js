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
function createNewPole(){
  newheight = rollDice();
  newwidth = rollDice();
  let newRectangle = addNewRect(newheight, newwidth);
  xCoord = prompt('Введите значение X = ',['']);
  while (xCoord>=60){
    xCoord = prompt('Вы ввели неправильное значение X. Введите новое значение = ', [''])
  }
  yCoord = prompt('Введите значение Y = ',['']);
  pole.strokeStyle = "lightgrey";
  pole.strokeRect(xCoord*20, yCoord*20, newRectangle.height*20, newRectangle.width*20);
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
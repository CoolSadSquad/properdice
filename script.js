function rollDice() {
    return Math.floor(Math.random() * 6)+1;
  }
function addNewRect(){
     return new Rectangle(firstnum, secondnum, "0,0", "first", 0)
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
let firstnum = rollDice();
let secondnum = rollDice();
let multiplication = firstnum*secondnum
let app = new Vue({
    el: '#app',
    data:{
        firstnum: firstnum,
        secondnum: secondnum,
        multiplication: multiplication
    }
})
const canvas = document.getElementById("canvas");
const pole = canvas.getContext("2d");
function createNewPole(){
  let firstnum = rollDice();
  let secondnum = rollDice ();
  let newRectangle = addNewRect();
  pole.strokeStyle = "blue";
  pole.strokeRect(10, 10, newRectangle.height*20, newRectangle.width*20);
}
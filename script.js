function getRandomInt() {
    return Math.floor(Math.random() * 6)+1;
  }
function addNewRect(){
     return new Rectangle(firstnum, secondnum, "0,0", "first", 0)
}
function rollDice(){
    return randnum = getRandomInt()
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
const multiplication = firstnum*secondnum
const app = new Vue({
    el: '#app',
    data:{
        firstnum: firstnum,
        secondnum: secondnum,
        multiplication: multiplication
    }
})
const canvas = document.getElementById("canvas");
const pole = canvas.getContext("2d");
pole.strokeStyle = "blue";
firstRectangle = addNewRect();
pole.strokeRect(10, 10, firstRectangle.height*20, firstRectangle.width*20);
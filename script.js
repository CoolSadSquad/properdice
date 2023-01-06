function getRandomInt() {
    return Math.floor(Math.random() * 6)+1;
  }
function addNewRect(){
     return new Rectangle(firstnumb, secondnumb, "0,0", "first", 0)
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

let firstnumb = rollDice();
let secondnumb = rollDice();
// let firstnum = rollDice();
// let secondnum = rollDice();
// const multiplication = firstnum*secondnum
// const app = new Vue({
//     el: '#app',
//     data:{
//         firstnum: firstnum,
//         secondnum: secondnum,
//         multiplication: multiplication
//     }
// })
function createNewPole(){
  firstnumb = rollDice();
  secondnumb = rollDice();
  let newRectangle = addNewRect(firstnumb,secondnumb);
  let multiplicationb = firstnumb*secondnumb;
  pole.strokeStyle = "blue";
  pole.strokeRect(10, 10, newRectangle.height*20, newRectangle.width*20);
  app = new Vue({
    el: '#app',
    data:{
      firstnum: firstnumb,
      secondnum: secondnumb,
      multiplication: multiplicationb
    }
  })
}
const canvas = document.getElementById("canvas");
const pole = canvas.getContext("2d");
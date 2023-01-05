function getRandomInt() {
    return Math.floor(Math.random() * 6)+1;
  }
const firstnum = getRandomInt()
const secondnum = getRandomInt()
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

pole.strokeStyle = "blue"
pole.strokeRect(10, 10, firstnum*20, secondnum*20);
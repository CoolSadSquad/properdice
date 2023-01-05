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
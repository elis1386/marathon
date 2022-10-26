const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeLeft = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#fbf8cc', '#fde4cf', '#ffcfd2','#f1c0e8','#cfbaf0','#a3c4f3','#90dbf4','#8eecf5','#98f5e1','#b9fbc0']

let time = 0
let score = 0

startBtn.addEventListener('click', e => {
  e.preventDefault()
  screens[0].classList.add('up')
})
timeList.addEventListener('click', e => {
  if (e.target.classList.contains('time-btn')) {
    time = parseInt(e.target.getAttribute('data-time'))
    screens[1].classList.add('up')
    startGame()
  }
})
board.addEventListener('click', e => {
  if (e.target.classList.contains('circle')) {
    score++
    e.target.remove()
    createRandomeCircle()
  }
})

function startGame() {
  setInterval(decreaseTime, 1000)
  createRandomeCircle()
  setTime(time)
}
function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let currentTime = --time
    if (currentTime < 10) {
      currentTime = `0${currentTime}`
    }
    setTime(currentTime)
  }

}
function setTime(value) {
  timeLeft.innerHTML = ` 00:${value}`
}

function finishGame() {
  timeLeft.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Game score: <span class="primary">${score}</span> </h1>`
}

function createRandomeCircle() {
  const circle = document.createElement('div')
  const size = getRandomNumber(10, 60)
  const { width, height } = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)
  const circleColor = setColor(circle)

  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`

  board.append(circle)
}
function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}
function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length)
  return colors[index]
}
function setColor(circle) {
  const color = getRandomColor()
  circle.style.backgroundColor = color
}

import "./style.css"
import { game } from "./utils/game"
import { createStartButton } from "./utils/layout"
import {
  boardStyle,
  clearBoard,
  fillCells,
  generate2DArray,
  render,
  renderScore,
} from "./utils/tools"
let boardSize = 4
let cells = generate2DArray(boardSize)

globalThis.globalScore = 0

let board = document.createElement("article")
boardStyle(board, boardSize)

const initials = document.createElement("article")
initials.className = "initials"
const messageBoard = document.createElement("article")
const button = createStartButton({
  plate: initials,
  board,
  cells,
  messageBoard,
})
const a = document.createElement("div")
const container = document.createElement("article")
const title = document.createElement("p")
const target = boardSize * 512
cells = fillCells(cells, true)(boardSize / 2)
const buttonA = button(4, "Play: 4x4")
a.appendChild(buttonA)

const btn6x6 = button(8, "Play: 8x8")
const buttonB = button(6, "Play: 6x6")
a.className += "start-buttons-area"
const b = document.createElement("div")
b.appendChild(buttonB)
b.className += "start-buttons-area"
const c = document.createElement("div")
c.className += "start-buttons-area"
c.appendChild(btn6x6)
const d = document.createElement("div")
d.className += "start-buttons-area"
const buttonD = document.createElement("button")
buttonD.innerHTML = "Rules"
d.appendChild(buttonD)
initials.appendChild(a)
initials.appendChild(b)
initials.appendChild(c)
initials.appendChild(d)
board.appendChild(initials)

title.innerHTML = `Game ${target}`
board.className += "board"
container.className += "container"
messageBoard.className += "messageBoard"

container.appendChild(title)
document.body.appendChild(container)
container.appendChild(messageBoard)
renderScore(messageBoard)
container.appendChild(board)
render({ board, cells })

import "./style.css"
import { game } from "./utils/game"
import {
  boardStyle,
  fillCells,
  generate2DArray,
  render,
  renderScore,
} from "./utils/tools"
const boardSize = 4
let cells = generate2DArray(boardSize)

let state: "playing" | "idle" | "finished" = "playing"
globalThis.globalScore = 0
cells = fillCells(cells, true)(boardSize / 2)
const target = boardSize * 512

const board = document.createElement("article")
boardStyle(board, boardSize)
const initials = document.createElement("article")
initials.className = "initials"
const a = document.createElement("div")
a.innerHTML = "hello"
a.className += "foo"
const b = document.createElement("div")
b.innerHTML = "hello"
b.className += "foo"
const c = document.createElement("div")
c.innerHTML = "hello"
c.className += "foo"
const d = document.createElement("div")
d.innerHTML = "hello"
d.className += "foo"
initials.appendChild(a)
initials.appendChild(b)
initials.appendChild(c)
initials.appendChild(d)
board.appendChild(initials)
const messageBoard = document.createElement("article")
const container = document.createElement("article")
const title = document.createElement("p")

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
game({ board, cells, state, messageBoard })

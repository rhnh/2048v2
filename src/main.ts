import "./style.css"
import { game } from "./utils/game"
import {
  boardStyle,
  fillCells,
  generate2DArray,
  render,
  renderScore,
} from "./utils/tools"
//** main */
const boardSize = 4
let cells = generate2DArray(boardSize)

let state: "playing" | "idle" | "finished" = "idle"
globalThis.globalScore = 0
cells = fillCells(cells, true)(boardSize / 2)
//4 * 512 = 2048
const target = boardSize * 512

const arena = document.createElement("article")
const board = document.createElement("article")
boardStyle(board, boardSize)

const messageBoard = document.createElement("article")
const container = document.createElement("article")
const title = document.createElement("p")

title.innerHTML = "Game 2048"
board.className += "board"
arena.className += "arena"
container.className += "container"
messageBoard.className += "messageBoard"

container.appendChild(title)
document.body.appendChild(container)
container.appendChild(messageBoard)
container.appendChild(arena)

renderScore(messageBoard)

render({ board, cells, arena })
game({ arena, board, cells, state, messageBoard })

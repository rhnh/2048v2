import "./style.css"
import { game } from "./utils/game"
import {
  clearBoard,
  fillOneCell,
  generate2DArray,
  print,
  render,
  renderScore,
} from "./utils/tools"
//** main */
let cells = generate2DArray(4)

let state: "playing" | "idle" | "finished" = "idle"
globalThis.globalScore = 0
cells = fillOneCell(cells, true)
cells = fillOneCell(cells, true)
const arena = document.createElement("article")
const board = document.createElement("article")
const messageBoard = document.createElement("article")
const container = document.createElement("article")
board.className += "board"
arena.className += "arena"
container.className += "container"
messageBoard.className += "messageBoard"

document.body.appendChild(container)
container.appendChild(messageBoard)
container.appendChild(arena)

renderScore(messageBoard)

render({ board, cells, arena })
game({ arena, board, cells, state, messageBoard })

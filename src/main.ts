import "./style.css"
import { game } from "./utils/game"
import {
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
print(cells)
const container = document.createElement("article")
const board = document.createElement("article")
renderScore(container)
container.className = "container"
board.className = "board"

render(board, cells, container)
game(container, board, cells, state)

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
const arena = document.createElement("article")
const board = document.createElement("article")
renderScore(arena)
arena.className = "arena"
board.className = "board"

render(board, cells, arena)
game(arena, board, cells, state)

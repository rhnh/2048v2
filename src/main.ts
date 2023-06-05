import "./style.css"
import { game } from "./utils/game"
import { fillOneCell, print, render } from "./utils/tools"
//** main */
let cells = [
  [40, 30, 430, 230],
  [10, 343, 240, 234],
  [40, 3, 3, 40],
  [30, 20, 30, 2340],
]

let state: "playing" | "idle" | "finished" = "idle"
cells = fillOneCell(cells, true)
cells = fillOneCell(cells, true)
print(cells)
const container = document.createElement("article")
const board = document.createElement("article")
container.className = "container"
board.className = "board"

render(board, cells, container)
game(container, board, cells, state)

import "./style.css"
import { game } from "./utils/game"
import { fillOneCell, generate2DArray, print, render } from "./utils/tools"
//** main */
let cells = generate2DArray(4)

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

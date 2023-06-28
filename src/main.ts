import { drawCells, renderBoard } from "./render"
import "./style.css"
import { fillCells, generate2DArray } from "./utils"
let cells = generate2DArray(4)
cells = fillCells(cells, true)(2)

const board = document.createElement("article")
board.className = "board"
drawCells(cells, board)
renderBoard({ cells, board })
document.body.appendChild(board)

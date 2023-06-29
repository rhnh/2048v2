import { moveDown, moveLeft, moveRight, moveUp } from "./move"
import { drawCells, drawCellsOnMove, renderBoard } from "./render"
import "./style.css"
import {
  fillCells,
  fillOneCell,
  generate2DArray,
  isEqual,
  print,
} from "./utils"
let cells = generate2DArray(4)
cells = fillCells(cells, true)(2)

const board = document.createElement("article")
board.className = "board"

drawCells(cells, board)
renderBoard({ cells, board })
document.body.appendChild(board)

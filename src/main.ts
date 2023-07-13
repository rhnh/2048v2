import { renderBoard } from "./board"
import { createElement } from "./tools"
import { fillCells, generate2DArray } from "./utils"
import { renderHeaders } from "./headers"
import "./style/index.css"
import { buttonBar, selectorBoard } from "./components"
let cells = generate2DArray(4)
cells = fillCells(cells, true)(2)
// cells = [
//   [16, 8, 2048, 1024],
//   [32, 32, 2, 4],
//   [512, 256, 512, 128],
//   [64, 32, 8, 4],
// ]
const board = createElement("article")("board")
board.className += " o5 "
renderBoard({ cells, board, state: "idle" })
selectorBoard(board, cells)
document.body.append(
  renderHeaders("2048", cells.length),
  board,
  buttonBar(board, cells),
)

import { renderBoard } from "./board"
import { createElement } from "./tools"
import { fillCells, generate2DArray } from "./utils"
import { renderHeaders } from "./headers"
import "./style/index.css"
import { buttonBar, startSelector } from "./components"
let cells = generate2DArray(4)
cells = fillCells(cells, true)(2)
const board = createElement("article")("board")
renderBoard({ cells, board, state: "idle" })
startSelector(board, cells)
document.body.append(
  renderHeaders("2048", cells.length),
  board,
  buttonBar(board, cells),
)

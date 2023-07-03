import { renderCells, initialRenderBoard } from "./board"
import { createElement } from "./tools"
import { fillCells, generate2DArray } from "./utils"
import { renderHeaders } from "./headers"
import "./style/index.css"
import { controlBar } from "./controls"
let cells = generate2DArray(4)
cells = fillCells(cells, true)(2)

const board = createElement("article")("board")
initialRenderBoard({ cells, board })
renderCells(board, cells)
document.body.append(
  renderHeaders("2048", cells.length),
  board,
  controlBar(board),
)

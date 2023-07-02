import { renderScore } from "./headers"
import { keyPressedMovements, mobileTouchOption } from "./keyboard"
import { getWidth } from "./mq"
import { clearBoard, fillOneCell, isEqual } from "./utils"

export function renderCells(board: HTMLElement, cells: number[][]) {
  clearBoard(board)
  cells.map((x) => {
    x.map((cellValue: number) => {
      const cell = document.createElement("span")
      cell.className += "filled"
      cell.innerText = cellValue === 0 ? "" : `${cellValue}`
      if (cellValue === 0) {
        cell.className += " zero"
      }

      cell.className += " cells"
      board.appendChild(cell)
    })
  })
}
//#########################################################
/**
 *
 * @param board
 * @param boardSize
 */
export const boardStyle = (board: HTMLElement, boardSize: number) => {
  board.style.display = "grid"
  board.style.position = "relative"
  const width = window.innerWidth > 0 ? window.innerWidth : screen.width
  const size = getWidth(boardSize, width)
  const gridStyle = size
  board.style.gridTemplateColumns = gridStyle
  board.style.gridTemplateRows = gridStyle
  board.style.gap = "2px"
}

//#########################################################

export function renderBoard({
  cells,
  board,
}: {
  board: HTMLElement
  cells: number[][]
}) {
  const draw = drawCellsOnMove({ cells, board })
  boardStyle(board, cells.length)
  keyPressedMovements(draw)
  mobileTouchOption(board, draw)
}
//#########################################################

export const drawCellsOnMove =
  ({ cells, board }: { board: HTMLElement; cells: number[][] }) =>
  (fn: (xs: number[][]) => number[][]) => {
    const movedCells = fn(cells)
    if (isEqual(movedCells, cells)) {
      renderCells(board, cells)
      return
    }
    cells = fillOneCell(movedCells)
    renderCells(board, cells)
    const score = document.querySelector(
      ".scoreboard__score",
    ) as unknown as HTMLSpanElement
    if (score) score.innerText = `${globalScore}`
  }

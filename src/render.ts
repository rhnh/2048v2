import { moveDown, moveLeft, moveRight, moveUp } from "./move"
import { clearBoard, fillOneCell, isEqual } from "./utils"

export function drawCells(cells: number[][], board: HTMLElement) {
  clearBoard(board)
  cells.map((x) => {
    x.map((cellValue: number) => {
      const cell = document.createElement("span")
      cell.className = "cell"
      cell.innerText = `${cellValue}`
      if (cellValue === 0) {
        cell.className = "zero"
      }
      board.appendChild(cell)
    })
  })
}
export function renderBoard({
  cells,
  board,
}: {
  board: HTMLElement
  cells: number[][]
}) {
  const draw = drawCellsOnMove({ cells, board })
  addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      draw(moveDown)
    }
    if (e.key === "ArrowUp") {
      draw(moveUp)
    }
    if (e.key === "ArrowLeft") {
      draw(moveLeft)
    }
    if (e.key === "ArrowRight") {
      draw(moveRight)
    }
  })
}
const drawCellsOnMove =
  ({ cells, board }: { board: HTMLElement; cells: number[][] }) =>
  (fn: (xs: number[][]) => number[][]) => {
    const movedCells = fn(cells)
    if (isEqual(movedCells, cells)) {
      drawCells(cells, board)
      return
    }
    cells = fillOneCell(movedCells)
    drawCells(cells, board)
  }

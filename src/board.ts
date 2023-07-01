import { moveDown, moveLeft, moveRight, moveUp } from "./move"
import { getWidth } from "./mq"
import { clearBoard, fillOneCell, isEqual } from "./utils"

export function drawCells(board: HTMLElement, cells: number[][]) {
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
export function renderBoard({
  cells,
  board,
}: {
  board: HTMLElement
  cells: number[][]
}) {
  const draw = drawCellsOnMove({ cells, board })
  boardStyle(board, cells.length)
  addEventListener("keydown", (e: KeyboardEvent) => {
    if (["ArrowDown", "s", "j"].indexOf(e.key) !== -1) draw(moveDown)
    if (["ArrowUp", "w", "k"].indexOf(e.key) !== -1) draw(moveUp)
    if (["ArrowLeft", "a", "h"].indexOf(e.key) !== -1) draw(moveLeft)
    if (["ArrowRight", "d", "l"].indexOf(e.key) !== -1) draw(moveRight)
    if (e.key === "r") window.location.reload()
  })
  const touches = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  }
  let direction: "up" | "down" | "right" | "left" | "none"
  board.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault()
      touches.x1 = e.touches[0].clientX
      touches.y1 = e.touches[0].clientY
    },
    { passive: false },
  )
  board.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault()
      touches.x2 = e.changedTouches[0].clientX
      touches.y2 = e.changedTouches[0].clientY
    },
    { passive: false },
  )
  board.addEventListener("touchend", () => {
    const x = touches.x2 - touches.x1
    const y = touches.y2 - touches.y1
    const dy = Math.abs(y)
    const dx = Math.abs(x)
    if (Math.max(dy, dx) > 50) {
      direction = dx > dy ? (x > 0 ? "right" : "left") : y < 0 ? "up" : "down"
    }
    if (direction === "down") draw(moveDown)
    if (direction === "up") draw(moveUp)
    if (direction === "left") draw(moveLeft)
    if (direction === "right") draw(moveRight)
  })
}

export const drawCellsOnMove =
  ({ cells, board }: { board: HTMLElement; cells: number[][] }) =>
  (fn: (xs: number[][]) => number[][]) => {
    const movedCells = fn(cells)
    if (isEqual(movedCells, cells)) {
      drawCells(board, cells)
      return
    }
    cells = fillOneCell(movedCells)
    drawCells(board, cells)
  }

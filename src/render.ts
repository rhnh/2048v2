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
    if (Math.max(dy, dx) > 10) {
      direction = dx > dy ? (x > 0 ? "right" : "left") : y < 0 ? "up" : "down"
    }
    if (direction === "down") {
      draw(moveDown)
    }
    if (direction === "up") {
      draw(moveUp)
    }
    if (direction === "left") {
      draw(moveLeft)
    }
    if (direction === "right") {
      draw(moveRight)
    }
  })
}

export const drawCellsOnMove =
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

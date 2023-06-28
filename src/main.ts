import { moveDown, moveLeft, moveRight, moveUp } from "./move"
import "./style.css"
import {
  clearBoard,
  fillCells,
  fillOneCell,
  generate2DArray,
  isEqual,
} from "./utils"
let xs = generate2DArray(4)
xs = fillCells(xs, true)(2)

const board = document.createElement("article")
board.className = "board"
function drawCells(xs: number[][], board: HTMLElement) {
  clearBoard(board)
  xs.map((x) => {
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
drawCells(xs, board)

addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "ArrowDown") {
    renderCells(moveDown)
  }
  if (e.key === "ArrowUp") {
    renderCells(moveUp)
  }
  if (e.key === "ArrowLeft") {
    renderCells(moveLeft)
  }
  if (e.key === "ArrowRight") {
    renderCells(moveRight)
  }
})

document.body.appendChild(board)

const renderCells = (fn: (xs: number[][]) => number[][]) => {
  const movedCells = fn(xs)
  if (isEqual(movedCells, xs)) {
    drawCells(xs, board)
    return
  }
  xs = fillOneCell(movedCells)
  drawCells(xs, board)
}

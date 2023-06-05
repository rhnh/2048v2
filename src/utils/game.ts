import { empty, isGameOver } from "./state"

import {
  fillOneCell,
  isEqual,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  render,
  renderGameOver,
  clearBoard,
  renderNewGame,
} from "./tools"

type baseFn = (xs: number[][]) => number[][]

export function game(
  container: HTMLElement,
  board: HTMLElement,
  cells: number[][],
  state: "playing" | "idle" | "finished"
) {
  addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "r") {
      state = "idle"
      cells = empty(cells)
      clearBoard(container)
      cells = fillOneCell(cells, true)
      cells = fillOneCell(cells, true)

      renderNewGame(board, cells, container)
      return
    }
    //catch if the game is finished
    if (state === "finished" || (isGameOver(cells) && event.key !== "r")) {
      renderGameOver(container)
      return
    }
    if (event.key === "ArrowLeft" || event.key === "a" || event.key === "h") {
      cells = renderCellsPerKey({ container, cells, board, fn: moveLeft })
    }

    if (event.key === "ArrowUp" || event.key === "w" || event.key === "k") {
      cells = renderCellsPerKey({ container, cells, board, fn: moveUp })
    }
    if (event.key === "ArrowRight" || event.key === "d" || event.key === "l") {
      cells = renderCellsPerKey({ container, cells, board, fn: moveRight })
    }
    if (event.key === "ArrowDown" || event.key === "s" || event.key === "j") {
      cells = renderCellsPerKey({ container, cells, board, fn: moveDown })
    }
  })
}

const renderCellsPerKey = ({
  cells,
  board,
  container,
  fn,
}: {
  cells: number[][]
  board: HTMLElement
  container: HTMLElement
  fn: baseFn
}): number[][] => {
  clearBoard(board)
  const movedCells = fn(cells)
  // if there is any legal move available
  if (isEqual(movedCells, cells)) {
    render(board, cells, container)
    return cells
  }
  cells = fillOneCell(movedCells)
  render(board, cells, container)
  if (isGameOver(cells)) {
    renderGameOver(container)
    return cells
  }
  return cells
}

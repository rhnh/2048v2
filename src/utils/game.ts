import { render, renderGameOver, renderNewGame, renderScore } from "./layout"
import {
  fillOneCell,
  isEqual,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  clearBoard,
  isGameOver,
  empty,
} from "./tools"

type baseFn = (xs: number[][]) => number[][]
declare global {
  var globalScore: number
}
export function game({
  state,
  cells,
  board,
  messageBoard,
}: {
  board: HTMLElement
  messageBoard: HTMLElement
  cells: number[][]
  state: "playing" | "idle" | "finished"
}) {
  if (state === "idle") return
  addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "r") {
      state = "idle"
      cells = reset({ cells, board, messageBoard })
      return
    }

    const renderCells = renderCellsPerKey({
      cells,
      board,
      messageBoard,
    })
    //catch if the game is finished
    if (state === "finished" || (isGameOver(cells) && event.key !== "r")) {
      renderGameOver(board)
      return
    }
    if (event.key === "ArrowLeft" || event.key === "a" || event.key === "h") {
      cells = renderCells(moveLeft)
    }

    if (event.key === "ArrowUp" || event.key === "w" || event.key === "k") {
      cells = renderCells(moveUp)
    }
    if (event.key === "ArrowRight" || event.key === "d" || event.key === "l") {
      cells = renderCells(moveRight)
    }
    if (event.key === "ArrowDown" || event.key === "s" || event.key === "j") {
      cells = renderCells(moveDown)
    }
  })
}

const renderCellsPerKey =
  ({
    cells,
    board,
    messageBoard,
  }: {
    cells: number[][]
    board: HTMLElement
    messageBoard: HTMLElement
  }) =>
  (fn: baseFn): number[][] => {
    clearBoard(board)

    const movedCells = fn(cells)
    // if there is any legal move available
    if (isEqual(movedCells, cells)) {
      render({ board, cells })
      return cells
    }
    cells = fillOneCell(movedCells)
    clearBoard(messageBoard)
    renderScore(messageBoard)
    render({ board, cells })
    if (isGameOver(cells)) {
      renderGameOver(board)
      return cells
    }
    return cells
  }

const reset = ({
  cells,
  board,
  messageBoard,
}: {
  cells: number[][]
  board: HTMLElement
  messageBoard: HTMLElement
}) => {
  cells = empty(cells)
  clearBoard(board)
  cells = fillOneCell(cells, true)
  cells = fillOneCell(cells, true)
  globalThis.globalScore = 0
  clearBoard(messageBoard)
  renderScore(messageBoard)
  renderNewGame(board, cells)
  return cells
}

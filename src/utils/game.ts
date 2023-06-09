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
  renderScore,
  isGameOver,
  empty,
} from "./tools"

type baseFn = (xs: number[][]) => number[][]
declare global {
  var globalScore: number
}
export function game({
  arena,
  state,
  cells,
  board,
  messageBoard,
}: {
  arena: HTMLElement
  board: HTMLElement
  messageBoard: HTMLElement
  cells: number[][]
  state: "playing" | "idle" | "finished"
}) {
  addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "r") {
      state = "idle"
      cells = reset({ cells, arena: arena, board, messageBoard })
      return
    }
    const renderCells = renderCellsPerKey({ cells, board, arena, messageBoard })
    //catch if the game is finished
    if (state === "finished" || (isGameOver(cells) && event.key !== "r")) {
      renderGameOver(arena)
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
    arena,
    messageBoard,
  }: {
    cells: number[][]
    board: HTMLElement
    arena: HTMLElement
    messageBoard: HTMLElement
  }) =>
  (fn: baseFn): number[][] => {
    clearBoard(board)

    const movedCells = fn(cells)
    // if there is any legal move available
    if (isEqual(movedCells, cells)) {
      render({ board, cells, arena })
      return cells
    }
    cells = fillOneCell(movedCells)
    clearBoard(messageBoard)
    renderScore(messageBoard)
    render({ board, cells, arena })
    if (isGameOver(cells)) {
      renderGameOver(arena)
      return cells
    }
    return cells
  }

const reset = ({
  cells,
  arena,
  board,
  messageBoard,
}: {
  cells: number[][]
  board: HTMLElement
  arena: HTMLElement
  messageBoard: HTMLElement
}) => {
  cells = empty(cells)
  clearBoard(arena)
  cells = fillOneCell(cells, true)
  cells = fillOneCell(cells, true)
  globalThis.globalScore = 0
  clearBoard(messageBoard)
  renderScore(messageBoard)
  renderNewGame(board, cells, arena)
  return cells
}

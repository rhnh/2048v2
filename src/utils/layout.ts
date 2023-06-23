import { getColorShades } from "./colors"
import { game } from "./game"
import { getFontSize, getWidth } from "./mq"
import { clearBoard, fillCells, generate2DArray } from "./tools"

export const createElement =
  (tag: keyof HTMLElementTagNameMap) =>
  (className: string): HTMLElement => {
    const el = document.createElement(tag)
    el.className += ` ${className}`
    return el
  }

export const createStartButton =
  ({
    board,
    cells,
    messageBoard,
    plate,
  }: {
    messageBoard: HTMLElement
    plate: HTMLElement
    cells: number[][]
    board: HTMLElement
  }) =>
  (boardSize: number, label: string): HTMLButtonElement => {
    const button = createButton("btn-start") as unknown as HTMLButtonElement
    button.innerHTML = label
    button.addEventListener("click", () => {
      board.removeChild(plate)
      clearBoard(board)
      boardStyle(board, boardSize)
      cells = generate2DArray(boardSize)
      cells = fillCells(cells, true)(boardSize / 2)
      renderCells({ cells, board })
      game({ state: "playing", cells, messageBoard, board })
    })

    return button
  }

const createButton = createElement("button")
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
  board.style.gap = "1px"
}

/**
 *
 * @param param0
 */
const cellStyle = ({
  cellValue,
  cell,
  boardSize,
}: {
  cellValue: number
  boardSize: number
  cell: HTMLElement
}) => {
  const width = window.innerWidth > 0 ? window.innerWidth : screen.width

  cell.className = `cell `
  const bgColor = getColorShades(
    cellValue,
    "#476675",
    "#fd3",
    "#CDDC39",
    "#03A9F4",
    "#fd3",
    "#fd3",
    "#fd3",
    "#fd3",
    "#3949AB",
  )

  cell.style.backgroundColor = `#${bgColor}`

  const digitLength = cellValue.toString().length
  cell.style.fontSize = getFontSize({
    boardSize,
    actualScreenWidth: width,
    digitLength,
  })
  if (cellValue === 0) {
    cell.className += ` hasZero`
  }
}

/**
 *
 * @param param0
 */
export function renderCells({
  cells,
  board,
}: {
  board: HTMLElement
  cells: number[][]
}) {
  cells.map((row) => {
    row.map((cellValue: number) => {
      const cell = document.createElement("section")
      cell.innerText = cellValue === 0 ? "" : `${cellValue}`
      cellStyle({ cell, cellValue, boardSize: cells.length })
      board.appendChild(cell)
    })
  })
}
/**
 *
 * @param arena
 */
export function renderGameOver(arena: HTMLElement) {
  const message = document.createElement("section")
  message.className = "game-over"

  arena.appendChild(message)
  const retry = document.createElement("button")

  retry.innerText = "Try again"
  retry.onclick = () => {
    window.location.reload()
  }
  message.appendChild(retry)
}
/**
 *
 * @param board
 * @param cells
 */
export function renderNewGame(board: HTMLElement, cells: number[][]) {
  clearBoard(board)
  renderCells({ board, cells })
}
/**
 *
 * @param arena
 */
export const renderScore = (arena: HTMLElement) => {
  const p = document.createElement("p")
  p.innerHTML = `${globalThis.globalScore}`
  arena.appendChild(p)
}

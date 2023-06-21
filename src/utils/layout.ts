import { getColorShade } from "./colors"
import { game } from "./game"
import { getWidth } from "./mq"
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
      render({ cells, board })
      game({ state: "playing", cells, messageBoard, board })
    })

    return button
  }

const createButton = createElement("button")

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

const getColorShades = (n: number) => {
  if (n === 0) {
    return "e5e5e5"
  }

  if (n <= 16) {
    return getColorShade("00bbf9", n / 2)
  }
  if (n >= 32 && n <= 128) {
    return getColorShade("e7c6ff", n / 32)
  }
  if (n > 128 && n <= 512) {
    return getColorShade("57cc99", n / 256)
  }
  if (n > 1024 && n <= 4096) {
    return getColorShade("c1121f", n / 1024)
  }

  if (n >= 4096 && n < 16384) {
    return getColorShade("9b5de5", n / 4096)
  }
  if (n >= 1024 && n < 4096) {
    return getColorShade("ce4257", n / 1024)
  }
  if (n >= 4096 && n <= 16384) {
    return getColorShade("ffbd00", n / 4096)
  }
  if (n >= 16384 && n <= 49152) {
    return getColorShade("390099", n / 16384)
  }
  return "ff0000"
}

export function render({
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
      const digit: string = `digit-${String(cellValue).length}`
      cell.className = `box ${digit}`

      const bg = getColorShades(cellValue)
      cell.style.backgroundColor = `#${bg}`

      if (cellValue === 0) {
        cell.className += ` hasZero`
      }
      board.appendChild(cell)
    })
  })
}

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

export function renderNewGame(board: HTMLElement, cells: number[][]) {
  clearBoard(board)
  render({ board, cells })
}
export const renderScore = (arena: HTMLElement) => {
  const p = document.createElement("p")
  p.innerHTML = `${globalThis.globalScore}`
  arena.appendChild(p)
}

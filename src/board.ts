import { controlBar } from "./controls"
import { keyPressedMovements, mobileTouchOption } from "./keyboard"
import { getCellFontSize, getCellWidth } from "./mq"
import { clearBoard, fillOneCell, isEqual, isGameOver } from "./utils"

export function renderCells(board: HTMLElement, cells: number[][]) {
  clearBoard(board)
  cells.map((x) => {
    x.map((cellValue: number) => {
      const cell = document.createElement("span")
      const screenWidth =
        window.innerWidth > 0 ? window.innerWidth : screen.width
      cell.className += "filled"
      cell.innerText = cellValue === 0 ? "" : `${cellValue}`
      if (cellValue === 0) {
        cell.className += " zero"
      }
      cell.style.fontSize = getCellFontSize({
        boardSize: cells.length,
        actualScreenWidth: screenWidth,
        digitLength: String(cellValue).length,
      })
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
  const screenWidth = window.innerWidth > 0 ? window.innerWidth : screen.width
  const width = getCellWidth(boardSize, screenWidth)
  const boardWidth = `${width}px `.repeat(boardSize)
  board.style.gridTemplateColumns = boardWidth
  board.style.gridTemplateRows = boardWidth

  board.style.gap = "2px"
}

//#########################################################

export function initialRenderBoard({
  cells,
  board,
}: {
  board: HTMLElement
  cells: number[][]
}) {
  const draw = drawCellsOnMove({ cells, board })
  globalThis.globalCells = cells
  boardStyle(board, cells.length)
  keyPressedMovements(draw)
  mobileTouchOption(board, draw)
}
//#########################################################

export const drawCellsOnMove =
  ({ cells, board }: { board: HTMLElement; cells: number[][] }) =>
  (fn: (xs: number[][]) => number[][]) => {
    const score = document.querySelector(
      ".scoreboard__score",
    ) as unknown as HTMLSpanElement
    if (isGameOver(cells)) {
      renderGameOver(board)
      const best = document.querySelector(
        ".scoreboard__best",
      ) as unknown as HTMLSpanElement
      const bestScore = best.innerText as unknown as number
      const currentScore = score.innerText as unknown as number
      if (currentScore > bestScore) {
        window.localStorage.setItem("best-score", `${currentScore}`)
      }
      return
    }
    const movedCells = fn(cells)
    if (isEqual(movedCells, cells)) {
      renderCells(board, cells)
      return
    }
    cells = fillOneCell(movedCells)
    renderCells(board, cells)
    globalThis.globalCells = cells
    if (score) score.innerText = `${globalScore}`
  }

export function renderGameOver(board: HTMLElement) {
  const message = document.createElement("section")
  message.className = "game-over"
  clearBoard(board)
  board.appendChild(message)
  const retry = document.createElement("button")

  retry.innerText = "Try again"
  retry.onclick = () => {
    window.location.reload()
  }
  message.appendChild(retry)
}

import { startSelector } from "./components"
import { keyPressedMovements, mobileTouchOption } from "./keyboard"
import { getCellFontSize, getCellWidth } from "./mq"
import { chain, createElement, id } from "./tools"
import { clearBoard, fillOneCell, isEqual, isGameOver } from "./utils"
export interface Cell {
  cellValue: number
  backgroundColor: string
  color: string
}

export const createCell = (
  cellValue: number,
  columnsWidth: number,
  customize?: Cell,
) =>
  chain(createElement("span")("cell"))
    .map((cell: HTMLSpanElement) => {
      cell.innerText = cellValue === 0 ? "" : `${cellValue}`
      return cell
    })
    .map((cell: HTMLSpanElement) => {
      const screenWidth =
        window.innerWidth > 0 ? window.innerWidth : screen.width
      cell.style.fontSize = getCellFontSize({
        boardSize: columnsWidth,
        actualScreenWidth: screenWidth,
        digitLength: String(cellValue).length,
      })
      return cell
    })
    .map((cell: HTMLSpanElement) => {
      if (globalThis && globalThis.globalColors.length > 0) {
        const gCells = globalColors
        gCells.map((c) => {
          if (`${c.cellValue}` === cell.innerText) {
            cell.style.backgroundColor = c.backgroundColor ?? ""
          }
        })
      }
      cell.className += " cells"
      return cell
    })
    .fold(id)

export function renderCells(
  board: HTMLElement,
  cells: number[][],
  customize?: Cell,
) {
  clearBoard(board)
  cells.map((x) => {
    x.map((cellValue: number) => {
      board.appendChild(createCell(cellValue, cells.length, customize))
    })
  })
  boardStyle(board, cells.length)
}
//#########################################################
/**
 *
 * @param board
 * @param boardSize
 */
const boardStyle = (board: HTMLElement, boardSize: number) => {
  board.style.display = "grid"
  board.style.position = "relative"
  const screenWidth = getScreenWidth()
  const width = getCellWidth(boardSize, screenWidth)
  const boardWidth = `${width}px `.repeat(boardSize)
  board.style.gridTemplateColumns = boardWidth
  board.style.gridTemplateRows = boardWidth

  board.style.gap = "2px"
}
const getScreenWidth = () =>
  window.innerWidth > 0 ? window.innerWidth : screen.width

//#########################################################
export type Status = "playing" | "idle" | "finished"
export function renderBoard({
  cells,
  board,
  state,
  customize,
}: {
  board: HTMLElement
  cells: number[][]
  state: Status
  customize?: Cell
}) {
  const draw = drawCellsOnMove({ cells, board })
  renderCells(board, cells, customize)
  if (state === "idle") {
    startSelector(board, cells)
    return
  }
  if (state === "finished") {
    return renderGameOver(board)
  }
  boardStyle(board, cells.length)
  keyPressedMovements(draw)
  mobileTouchOption(board, draw)
}
//#########################################################
export function check(
  board: HTMLElement,
  cells: number[][],
  score: HTMLElement,
) {
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
}

export const drawCellsOnMove =
  ({ cells, board }: { board: HTMLElement; cells: number[][] }) =>
  (fn: (xs: number[][]) => number[][]) => {
    const score = document.querySelector(
      ".scoreboard__score",
    ) as unknown as HTMLSpanElement

    globalThis.globalCells = cells
    const movedCells = fn(cells)
    if (isEqual(movedCells, cells)) {
      renderCells(board, cells)
      return
    }
    cells = fillOneCell(movedCells)
    renderCells(board, cells)
    check(board, cells, score)
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

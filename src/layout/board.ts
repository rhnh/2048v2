import {
  Cells,
  Status,
  cellsToString,
  chain,
  getScreenWidth,
  getTarget,
  id,
} from "../tools/utils"
import { getCellWidth } from "../tools/mq"
import { keyPressedMovements, mobileTouchOption } from "../tools/keyboard"
import { getHightestValue, isGameOver } from "../tools/tools"

import { createElement, updateBestScores, updateCurrentScores } from "./utils"
import { nextLevel, renderGameOver as renderGameOver } from "./lib"
import { selectBoard } from "./components"
import { createCellElement } from "./cell"
import { game } from "../game"
export const removeChildren = (element: HTMLElement) => {
  while (element.firstChild) {
    element.firstChild.remove()
  }
}

export const createBoardElement = ({
  boardSize,
}: {
  boardSize: number
}): HTMLElement => {
  const article = chain(createElement("article")("board"))
    .map((board: HTMLElement) => {
      board.style.display = "grid"
      board.style.position = "relative"
      const screenWidth = getScreenWidth()
      const width = getCellWidth(boardSize, screenWidth)
      const boardWidth = `${width}px `.repeat(boardSize)
      board.style.gridTemplateColumns = boardWidth
      board.style.gridTemplateRows = boardWidth
      board.tabIndex = 0
      board.style.gap = "1px"
      return board
    })
    .map((board: HTMLElement) => {
      return board
    })

  return article.fold(id)
}

export const renderBoardCells = ({
  board,
  cells,
  base,
  colors,
}: {
  board: HTMLElement
  cells: Cells
  base: number
  colors: string[]
}) => {
  globalThis.globalCells = cellsToString(cells)

  updateCurrentScores()
  updateBestScores()
  removeChildren(board)
  cells.flat().map((cell) => {
    const draw = game({ cells, board, base, colors })

    const createdCells = createCellElement({
      cell,
      boardSize: cells.length,
      base,
      colors,
    })
    mobileTouchOption(createdCells, draw)
    return board.append(createdCells)
  })
  board.style.display = "grid"
  board.style.position = "relative"
  const screenWidth = getScreenWidth()
  const width = getCellWidth(cells.length, screenWidth)
  const boardWidth = `${width}px `.repeat(cells.length)
  board.style.gridTemplateColumns = boardWidth
  board.style.gridTemplateRows = boardWidth
  board.tabIndex = 0
  board.style.gap = "1px"
  return board
}

export function renderBoard({
  cells,
  board,
  state,
  base,
  colors,
}: {
  board: HTMLElement
  state: Status
  cells: Cells
  base: number
  colors: string[]
}) {
  const target = getTarget(base)
  const highestCellValue = getHightestValue(cells)
  if (base >= 5) {
    renderGameOver({
      base,
      board,
      cells,
      colors,
      message: "You won! Game over!",
    })
    return
  }
  if (highestCellValue === target) {
    globalThis.isPlaying = "pause"
    nextLevel({ board, cells, base, colors })
    return
  }
  if (isGameOver(cells) && state === "finished") {
    removeChildren(board)
    globalThis.globalCells = cellsToString(cells)

    renderGameOver({ board, cells, base, colors })
    if (globalThis.globalScore > Number(localStorage.getItem("best-score")))
      updateBestScores()
    return cells
  }
  if (state === "playing") {
    renderBoardCells({ board, cells, base, colors })
    const draw = game({ cells, board, base, colors })

    keyPressedMovements(draw)
    return cells
  }
  renderBoardCells({ board, cells, base, colors })
  selectBoard({ board, cells, base, colors })

  if (highestCellValue === target || highestCellValue === target) {
    globalThis.isPlaying = "pause"
    nextLevel({ board, cells, base, colors })
    return
  }
  if (base >= 5) {
    renderGameOver({
      base,
      board,
      cells,
      colors,
      message: "You won! Game over!",
    })
    return
  }
  return cells
}

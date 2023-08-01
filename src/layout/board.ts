import {
  Cells,
  Status,
  cellsToString,
  chain,
  getScreenWidth,
  id,
} from "../tools/utils"
import { getCellWidth } from "../tools/mq"
import { keyPressedMovements, mobileTouchOption } from "../tools/keyboard"
import {
  fillOneCell,
  getHightestValue,
  isEqual,
  isGameOver,
} from "../tools/tools"

import { createElement } from "./utils"
import { gameOver, nextLevel } from "./lib"
import { selectBoard } from "./components"
import { createCellElement } from "./cell"
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

export const renderBoardOnMoves =
  ({
    cells,
    board,
    base,
    colors,
    target = 2048,
  }: {
    board: HTMLElement
    cells: Cells
    base: number
    colors: string[]
    target: number
  }) =>
  (fn: (xs: Cells) => Cells) => {
    globalThis.globalCells = cellsToString(cells)
    if (base > 4) {
      gameOver({ base: 2, board, cells, colors, target })
      return
    }
    const value = getHightestValue(cells)
    if (base === 4 && value / base === target) {
      gameOver({ base: 2, board, cells, colors, target })
      return
    }
    if (base === 2 && value === target) {
      globalThis.isPlaying = "pause"
      nextLevel({ board, cells, base: 3, colors, target })
      return
    }
    if (base === 3 && value / base === target) {
      globalThis.isPlaying = "pause"
      nextLevel({ board, cells, base: 4, colors, target })
      return
    }

    if (isGameOver(cells)) {
      globalThis.globalCells = cellsToString(cells)

      removeChildren(board)
      gameOver({ board, cells, base, colors, target })
      updateCurrentScores()

      return
    }
    if (
      Number(globalThis.globalScore) >
      Number(localStorage.getItem("best-score"))
    ) {
      localStorage.setItem("best-score", `${globalThis.globalScore}`)
    }

    const movedCells = fn(cells)
    if (isEqual(movedCells, cells)) {
      renderBoardCells({ board, cells, base, colors })
      return cells
    }
    cells = fillOneCell({ cells: movedCells, base })
    if (isGameOver(cells)) {
      globalThis.globalCells = cellsToString(cells)

      removeChildren(board)
      gameOver({ board, cells, base, colors, target })
      return
    }
    renderBoardCells({ board, cells, base, colors })
    return cells
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
  cells
    .flat()
    .map((cell) =>
      board.append(
        createCellElement({ cell, boardSize: cells.length, base, colors }),
      ),
    )
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
  target = 2048,
}: {
  board: HTMLElement
  state: Status
  cells: Cells
  base: number
  colors: string[]
  target: number
}) {
  if (isGameOver(cells) && state === "finished") {
    removeChildren(board)
    globalThis.globalCells = cellsToString(cells)

    gameOver({ board, cells, base, colors, target })
    if (globalThis.globalScore > Number(localStorage.getItem("best-score")))
      updateBestScores()
    return cells
  }
  if (state === "playing") {
    const draw = renderBoardOnMoves({ cells, board, base, colors, target })

    renderBoardCells({ board, cells, base, colors })
    keyPressedMovements(draw)
    mobileTouchOption(board, draw)
    return cells
  }
  renderBoardCells({ board, cells, base, colors })
  selectBoard({ board, cells, base, colors, target })
  return cells
}

const updateCurrentScores = () => {
  const currentScore = document.querySelector(
    ".current-score",
  ) as unknown as HTMLElement
  const value = globalThis.globalScore
  currentScore.innerText = `${value}`
}
const updateBestScores = () => {
  const currentScore = document.querySelector(
    ".best-score",
  ) as unknown as HTMLElement
  const savedValue = localStorage.getItem("best-score")
  if (savedValue && Number(savedValue) > globalThis.globalScore) {
    currentScore.innerText = `${savedValue}`
  }
  if (!savedValue || savedValue === null) {
    currentScore.innerText = `${0}`
  }
  if (savedValue === null) {
    currentScore.innerText = "0"
    return
  }
  currentScore.innerText = `${savedValue}`
}

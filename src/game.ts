import { removeChildren, renderBoardCells } from "./layout/board"
import { renderGameOver, nextLevel } from "./layout/lib"
import { updateCurrentScores } from "./layout/utils"
import {
  fillOneCell,
  getHightestValue,
  isEqual,
  isGameOver,
} from "./tools/tools"
import { Cells, cellsToString, getTarget } from "./tools/utils"

export const game =
  ({
    cells,
    board,
    base,
    colors,
  }: {
    board: HTMLElement
    cells: Cells
    base: number
    colors: string[]
  }) =>
  (fn: (xs: Cells) => Cells) => {
    const highestCellValue = getHightestValue(cells)

    let target = getTarget(base)
    if (highestCellValue === target) {
      globalThis.isPlaying = "pause"
      nextLevel({ board, cells, base, colors })
      return
    }

    globalThis.globalCells = cellsToString(cells)

    if (isGameOver(cells)) {
      globalThis.globalCells = cellsToString(cells)

      removeChildren(board)
      renderGameOver({ board, cells, base, colors })
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
      renderGameOver({ board, cells, base, colors })
      return
    }

    if (highestCellValue === getTarget(base)) {
      globalThis.isPlaying = "pause"
      nextLevel({ board, cells, base, colors })
      return
    }

    renderBoardCells({ board, cells, base, colors })
    return cells
  }

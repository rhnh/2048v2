import {
  canMoveHorizontally,
  canMoveVertically,
  hasEmptyZeros,
} from "./movements"
import { Cell, Cells } from "./utils"

export const zeroLast = (xs: Cell[]): Cell[] => {
  const noneZeros = xs.filter((x) => x.value !== 0)
  const zeros = xs.filter((x) => x.value === 0)

  return [...noneZeros, ...zeros]
}
export const reverseCell = (xs: Cell[]) => xs.slice().reverse()
const iArray = <T>(x: T[]) => Array.from(x)

export const transpose = (xs: Cells) => {
  const arr = iArray(xs).map((x) => iArray(x))
  return arr[0].map((_, i) => arr.map((y) => y[i]))
}

export const isEqual = (xs: Cells, arr: Cells): boolean => {
  if (xs.length !== arr.length) return false
  if (!Array.isArray(xs) || !Array.isArray(arr)) return false
  for (let i = 0; i < xs.length; i++) {
    for (let j = 0; j < xs.length; j++) {
      if (
        xs[i][j].pValue !== arr[i][j].pValue ||
        xs[i][j].value !== arr[i][j].value ||
        xs[i][j].id !== arr[i][j].id
      ) {
        return false
      }
    }
  }
  return true
}

export const hasSameSibling = (xs: Cell[]): boolean =>
  [...Array.from(xs)]
    .map((x, i) => {
      const next = xs[i + 1]
      if (next === undefined) return i
      if (x.value === next.value) {
        return -1
      }
      return i
    })
    .map((x) => x == -1)
    .filter((x) => x === true).length > 0

/**
 * - At first pValue all cells with will be 0
 * - if a cell has the same value as its nearest sibling
 * - the current value of the cell will be store in pValue (previous) for the purpose of html/css animation, to indicate the cells is double
 * - the current value will be multiplied by 2
 * - the sibling value will be 0
 * @param arr - An Array of Cells,
 * @returns - Array of Cells
 */
export const doubleSameSibling = (arr: Cell[]) => {
  const xs = zeroLast(iArray(arr))
  for (let i = 0; i < arr.length; i++) {
    xs[i].pValue = 0
  }
  for (let n = 1; n < arr.length; n++) {
    let p = n - 1

    if (xs[n].value === xs[p].value) {
      globalThis.globalScore += xs[n].value * 2
      let next: Cell = {
        ...xs[n],
        pValue: 0,
        value: 0,
      }
      let previous: Cell = {
        ...xs[p],
        value: 2 * xs[p].value,
        pValue: xs[p].value,
      }
      xs[p] = previous
      xs[n] = next
    }
  }

  return zeroLast(iArray(xs))
}

export const isFulled2d = (arr: Cells): boolean =>
  arr.flat().filter((x) => x.value === 0).length <= 0

export const isFulled = (arr: Cell[]) =>
  arr.filter((cell) => cell.value === 0).length === 0

/**
 *
 * @param cells - An Array of Cells,
 * @param isInit - is it at beginning of the game ?
 * @returns - an  array of cells with one filled value
 */
export function fillOneCell({
  cells,
  isInitial = false,
  base,
}: {
  cells: Cells
  isInitial?: boolean
  base: number
}): Cells {
  const arr = iArray(cells).map((x) => iArray(x))
  if (isFulled2d(arr)) return arr

  const indices = getRandomEmptyCell(arr)
  const i = indices[0]
  const j = indices[1]
  arr[i][j].pValue = -1

  isInitial
    ? (arr[i][j].value = base)
    : (arr[i][j].value = Math.random() < 0.9 ? base : 2 * base)

  return arr
}

export const fillMoreCells = ({
  cells,
  isInitial,
  base,
  total,
}: {
  cells: Cells
  isInitial: boolean
  base: number
  total: number
}) => {
  let i = 0
  let xs = [...cells]
  while (i < total) {
    xs = fillOneCell({ cells: xs, isInitial, base })
    i++
  }
  return xs
}
const getRandomEmptyCell = (cells: Cells): number[] => {
  const empty = cells
    .map((x, i) => x.map((y, j) => (y.value === 0 ? [i, j] : [])))
    .flat()
    .filter((x) => x.length > 0)
  const r = Math.floor(Math.random() * empty.length)
  return empty[r]
}
export function generateEmptyCells(boardSize: number): Cells {
  return Array.from(Array(boardSize).keys())
    .map(() => Array.from(Array(boardSize).keys()))
    .map((x) => x.map(() => ({ value: 0, id: 0, pValue: 0 })))
}

export const isGameOver = (xs: Cells) =>
  hasEmptyZeros(xs) && !canMoveVertically(xs) && !canMoveHorizontally(xs)

function compareNumbers(a: number, b: number) {
  return b - a
}

export const getHightestValue = (xs: Cells): number =>
  xs
    .flat()
    .map((x) => x.value)
    .sort(compareNumbers)[0]

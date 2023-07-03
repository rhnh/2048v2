export const reverse = (xs: number[]) => xs.slice().reverse()
export const reverse2d = (xs: number[][]) => xs.map(reverse)
export const iArray = <T>(x: T[]) => Array.from(x)
export const immutableArray = <T>(xs: T[][]) => xs.map((x) => Array.from(x))

export const zeroLast = (xs: number[]) => {
  const len = xs.length
  const noneZeros = xs.filter((x) => x !== 0)
  const zeros = Array.from(Array(len - noneZeros.length)).map(() => 0)
  return [...noneZeros, ...zeros]
}
declare global {
  var globalScore: number
  var globalCells: number[][]
}
globalThis.globalScore = 0

export const double = (arr: number[]) => {
  const xs = zeroLast([...Array.from(arr)])
  xs.reduce((x1, x2, i) => {
    if (x1 === x2) {
      xs[i - 1] = 2 * x1
      xs[i] = 0
      globalThis.globalScore += x1 + x1
      return 2 * x1
    }
    return x2
  })
  return zeroLast(xs)
}
export const double2d = (xs: number[][]) => xs.map(double)
export const transpose = (xs: number[][]) => {
  const arr = iArray(xs).map((x) => iArray(x))
  return arr[0].map((_, i) => arr.map((y) => y[i]))
}

export function print(xs: number[][]) {
  let str = ""
  for (let i = 0; i < xs.length; i++) {
    for (let j = 0; j < xs.length; j++) {
      str += `${xs[i][j]} `
    }
    str += " \n"
  }
  console.info(str)
}
/**
 *
 * @param xs 2D Array
 * @param isInit initial with 2
 * @returns
 */
export function fillOneCell(xs: number[][], isInit = false): number[][] {
  const arr = iArray(xs).map((x) => iArray(x))
  const isFulled = arr.flat().filter((x) => x == 0).length <= 0
  if (isFulled) return arr
  while (true) {
    const i = Math.floor(Math.random() * xs.length)
    const j = Math.floor(Math.random() * xs.length)
    if (xs[i][j] == 0) {
      if (isInit) {
        arr[i][j] = 2
        return arr
      }
      arr[i][j] = Math.random() < 0.9 ? 2 : 4
      return arr
    }
  }
}
/**
 * This is Method compares 2 arrays, if they are deep equal
 * @param xs - A 2D Array of numbers
 * @param arr - A 2D Array of numbers
 * @returns - True/False
 */
export const isEqual = (xs: number[][], arr: number[][]): boolean => {
  if (xs.length !== arr.length) return false
  if (!Array.isArray(xs) || !Array.isArray(arr)) return false
  for (let i = 0; i < xs.length; i++) {
    for (let j = 0; j < xs.length; j++) {
      if (xs[i][j] !== arr[i][j]) {
        return false
      }
    }
  }
  return true
}

/**
 * This method removes all children of the given element
 * @param parent Takes an HTMLElement
 * @return return HTMLElement or null
 */
export function clearBoard(parent: HTMLElement) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

/**
 *
 * @param n number of columns and rows
 * @returns a2
 */
export const generate2DArray = (n: number) =>
  Array.from(Array(n).keys()).map(() =>
    Array.from(Array(n).keys()).map(() => 0),
  )

export const hasSiblings = (xs: number[]) =>
  [...Array.from(xs)]
    .map((x, i) => {
      const next = xs[i + 1]

      if (next === undefined) return x
      if (x === next) {
        return -1
      }
      return x
    })
    .map((x) => x == -1)
    .filter((x) => x === true).length > 0

export const canMoveHorizontally = (xs: number[][]): boolean =>
  Array.from(xs)
    .map((x) => {
      return hasSiblings(x)
    })
    .filter((x) => x === true).length !== 0

export const canMoveVertically = (xs: number[][]) =>
  canMoveHorizontally(transpose(Array.from(xs)))

export const isGameOver = (xs: number[][]) =>
  hasEmptyZeros(xs) && !canMoveVertically(xs) && !canMoveHorizontally(xs)

export const empty = (xs: number[][]) =>
  [...Array(xs.length)].map(() => Array(xs.length).fill(0))

export const hasEmptyZeros = (xs: number[][]) =>
  xs.flat().find((x) => x === 0) !== 0

export const fillCells =
  (cells: number[][], isInit: boolean) => (x: number) => {
    let i = 0
    while (i < x) {
      cells = fillOneCell(cells, isInit)
      i++
    }
    return cells
  }

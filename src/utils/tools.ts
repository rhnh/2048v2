export const iReverse = (xs: number[]) => xs.slice().reverse()
const iArray = <T>(x: T[]) => Array.from(x)

export const zeroLast = (xs: number[]) => {
  const len = xs.length
  const noneZeros = xs.filter((x) => x !== 0)
  const zeros = Array.from(Array(len - noneZeros.length)).map(() => 0)
  return [...noneZeros, ...zeros]
}

export const doubleSame = (arr: number[]) => {
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
  console.log(str)
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

export const moveDown = (xs: number[][]): number[][] =>
  transpose(
    transpose(iArray(xs))
      .map((x) => iReverse(x))
      .map((x) => doubleSame(x))
      .map((x) => iReverse(x))
  )

export const moveUp = (xs: number[][]): number[][] =>
  transpose(
    transpose(iArray(xs).map((x) => iArray(x))).map((x) => doubleSame(x))
  )

export const moveLeft = (xs: number[][]) =>
  iArray(xs)
    .map((x) => iArray(x))
    .map((x) => doubleSame(x))

export const moveRight = (xs: number[][]) =>
  iArray(xs)
    .map((x) => iArray(x))
    .map((x) => iReverse(x))
    .map((x) => doubleSame(x))
    .map((x) => iReverse(x))
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

export function render({
  cells,
  board,
}: {
  board: HTMLElement
  cells: number[][]
}) {
  cells.map((row) => {
    row.map((column) => {
      const cell = document.createElement("div")
      cell.innerText = `${column}`
      const digit: string = `digit-${String(column).length}`
      cell.className = `box ${digit}`
      if (column === 0) {
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
/**
 *
 * @param n number of columns and rows
 * @returns a2
 */
export const generate2DArray = (n: number) =>
  Array.from(Array(n).keys()).map(() =>
    Array.from(Array(n).keys()).map(() => 0)
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

export const boardStyle = (board: HTMLElement, boardSize: number) => {
  board.style.display = "grid"
  board.style.position = "relative"
  const width = window.innerWidth > 0 ? window.innerWidth : screen.width

  const mq = window.matchMedia("(min-width: 320px)")
  console.log(width, document.documentElement.clientWidth, mq, mq.matches)
  const f = boardSizeScreen(boardSize, width)

  const gridStyle = f
  board.style.gridTemplateColumns = gridStyle
  board.style.gridTemplateRows = gridStyle
  board.style.gap = "1px"
}

const boardSizeScreen = (boardSize: number, screenWidth: number) => {
  let size: number = 150
  if (boardSize === 4) {
    size = boardSizeFour(screenWidth)
  }
  if (boardSize === 6) {
    size = boardSizeSix(screenWidth)
  }
  if (boardSize === 8) {
    size = boardSizeEight(screenWidth)
  }
  return `${size}px `.repeat(boardSize)
}
function boardSizeFour(screenWidth: number): number {
  if (screenWidth <= xxSmallScreen320) {
    return 76
  }
  if (screenWidth <= xSmallScreen360) {
    return 88
  }
  if (screenWidth <= smallScreen375) {
    return 92
  }
  if (screenWidth <= xxxMediumScreen384) {
    return 94.5
  }
  if (screenWidth <= xxMediumScreen390) {
    return 96
  }
  if (screenWidth <= xMediumScreen414) {
    return 101.5
  }
  if (screenWidth <= mediumScreen428) {
    return 105
  }
  if (screenWidth <= largeScreen800) {
    return 120
  }
  return 120
}
function boardSizeSix(screenWidth: number): number {
  if (screenWidth <= xxSmallScreen320) {
    return 50
  }
  if (screenWidth <= xSmallScreen360) {
    return 60
  }
  if (screenWidth <= smallScreen375) {
    return 61
  }
  if (screenWidth <= xxxMediumScreen384) {
    return 62.5
  }
  if (screenWidth <= xxMediumScreen390) {
    return 63.5
  }
  if (screenWidth <= xMediumScreen414) {
    return 67
  }
  if (screenWidth <= mediumScreen428) {
    return 70
  }
  if (screenWidth <= largeScreen800) {
    return 90
  }
  return 76
}
function boardSizeEight(screenWidth: number) {
  if (screenWidth <= xxSmallScreen320) {
    return 38
  }
  if (screenWidth <= xSmallScreen360) {
    return 43
  }
  if (screenWidth <= smallScreen375) {
    return 46
  }
  if (screenWidth <= xxxMediumScreen384) {
    return 46.5
  }
  if (screenWidth <= xxMediumScreen390) {
    return 47.5
  }
  if (screenWidth <= xMediumScreen414) {
    return 50
  }
  if (screenWidth <= mediumScreen428) {
    return 52
  }
  if (screenWidth <= largeScreen800) {
    return 70
  }
  return 70
}
const xxSmallScreen320 = 320
const xSmallScreen360 = 360
const smallScreen375 = 375
const xxxMediumScreen384 = 384
const xxMediumScreen390 = 390
const xMediumScreen414 = 414
const mediumScreen428 = 428
const largeScreen800 = 800

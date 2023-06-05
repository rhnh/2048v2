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

export function render(
  main: HTMLElement,
  xs: number[][],
  container: HTMLElement
) {
  xs.map((row) => {
    row.map((column) => {
      const cell = document.createElement("div")
      cell.innerText = `${column}`
      const digit: string = `digit-${String(column).length}`
      cell.className = `box ${digit}`
      if (column === 0) {
        cell.className += ` hasZero`
      }
      main.appendChild(cell)
    })
  })
  document.body.append(container)
  container.append(main)
}

export function renderGameOver(container: HTMLElement) {
  // rmPreviousChildNodes(container)
  const message = document.createElement("section")
  message.className = "message"

  container.appendChild(message)
  const retry = document.createElement("button")

  retry.innerText = "Try again"
  retry.onclick = () => {
    window.location.reload()
  }
  message.appendChild(retry)
}

export function restart(
  main: HTMLElement,
  xs: number[][],
  container: HTMLElement
) {
  clearBoard(main)
  render(main, xs, container)
}

import { doubleSameSibling, hasSameSibling, transpose } from "./tools"
import { Cells, chain, id } from "./utils"

export const reverse = <T>(xs: T[]) => xs.slice().reverse()
export const reverse2d = <T>(xs: T[][]) => xs.map(reverse)
export const iArray = <T>(x: T[]) => Array.from(x)
export const immutableArray = <T>(xs: T[][]) => xs.map((x) => Array.from(x))
export const double2d = (xs: Cells) => xs.map(doubleSameSibling)

export const moveLeft = (xs: Cells) => chain(xs).map(double2d).fold(id)

export const moveRight = (xs: Cells) =>
  chain(xs).map(reverse2d).map(double2d).map(reverse2d).fold(id)

export const moveUp = (xs: Cells): Cells =>
  chain(xs).map(transpose).map(moveLeft).map(transpose).fold(id)

export const moveDown = (xs: Cells): Cells =>
  chain(xs).map(transpose).map(moveRight).map(transpose).fold(id)

export const canMoveHorizontally = (xs: Cells): boolean =>
  Array.from(xs)
    .map((x) => {
      return hasSameSibling(x)
    })
    .filter((x) => x === true).length !== 0
export const canMoveVertically = (xs: Cells) =>
  canMoveHorizontally(transpose(Array.from(xs)))

export const hasEmptyZeros = (xs: Cells) =>
  xs.flat().find((cell) => cell.value === 0)?.value !== 0

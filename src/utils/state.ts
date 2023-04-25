import { transpose } from "./tools"

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

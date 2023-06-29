import { chain, id } from "./tools"
import { double2d, reverse2d, transpose } from "./utils"

export const moveLeft = (xs: number[][]) => chain(xs).map(double2d).fold(id)

export const moveRight = (xs: number[][]) =>
  chain(xs).map(reverse2d).map(double2d).map(reverse2d).fold(id)

export const moveUp = (xs: number[][]): number[][] =>
  chain(xs).map(transpose).map(moveLeft).map(transpose).fold(id)

export const moveDown = (xs: number[][]): number[][] =>
  chain(xs).map(transpose).map(moveRight).map(transpose).fold(id)

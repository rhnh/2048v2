import { Cell } from "./board"

declare global {
  var globalScore: number
  var globalCells: number[][]
  var globalColors: Partial<Cell>[]
  var bgColors: string[]
  var fontColors: string[]
}

globalThis.globalScore = 0
globalThis.globalColors = []
globalThis.fontColors = ["#776E65"]
globalThis.bgColors = [
  "#bbada0",
  "#eee4da",
  "#eee1c9",
  "#f3b27a",
  "#f69664",
  "#f77c5f",
  "#f75f3b",
  "#edd073",
  "#75a7f1",
  "#4585f2",
  "#edcf72",
  "#edc53f",
]

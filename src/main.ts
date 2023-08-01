import "./style.css"
import { createBoardElement, renderBoard } from "./layout/board"
import { fillMoreCells, generateEmptyCells } from "./tools/tools"
import { buttonBar } from "./layout/components"
import { header } from "./layout/header"
import { Status } from "./tools/utils"
/**
 * TODO:
 * add board inside container
 * TODO modal inside container not board
 */
const base = 2
const target = Math.pow(2, 2)

declare global {
  var globalScore: number
  var globalCells: string
  var globalBase: number // this is need to track the level base value
  var bgColors: string[]
  var isPlaying: Status
}

const colors = [
  "#ccc0b3",
  "#eee4da",
  "#ede0c8",
  "#f2b179",
  "#f59563",
  "#f67c5f",
  "#f65e3b",
  "#edcf72",
  "#edcc61",
  "#edc850",
  "#ed2e2e",
  "#8ecae6",
  "#219ebc",
]

globalThis.globalScore = 0
globalThis.globalBase = base

const board = createBoardElement({ boardSize: 4 })

const cells = fillMoreCells({
  cells: generateEmptyCells(4),
  base,
  isInitial: true,
  total: 2,
})

document.body.append(
  header(0, cells),
  board,
  buttonBar({ board, cells, colors, base, target }),
)
renderBoard({ cells, board, state: "idle", base, colors, target })

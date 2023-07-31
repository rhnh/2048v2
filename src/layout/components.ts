import * as lib from "./lib"
import { Cells, chain, id } from "../tools/utils"
import { createElement } from "./utils"

const createButtonBar = (buttons: HTMLButtonElement[]) =>
  chain(createElement("article")("button-bar"))
    .map((bar: HTMLElement) => {
      bar.style.display = "flex"
      return bar
    })
    .map((bar: HTMLElement) => {
      bar.append(...buttons)
      return bar
    })
    .fold(id)

export const buttonBar = ({
  board,
  cells,
  base,
  colors,
  target,
}: {
  board: HTMLElement
  cells: Cells
  base: number
  colors: string[]
  target: number
}) =>
  createButtonBar([
    lib.restartBtn("bar restart-bar-btn"),
    lib.colorCustomization({
      board,
      cells,
      base,
      colors,
      className: "setting-bar",
      target,
    }),
    lib.rulesBtn({
      board,
      cells,
      base,
      colors,
      className: "setting-bar",
      target,
    }),
    lib.creditsBtn({
      board,
      cells,
      base,
      colors,
      className: "setting-bar",
      target,
    }),
  ])

export const selectBoard = ({
  board,
  cells,
  base,
  colors,
  target,
}: {
  board: HTMLElement
  cells: Cells
  base: number
  colors: string[]
  target: number
}) =>
  lib.createSelectBoard(board)([
    lib.centerWrapper(
      lib.boardSize4x4({
        board,
        cells,
        btnLabel: "4x4",
        base,
        colors,
        target,
      }),
    ),
    lib.centerWrapper(
      lib.boardSize6x6({ board, cells, btnLabel: "6x6", base, colors, target }),
    ),
    lib.centerWrapper(
      lib.boardSize8x8({ board, cells, btnLabel: "8x8", base, colors, target }),
    ),
    // lib.centerWrapper(lib.restartBtn("setting selection-restart")),
    lib.centerWrapper(
      lib.colorCustomization({
        board,
        cells,
        base,
        colors,
        className: "setting",
        target,
      }),
    ),
    lib.centerWrapper(
      lib.rulesBtn({
        board,
        cells,
        base,
        colors,
        className: "setting",
        target,
      }),
    ),

    lib.centerWrapper(
      lib.creditsBtn({
        board,
        cells,
        base,
        colors,
        className: "setting",
        target,
      }),
    ),
  ])

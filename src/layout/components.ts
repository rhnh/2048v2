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
}: {
  board: HTMLElement
  cells: Cells
  base: number
  colors: string[]
}) =>
  createButtonBar([
    lib.restartBtn("bar restart-bar-btn"),
    lib.colorCustomization({
      board,
      cells,
      base,
      colors,
      className: "setting-bar",
    }),
    lib.rulesBtn({
      board,
      cells,
      base,
      colors,
      className: "setting-bar",
    }),
    lib.creditsBtn({
      board,
      cells,
      base,
      colors,
      className: "setting-bar",
    }),
  ])

export const selectBoard = ({
  board,
  cells,
  base,
  colors,
}: {
  board: HTMLElement
  cells: Cells
  base: number
  colors: string[]
}) =>
  lib.createSelectBoard(board)([
    lib.centerWrapper(
      lib.boardSize4x4({
        board,
        cells,
        btnLabel: "4x4",
        base,
        colors,
      }),
    ),
    lib.centerWrapper(
      lib.boardSize6x6({
        board,
        cells,
        btnLabel: "6x6",
        base,
        colors,
      }),
    ),
    lib.centerWrapper(
      lib.boardSize8x8({ board, cells, btnLabel: "8x8", base, colors }),
    ),
    // lib.centerWrapper(lib.restartBtn("setting selection-restart")),
    lib.centerWrapper(
      lib.colorCustomization({
        board,
        cells,
        base,
        colors,
        className: "setting",
      }),
    ),
    lib.centerWrapper(
      lib.rulesBtn({
        board,
        cells,
        base,
        colors,
        className: "setting",
      }),
    ),

    lib.centerWrapper(
      lib.creditsBtn({
        board,
        cells,
        base,
        colors,
        className: "setting",
      }),
    ),
  ])

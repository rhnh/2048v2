import { Cell, Status, renderBoard } from "./board"
import { getColorShade } from "./colors"
import { Modal } from "./modal"

import { chain, createElement, id } from "./tools"
import { clearBoard, fillCells, generate2DArray } from "./utils"
type EventActionFn = (this: GlobalEventHandlers, ev: MouseEvent) => any

export const createButtonWithAction = (
  label: string,
  className: string,
  action?: EventActionFn,
): HTMLButtonElement =>
  chain(createElement("button")(className))
    .map((btn: HTMLButtonElement) => {
      btn.innerText = label
      return btn
    })
    .map((btn: HTMLButtonElement) => {
      if (action) btn.onclick = action
      return btn
    })
    .fold(id)

export const selectBoardSize =
  (board: HTMLElement, cells: number[][], btnLabel: string) =>
  (boardSize: number) =>
    createButtonWithAction(btnLabel, "play", () => {
      clearBoard(board)
      cells = generate2DArray(boardSize)
      cells = fillCells(cells, true)(boardSize / 2)
      clearBoard(board)
      renderBoard({ board, cells, state: "playing" })
    })

export const boardSize4x4 = (
  board: HTMLElement,
  cells: number[][],
  btnLabel: string,
) => selectBoardSize(board, cells, btnLabel)(4)
export const boardSize8x8 = (
  board: HTMLElement,
  cells: number[][],
  btnLabel: string,
) => selectBoardSize(board, cells, btnLabel)(8)
export const boardSize6x6 = (
  board: HTMLElement,
  cells: number[][],
  btnLabel: string,
) => selectBoardSize(board, cells, btnLabel)(6)

export const centerWrapper = (child: HTMLElement): HTMLElement =>
  chain(createElement("div")("wrapper"))
    .map((div: HTMLElement) => {
      div.style.display = "flex"
      div.style.justifyContent = "center"
      div.style.alignItems = "center"
      div.appendChild(child)
      return div
    })
    .fold(id)

export const selectorBoard = (board: HTMLElement, cells: number[][]) =>
  chain(createElement("article")("start-selector"))
    .map((article: HTMLElement) => {
      article.style.position = "absolute"
      article.style.display = "grid"
      article.style.gridTemplateColumns = "repeat(2,1fr)"
      article.style.gridTemplateRows = "repeat(3,1fr)"
      article.style.width = "100%"
      article.style.height = "100%"
      board.appendChild(article)
      return article
    })
    .map((article: HTMLElement) => {
      article.append(
        centerWrapper(boardSize4x4(board, cells, "4x4")),
        centerWrapper(boardSize6x6(board, cells, "6x6")),
        centerWrapper(boardSize8x8(board, cells, "8x8")),
        centerWrapper(restartBTN()),
        centerWrapper(displayColorSelectors(board, cells, "idle")),
        centerWrapper(displayRules(board, cells, "idle")),
      )
      return article
    })
    .fold(id)

const restartBTN = () =>
  createButtonWithAction("Restart", "restart-button", () => {
    window.location.reload()
  })

const displayColorSelectors = (
  board: HTMLElement,
  cells: number[][],
  state: Status,
) =>
  createButtonWithAction("Customize", "restart-button", () => {
    Modal({
      board,
      cells: globalThis.globalCells ?? cells,
      state,
      visibility: "visible",
    })([
      colorBox(6, "three"),
      colorBox(3, "two"),
      colorBox(1, "one"),
      colorBox(9, "three"),
      colorBox(12, "three"),
      colorBox(15, "three"),
      colorBox(18, "three"),
    ])
  })

const displayRules = (board: HTMLElement, cells: number[][], state: Status) =>
  createButtonWithAction("Rules", "restart-button", () => {
    Modal({
      board,
      cells: globalThis.globalCells ?? cells,
      state,
      visibility: "visible",
    })([rulesParagraph])
  })

export const wrapper = (elements: HTMLElement[], className: string) =>
  chain(createElement("article")(className))
    .map((article: HTMLElement) => {
      article.append(...elements)
      return article
    })
    .fold(id)

export const buttonBar = (board: HTMLElement, cells: number[][]) =>
  wrapper(
    [
      displayRules(board, cells, "playing"),
      restartBTN(),
      displayColorSelectors(board, cells, "playing"),
    ],
    "start-bar",
  )

export const generateColor = (
  hex: string,
  cellIndex: number,
  numberOfShades: number,
) => {
  let i = 0
  const shades: Cell[] = []
  if (cellIndex === 0) cellIndex = 1
  while (i < numberOfShades) {
    const shade: Cell = {
      cellValue: Math.pow(2, i + cellIndex),
      color: getColorShade(hex, i),
      backgroundColor: getColorShade(hex, i),
    }

    shades.push(shade)
    i++
  }
  return shades
}
const colorBox = (i: number, className: string): HTMLElement => {
  const article = createElement("article")("colors")
  const colorInput = createElement("input")(`color__input--${className}`)
  colorInput.setAttribute("type", "color")
  colorInput.onchange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const { value } = target
    globalThis.globalColors = globalThis.globalColors.concat(
      generateColor(`${value}`, i, 6),
    )
  }
  article.appendChild(colorInput)
  return article
}

const rulesParagraph = createElement("p")("rules")
rulesParagraph.style.padding = "0"
rulesParagraph.style.margin = "0"
rulesParagraph.style.paddingLeft = "1em"
rulesParagraph.style.marginTop = "1em"
rulesParagraph.innerHTML = `<strong>Press Keys</strong>    <br/><br/>
  Use Arrow keys, Vim keys or gaming keys  <br/><br/>
   &ensp;Left: "Arrow Left" or "a" or "j" <br/>
   &ensp;Right: "Arrow Right" "d" or "l"<br/>
   &ensp;Down: "Arrow Down" or "s" or "k"<br/>
   &ensp;up: "Arrow up" or "w" or "k"  <br/>
   <br/>
  <strong>Rules</strong>
  <br/>
  If you reach 2048 in 4x4,
  <br/> 3072 in 6x6,
  <br/> 4096 in 8x8.
  <br/> You will win! &emsp;
  <strong>
  Good luck
  </strong>
`

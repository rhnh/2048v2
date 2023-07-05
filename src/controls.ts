import { Status, initialBoard } from "./board"
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
  (board: HTMLElement, cells: number[][]) => (boardSize: number) =>
    createButtonWithAction("Play: 4x4", "play", () => {
      clearBoard(board)
      cells = generate2DArray(boardSize)
      cells = fillCells(cells, true)(boardSize / 2)
      clearBoard(board)
      initialBoard({ board, cells, state: "playing" })
    })

export const boardSize4x4 = (board: HTMLElement, cells: number[][]) =>
  selectBoardSize(board, cells)(4)
export const boardSize8x8 = (board: HTMLElement, cells: number[][]) =>
  selectBoardSize(board, cells)(8)
export const boardSize6x6 = (board: HTMLElement, cells: number[][]) =>
  selectBoardSize(board, cells)(6)

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

export const startSelector = (board: HTMLElement, cells: number[][]) =>
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
        centerWrapper(boardSize4x4(board, cells)),
        centerWrapper(boardSize6x6(board, cells)),
        centerWrapper(boardSize8x8(board, cells)),
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
  createButtonWithAction("Colors", "restart-button", () => {
    Modal({ board, cells: globalThis.globalCells ?? cells, state })([
      createButtonWithAction("hoho", "sds"),
    ])
  })

const rules = createElement("p")("rules")

rules.innerHTML = `<strong>Press Keys</strong> <br/><br/> 
  1. Arrow keys <br/>
  2. vim keys <br/> 
  3. a,w,s,d to move Left, up, down and right
  <br/>
  <br/>
  <strong>Rules</strong>
  <br/>
  If you reach 2048 in 4x4,
  <br/> 3072 in 6x6,
  <br/> 4096 in 8x8.
  <br/> You will win! <br/>
  <br/>
  <strong>
  Good luck
  </strong>
`
const displayRules = (board: HTMLElement, cells: number[][], state: Status) =>
  createButtonWithAction("Rules", "restart-button", () => {
    Modal({ board, cells: globalThis.globalCells ?? cells, state })([rules])
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

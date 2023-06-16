import { game } from "./game"
import {
  boardStyle,
  clearBoard,
  fillCells,
  generate2DArray,
  render,
} from "./tools"
// export const boardLayout = (board: HTMLElement, boardSize: number) => {
//   board.style.display = "grid"
//   board.style.position = "relative"
//   const gridStyle = `100px `.repeat(boardSize)
//   board.style.gridTemplateColumns = gridStyle
//   board.style.gridTemplateRows = gridStyle
//   board.style.gap = "1px"
// }
// export function createButton(title: string): HTMLButtonElement {
//   const button = document.createElement("button")
//   button.className += `btn-${title.toLowerCase().replaceAll(" ", "-")}`
//   button.innerHTML = title
//   return button
// }

// export function baseLayout() {
//   const arena = document.createElement("article")
//   const board = document.createElement("article")
//   const messageBoard = document.createElement("article")
//   const container = document.createElement("article")
//   const title = document.createElement("p")
//   title.innerHTML = "Game 2048"
//   board.className += "board"
//   arena.className += "arena"
//   container.className += "container"
//   messageBoard.className += "messageBoard"
//   container.appendChild(title)
//   document.body.appendChild(container)
//   container.appendChild(messageBoard)
//   container.appendChild(arena)
// }

// export function layout() {}
// export function setting() {}

export const createElement =
  (tag: keyof HTMLElementTagNameMap) =>
  (className: string): HTMLElement => {
    const el = document.createElement(tag)
    el.className += ` ${className}`
    return el
  }

export function boardLayout(): HTMLElement {
  const arena = createArticle("arena")

  return arena
}
export const createStartButton =
  ({
    board,
    cells,
    messageBoard,
    plate,
  }: {
    messageBoard: HTMLElement
    plate: HTMLElement
    cells: number[][]
    board: HTMLElement
  }) =>
  (boardSize: number, label: string): HTMLButtonElement => {
    const button = createButton("btn-start") as unknown as HTMLButtonElement
    button.innerHTML = label
    button.addEventListener("click", () => {
      board.removeChild(plate)
      clearBoard(board)

      boardStyle(board, boardSize)
      cells = generate2DArray(boardSize)
      cells = fillCells(cells, true)(boardSize / 2)
      console.log(cells)
      render({ cells, board })
      game({ state: "playing", cells, messageBoard, board })
    })

    return button
  }

const createArticle = createElement("article")
const createButton = createElement("button")

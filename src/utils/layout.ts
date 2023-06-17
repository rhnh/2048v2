import { game } from "./game"
import {
  boardStyle,
  clearBoard,
  fillCells,
  generate2DArray,
  render,
} from "./tools"

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

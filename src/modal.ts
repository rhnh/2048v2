import { Status, initialBoard } from "./board"
import { createElement } from "./tools"
import { clearBoard } from "./utils"

export const Modal =
  ({
    board,
    cells,
    state,
  }: {
    board: HTMLElement
    cells: number[][]
    state: Status
  }) =>
  (elements: HTMLElement[]): HTMLElement => {
    clearBoard(board)
    const modal = createElement("article")("modal")
    modal.style.position = "absolute"
    modal.style.width = "100%"
    board.appendChild(modal)
    const closeButton = createElement("button")("modal__close")
    closeButton.innerText = "x"
    modal.appendChild(closeButton)
    console.log(state, "state")
    closeButton.onclick = () => {
      clearBoard(board)
      initialBoard({ cells, board, state })
    }
    modal.append(...elements)
    return board
  }

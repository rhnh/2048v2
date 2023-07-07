import { Status, renderBoard } from "./board"
import { createElement } from "./tools"
import { clearBoard } from "./utils"

export const Modal =
  ({
    board,
    cells,
    state,
    visibility,
  }: {
    board: HTMLElement
    cells: number[][]
    state: Status
    visibility: "hidden" | "visible"
  }) =>
  (elements: HTMLElement[]): HTMLElement => {
    clearBoard(board)
    const modal = createElement("article")("modal")
    modal.style.position = "absolute"
    modal.style.width = "100%"
    modal.style.visibility = visibility
    board.appendChild(modal)

    const closeButton = createElement("button")("modal__close")
    closeButton.innerText = "x"
    modal.appendChild(closeButton)
    closeButton.onclick = () => {
      clearBoard(board)
      renderBoard({ cells, board, state })
    }
    modal.append(...elements)
    return board
  }

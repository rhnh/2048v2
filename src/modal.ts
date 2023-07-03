import { renderCells } from "./board"
import { createElement } from "./tools"
import { clearBoard } from "./utils"

export const Modal =
  (board: HTMLElement) =>
  (elements: HTMLElement[]): HTMLElement => {
    clearBoard(board)
    const modal = createElement("article")("modal")
    board.appendChild(modal)

    const closeButton = createElement("button")("modal__close")
    closeButton.innerText = "x"
    modal.appendChild(closeButton)
    closeButton.onclick = () => {
      clearBoard(board)
      renderCells(board, globalThis.globalCells)
    }
    modal.append(...elements)
    return board
  }

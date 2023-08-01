import { removeChildren, renderBoard } from "./board"
import { Cells, Status, chain, id } from "../tools/utils"
import { EventActionFn, createElement } from "./utils"

export const Modal =
  ({
    board,
    cells,
    state,
    visibility,
    onClose,
    className,
    colors,
    base,
    showOnClose = true,
    target,
  }: {
    board: HTMLElement
    cells: Cells
    state: Status
    visibility: "hidden" | "visible"
    onClose?: EventActionFn
    className?: string
    colors: string[]
    base: number
    showOnClose: boolean
    target: number
  }) =>
  (elements: HTMLElement[]): HTMLElement =>
    chain(createElement("article")("modal"))
      .map((modal: HTMLElement) => {
        //design
        modal.className += ` ${className ?? ""}`
        modal.style.zIndex = "100000"
        modal.style.position = "absolute"
        modal.style.width = "100%"
        modal.style.visibility = visibility
        return modal
      })
      .map((modal: HTMLElement) => {
        //functionality
        if (!showOnClose) return modal
        const closeButton = createElement("button")("modal-close")
        closeButton.innerText = "x"
        modal.appendChild(closeButton)

        if (onClose) {
          closeButton.onclick = onClose
        }
        closeButton.onclick = () => {
          board.removeChild(modal)
          removeChildren(board)
          if (
            Number(globalThis.globalScore) >
            Number(localStorage.getItem("best-score"))
          ) {
            localStorage.setItem("best-score", `${globalThis.globalScore}`)
          }
          renderBoard({ cells, board, state, colors, base, target })
        }
        return modal
      })
      .map((modal: HTMLElement) => {
        //children
        modal.append(...elements)
        return modal
      })
      .map((modal: HTMLElement) => {
        removeChildren(board) // clean the board first
        board.append(modal)
        return modal
      })
      .fold(id)

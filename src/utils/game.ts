import { empty, isGameOver } from "./state"

import {
  fillOneCell,
  isEqual,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  render,
  gameOver,
  print,
  rmPreviousChildNodes,
  restart,
} from "./tools"

export function game(
  container: HTMLElement,
  board: HTMLElement,
  cells: number[][],
  state: "playing" | "idle" | "finished"
) {
  addEventListener("keydown", (event: KeyboardEvent) => {
    console.log(state)
    if (event.key === "r") {
      state = "idle"
      cells = empty(cells)
      print(cells)
      rmPreviousChildNodes(container)
      cells = fillOneCell(cells, true)
      cells = fillOneCell(cells, true)
      restart(board, cells, container)
      return
    }
    if (state === "finished" || (isGameOver(cells) && event.key !== "r")) return
    if (event.key === "ArrowUp") {
      rmPreviousChildNodes(board)
      const temp = fillOneCell(moveUp(cells))
      cells = temp
      if (isEqual(temp, cells)) {
        if (isGameOver(cells)) state = "finished"
        render(board, cells, container)
        if (state === "finished" || isGameOver(cells)) {
          gameOver(container)
          return
        }
      }
    }
    if (event.key === "ArrowLeft") {
      rmPreviousChildNodes(board)
      const temp = fillOneCell(moveLeft(cells))
      cells = temp
      if (isEqual(temp, cells)) {
        if (isGameOver(cells)) state = "finished"
        render(board, cells, container)
        if (state === "finished" || isGameOver(cells)) {
          gameOver(container)
          return
        }
      }
    }
    if (event.key === "ArrowRight") {
      rmPreviousChildNodes(board)
      const temp = fillOneCell(moveRight(cells))
      cells = temp
      if (isEqual(temp, cells)) {
        if (isGameOver(cells)) state = "finished"
        render(board, cells, container)
        if (state === "finished" || isGameOver(cells)) {
          gameOver(container)
          return
        }
      }
    }
    if (event.key === "ArrowDown") {
      rmPreviousChildNodes(board)
      const temp = fillOneCell(moveDown(cells))
      cells = temp
      if (isEqual(temp, cells)) {
        if (isGameOver(cells)) state = "finished"
        render(board, cells, container)
        if (state === "finished" || isGameOver(cells)) {
          gameOver(container)
          return
        }
      }
    }
  })
}

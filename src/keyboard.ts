import { moveDown, moveLeft, moveRight, moveUp } from "./move"
//#########################################################

const matchedKey = (keys: string[], pressedKey: string): boolean =>
  keys.indexOf(pressedKey) !== -1

export const keyPressedMovements = (draw: Function) => {
  addEventListener("keydown", (e: KeyboardEvent) => {
    if (matchedKey(["ArrowDown", "s", "j"], e.key)) draw(moveDown)
    if (matchedKey(["ArrowUp", "w", "k"], e.key)) draw(moveUp)
    if (matchedKey(["ArrowLeft", "a", "h"], e.key)) draw(moveLeft)
    if (matchedKey(["ArrowRight", "d", "l"], e.key)) draw(moveRight)
    if (e.key === "r") window.location.reload()
  })
}
export const mobileTouchOption = (board: HTMLElement, draw: Function) => {
  const touches = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  }
  let direction: "up" | "down" | "right" | "left" | "none"
  board.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault()
      touches.x1 = e.touches[0].clientX
      touches.y1 = e.touches[0].clientY
    },
    { passive: false },
  )
  board.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault()
      touches.x2 = e.changedTouches[0].clientX
      touches.y2 = e.changedTouches[0].clientY
    },
    { passive: false },
  )
  board.addEventListener("touchend", () => {
    const x = touches.x2 - touches.x1
    const y = touches.y2 - touches.y1
    const dy = Math.abs(y)
    const dx = Math.abs(x)
    if (Math.max(dy, dx) > 50) {
      direction = dx > dy ? (x > 0 ? "right" : "left") : y < 0 ? "up" : "down"
    }
    if (direction === "down") draw(moveDown)
    if (direction === "up") draw(moveUp)
    if (direction === "left") draw(moveLeft)
    if (direction === "right") draw(moveRight)
  })
}

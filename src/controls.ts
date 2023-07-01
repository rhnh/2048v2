import { chain, createElement, id } from "./tools"

export const restartBtn = chain(createElement("button")("control__setting"))
  .map((btn: HTMLButtonElement) => {
    btn.onclick = () => {
      window.location.reload()
    }
    return btn
  })
  .map((btn: HTMLButtonElement) => {
    btn.innerText = "Restart"
    return btn
  })
  .fold(id)

const color = (board: HTMLElement) =>
  chain(createElement("button")("control__color"))
    .map((btn: HTMLButtonElement) => {
      btn.innerHTML = "Change colors"
      return btn
    })
    .map((btn: HTMLButtonElement) => {
      btn.onclick = () => {
        if (board.querySelector(".options") !== null) {
          return
        }
        board.appendChild(options(board))
      }
      return btn
    })
    .fold(id)

const rules = (board: HTMLElement) =>
  chain(createElement("button")("control__color"))
    .map((btn: HTMLButtonElement) => {
      btn.innerHTML = "Rules"
      return btn
    })
    .map((btn: HTMLButtonElement) => {
      btn.onclick = () => {
        if (board.querySelector(".options") !== null) {
          return
        }
        const child = options(board)
        board.appendChild(child)
      }
      return btn
    })
    .fold(id)

export const renderControl = (board: HTMLElement) => {
  const article = createElement("article")("control")
  const restart = restartBtn
  article.append(restart, color(board), rules(board))
  return article
}

const options = (board: HTMLElement) => {
  const options = createElement("article")("options")

  const close = createElement("button")("options__close")
  close.innerText = "x"
  close.onclick = () => {
    board.removeChild(options)
  }

  options.appendChild(close)

  return options
}

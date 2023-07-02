import { boardStyle, renderCells, renderBoard } from "./board"
import { chain, createElement, id } from "./tools"
import { fillCells, generate2DArray } from "./utils"

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
const restartBtn2 = chain(createElement("button")("control__setting"))
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
      btn.innerHTML = "Colors"
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
        const p = createElement("p")("options__rules--p")
        p.innerHTML = `<strong>Press Keys</strong> <br/><br/> 
Either Arrow keys <br/>
or vim keys <br/> 
or a,w,s,d to move Left, up, down and right
to move around
<br/>
<br/>
<strong>Rules</strong>
<br/>
If you reach <br/> 2048 in 4x4,
<br/> 4096 in 6x6,
<br/> 8192 in 8x8.
<br/>
 <br/> <strong> You will win!</strong> <br/>
 <br/>
 <strong>
 Good luck
 </strong>
`
        const child = options(board)
        child.appendChild(p)
        board.appendChild(child)
      }
      return btn
    })
    .fold(id)

export const renderControl = (board: HTMLElement) => {
  const article = createElement("article")("control")

  article.append(restartBtn2, color(board), rules(board))
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

export const gridSizeOption = (board: HTMLElement): HTMLElement => {
  const options = createElement("article")("start__options")
  options.style.position = "absolute"
  const fourXFour = gridButton(board, 4)
  const sixXSix = gridButton(board, 6)
  const eightXEight = gridButton(board, 6)
  const colorArticle = createElement("article")("start__options--div")
  colorArticle.appendChild(color(board))
  const rulesArticle = createElement("article")("start__options--div")
  rulesArticle.appendChild(rules(board))
  const restartArticle = createElement("article")("start__options--div")
  restartArticle.appendChild(restartBtn)

  options.append(
    fourXFour,
    sixXSix,
    eightXEight,
    restartArticle,
    colorArticle,
    rulesArticle,
  )

  return options
}

const gridButton = (board: HTMLElement, boardSize: number): HTMLElement => {
  const div = createElement("div")("start__options--div")
  const button = chain<HTMLElement>(
    createElement("button")(`grid-button-${boardSize}`),
  )
    .map((btn: HTMLButtonElement) => {
      btn.innerText += `Play ${boardSize}x${boardSize}`
      return btn
    })
    .map((btn: HTMLElement) => {
      btn.onclick = () => {
        let cells = generate2DArray(boardSize)
        cells = fillCells(cells, true)(boardSize / 2)
        renderCells(board, cells)
        boardStyle(board, boardSize)
        renderBoard({ cells, board })
      }
      return btn
    })
    .fold(id)
  div.appendChild(button)
  return div
}

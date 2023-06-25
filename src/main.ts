import "./style.css"
import { chain, id } from "./utils/colors"

import {
  boardStyle,
  createElement,
  createStartButton,
  renderCells,
  renderScore,
} from "./utils/layout"
import { clearBoard, generate2DArray } from "./utils/tools"
globalThis.globalScore = 0
let boardSize = 4
let cells = generate2DArray(boardSize)
let board = createElement("article")("board")
boardStyle(board, boardSize)
const settings = createElement("article")("initials")
const messageBoard = createElement("article")("messageBoard")
const closeDetail = createButton("x", () => {
  clearBoard(settings)
  renderAllButtons()
  detailArea.appendChild(btnDetails)
  settings.appendChild(detailArea)
  settings.classList.remove("initials-close")
  settings.classList.add("initials")
})
closeDetail.className = "close"
const infoElem = createElement("p")("rules-p")

const detailArea = createElement("section")("start-buttons-area")
const container = createElement("article")("container")
const btnDetails = createButton("Details", () => {
  clearBoard(settings)
  settings.classList.remove("initials")
  settings.classList.add("initials-close")
  settings.appendChild(closeDetail)
  settings.appendChild(infoElem)
})
const title = createElement("p")("title")
const target = boardSize * 512

renderAllButtons()

infoElem.innerHTML = `<strong>Press Keys</strong> <br/><br/> 
1. Arrow keys <br/>
2. vim keys <br/> 
3. a,w,s,d to move Left, up, down and right
<br/>
<br/>
<strong>Rules</strong>
<br/>
If you reach 2048 in 4x4,
<br/> 3072 in 6x6,
<br/> 4096 in 8x8.
 <br/> You will win! <br/>
 <br/>
 <strong>
 Good luck
 </strong>
`
infoElem.style.color = "white"
infoElem.style.paddingTop = "1em"
infoElem.style.paddingLeft = "2em"

detailArea.appendChild(btnDetails)

settings.appendChild(detailArea)
board.appendChild(settings)

title.innerHTML = `Game ${target}`

container.appendChild(title)
document.body.appendChild(container)
container.appendChild(messageBoard)
renderScore(messageBoard)
container.appendChild(board)

const restartBtn = createButton("Restart", () => {
  window.location.reload()
})

const infoAreaElem = createElement("article")("end")

const detailInfoBtn = createButton("Details", () => {
  clearBoard(settings)
  settings.classList.remove("initials")
  settings.classList.add("initials-close")
  settings.appendChild(closeDetail)
  settings.appendChild(infoElem)
})

detailInfoBtn.innerHTML = "Details"
infoAreaElem.append(restartBtn, detailInfoBtn)

container.appendChild(infoAreaElem)

renderCells({ board, cells })
function renderAllButtons() {
  renderButton(4, "Play: 4x4")
  renderButton(6, "Play: 6x6")
  renderButton(8, "Play: 8x8")
}
function renderButton(boardSize: number, label: string) {
  const button = createStartButton({
    plate: settings,
    board,
    cells,
    messageBoard,
  })
  const area = createElement("article")("start-buttons-area")
  const btn = button(boardSize, label)
  area.append(btn)
  settings.appendChild(area)
}

function createButton(label: string, fn: Function): HTMLButtonElement {
  const btn = createElement("button")(label)
  return chain(btn)
    .map((btn: HTMLButtonElement) => {
      btn.innerHTML = label
      return btn
    })
    .map((btn: HTMLButtonElement) => {
      btn.addEventListener("click", () => fn())
      return btn
    })
    .fold(id)
}

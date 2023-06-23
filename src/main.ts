import "./style.css"

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
const selectionArea = createElement("article")("initials")
const messageBoard = createElement("article")("messageBoard")
const button = createStartButton({
  plate: selectionArea,
  board,
  cells,
  messageBoard,
})
const smallArea = createElement("section")("start-buttons-area")
const mediumArea = createElement("section")("start-buttons-area")
const hugeArea = createElement("section")("start-buttons-area")
const detailArea = createElement("section")("start-buttons-area")
const container = createElement("article")("container")
const btnDetails = createElement("button")("button")
const title = createElement("p")("title")
const btn4 = button(4, "Play: 4x4")
const btn8 = button(8, "Play: 8x8")
const btn6 = button(6, "Play: 6x6")
const target = boardSize * 512

smallArea.appendChild(btn4)
mediumArea.appendChild(btn6)
hugeArea.appendChild(btn8)

const closeDetail = createElement("button")("close")

closeDetail.innerHTML = "x"
closeDetail.addEventListener("click", () => {
  clearBoard(selectionArea)
  smallArea.appendChild(btn4)
  mediumArea.appendChild(btn6)
  hugeArea.appendChild(btn8)
  detailArea.appendChild(btnDetails)
  selectionArea.classList.remove("initials-close")
  selectionArea.classList.add("initials")
  selectionArea.append(smallArea, mediumArea, hugeArea, detailArea)
})
closeDetail.style.color = "red"
const infoElem = createElement("p")("rules-p")
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
btnDetails.addEventListener("click", () => {
  clearBoard(selectionArea)
  selectionArea.classList.remove("initials")
  selectionArea.classList.add("initials-close")
  selectionArea.appendChild(closeDetail)
  selectionArea.appendChild(infoElem)
})
btnDetails.innerHTML = "Details"
detailArea.appendChild(btnDetails)
selectionArea.appendChild(smallArea)
selectionArea.appendChild(mediumArea)
selectionArea.appendChild(hugeArea)
selectionArea.appendChild(detailArea)
board.appendChild(selectionArea)

title.innerHTML = `Game ${target}`

container.appendChild(title)
document.body.appendChild(container)
container.appendChild(messageBoard)
renderScore(messageBoard)
container.appendChild(board)
const restartBtn = createElement("button")("btn-restart")
restartBtn.addEventListener("click", () => {
  window.location.reload()
})
const infoAreaElem = createElement("article")("end")
const detailInfoBtn = createElement("button")("rules-end")
detailInfoBtn.addEventListener("click", () => {
  clearBoard(selectionArea)
  selectionArea.classList.remove("initials")
  selectionArea.classList.add("initials-close")
  selectionArea.appendChild(closeDetail)
  selectionArea.appendChild(infoElem)
})
detailInfoBtn.innerHTML = "Details"
infoAreaElem.append(restartBtn, detailInfoBtn)
restartBtn.innerHTML = "Restart"
container.appendChild(infoAreaElem)

renderCells({ board, cells })

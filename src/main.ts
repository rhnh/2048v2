import "./style.css"

import { createElement, createStartButton } from "./utils/layout"
import {
  boardStyle,
  clearBoard,
  generate2DArray,
  render,
  renderScore,
} from "./utils/tools"
let boardSize = 4
let cells = generate2DArray(boardSize)

globalThis.globalScore = 0

let board = createElement("article")("board")
boardStyle(board, boardSize)

const initialBoard = createElement("article")("initials")
const messageBoard = createElement("article")("messageBoard")
const button = createStartButton({
  plate: initialBoard,
  board,
  cells,
  messageBoard,
})
const area4 = createElement("section")("start-buttons-area")
const area6 = createElement("section")("start-buttons-area")
const area8 = createElement("section")("start-buttons-area")
const detailArea = createElement("section")("start-buttons-area")
const container = createElement("article")("container")
const btnDetails = createElement("button")("button")
const title = createElement("p")("title")
const btn4 = button(4, "Play: 4x4")
const btn8 = button(8, "Play: 8x8")
const btn6 = button(6, "Play: 6x6")
const target = boardSize * 512

area4.appendChild(btn4)
area6.appendChild(btn6)
area8.appendChild(btn8)

const closeDetail = createElement("button")("close")
closeDetail.innerHTML = "x"
closeDetail.addEventListener("click", () => {
  clearBoard(initialBoard)
  area4.appendChild(btn4)
  area6.appendChild(btn6)
  area8.appendChild(btn8)
  detailArea.appendChild(btnDetails)
  initialBoard.classList.remove("initials-close")
  initialBoard.classList.add("initials")
  initialBoard.append(area4, area6, area8, detailArea)
})
closeDetail.style.color = "red"
const p = createElement("p")("rules-p")
p.innerHTML = `<strong>Press Keys</strong> <br/><br/> 
1. Arrow keys <br/><br/>
2. vim keys <br/><br/> 
3. a,w,s,d to move Left, up, down and right
<br/>
<br/>
<strong>Rules</strong>
<br/>
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
p.style.color = "white"
p.style.paddingTop = "2em"
p.style.paddingLeft = "2em"
btnDetails.addEventListener("click", () => {
  clearBoard(initialBoard)
  initialBoard.classList.remove("initials")
  initialBoard.classList.add("initials-close")
  initialBoard.appendChild(closeDetail)
  initialBoard.appendChild(p)
})
btnDetails.innerHTML = "Rules"
detailArea.appendChild(btnDetails)
initialBoard.appendChild(area4)
initialBoard.appendChild(area6)
initialBoard.appendChild(area8)
initialBoard.appendChild(detailArea)
board.appendChild(initialBoard)

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
const end = createElement("article")("end")
const ruleEnd = createElement("button")("rules-end")
ruleEnd.addEventListener("click", () => {
  clearBoard(initialBoard)
  initialBoard.classList.remove("initials")
  initialBoard.classList.add("initials-close")
  initialBoard.appendChild(closeDetail)
  initialBoard.appendChild(p)
})
ruleEnd.innerHTML = "Rules"
end.append(restartBtn, ruleEnd)
restartBtn.innerHTML = "Restart"
container.appendChild(end)

render({ board, cells })

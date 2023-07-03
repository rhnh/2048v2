import { Modal } from "./modal"
import { chain, createElement, id } from "./tools"
import { print } from "./utils"

const buttonBar = (elements: HTMLElement[]): HTMLElement =>
  chain(createElement("article")("controls"))
    .map((article: HTMLElement) => {
      article.append(...elements)
      return article
    })
    .fold(id)

const restartBtn = chain(createElement("button")("controls__restart"))
  .map((button: HTMLButtonElement) => {
    button.innerText = "Restart"
    return button
  })
  .map((button: HTMLButtonElement) => {
    button.onclick = () => {
      window.location.reload()
    }
    return button
  })
  .fold(id)

const rulesButton = (board: HTMLElement) =>
  chain(createElement("button")("controls__rules--modal"))
    .map((button: HTMLButtonElement) => {
      button.innerText = "rules"
      const p = createElement("p")("controls__p")
      p.innerHTML = `<strong>Press Keys</strong> <br/><br/> 
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
      button.onclick = () => {
        Modal(board)([p])
      }
      return button
    })
    .fold(id)

const colorButton = (board: HTMLElement) =>
  chain(createElement("button")("controls__color--modal"))
    .map((button: HTMLButtonElement) => {
      button.innerText = "Color"
      const p = createElement("p")("controls__p")
      p.innerHTML = `<h1> Themes and Colors</h1>`
      button.onclick = () => {
        Modal(board)([p])
      }
      return button
    })
    .fold(id)

export const controlBar = (board: HTMLElement) =>
  buttonBar([restartBtn, rulesButton(board), colorButton(board)])

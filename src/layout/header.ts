import { getCellWidth } from "../tools/mq"
import { Cells, chain, getScreenWidth, id } from "../tools/utils"
import { createElement } from "./utils"
const showScore = (score: number, className: string, labelText: string) =>
  chain(createElement("section")(`score`))
    .map((section: HTMLElement) => {
      const label = createElement("p")(
        "score-label",
      ) as unknown as HTMLSpanElement
      label.innerText = labelText
      const value = createElement("span")(`${className}`)
      value.innerText = `${score}`
      section.append(label, value)
      return section
    })
    .fold(id)

const currentScore = (score: number) =>
  showScore(score, "current-score", "Score")

const bestScore = () => {
  const res = Number(window.localStorage.getItem("best-score")) ?? 0
  return showScore(res, "best-score", "Best")
}
export const header = (score: number, cells: Cells): HTMLElement =>
  chain(createElement("header")("header"))
    .map((header: HTMLElement) => {
      const title = createElement("h1")("header-title")
      title.innerText = "2048"
      header.appendChild(title)
      return header
    })
    .map((header: HTMLEmbedElement) => {
      header.style.display = "flex"
      header.style.justifyContent = "space-between"
      const screenWidth = getScreenWidth()
      const width = getCellWidth(cells.length, screenWidth)
      header.style.width = `${width * cells.length}px`
      header.style.alignItems = "flex-start"
      return header
    })
    .map((header: HTMLElement) => {
      const div = createElement("div")("score-container")
      div.append(currentScore(score), bestScore())
      header.append(div)
      return header
    })
    .fold(id)

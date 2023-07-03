import { getCellWidth } from "./mq"
import { createElement } from "./tools"

export const renderHeaders = (
  titleLabel: string,
  boardSize: number,
): HTMLElement => {
  const header = createElement("article")("header")
  const screenWidth = window.innerWidth > 0 ? window.innerWidth : screen.width
  const width = getCellWidth(boardSize, screenWidth)
  header.style.width = `${width * boardSize}px`
  const title = createElement("h1")("title")
  title.innerText = titleLabel
  const score = renderScore("score", `${globalThis.globalScore ?? 0}`)
  const bestScore =
    (window.localStorage.getItem("best-score") as unknown as string) ?? "0"
  const best = renderScore("best", bestScore)
  const scoreboard = createElement("article")("scoreboard")
  scoreboard.append(best, score)
  header.append(title, scoreboard)
  return header
}

export const renderScore = (label: string, score: string) => {
  const section = createElement("section")("scores")
  const p = createElement("h4")(`scoreboard__label`)
  p.innerText = label.toUpperCase()
  const scoreTag = createElement("span")(`scoreboard__${label}`)
  scoreTag.innerText += score
  section.append(p, scoreTag)
  return section
}

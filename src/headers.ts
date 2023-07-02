import { createElement } from "./tools"

export const renderHeaders = (titleLabel: string): HTMLElement => {
  const header = createElement("article")("header")
  const title = createElement("p")("title")
  title.innerText = titleLabel
  const section = createElement("section")("header__scoreboard")
  header.append(title, section)
  return header
}

export const renderScore = (label: string, score: string) => {
  const section = createElement("section")("scoreboard")
  const p = createElement("h4")(`scoreboard__label`)
  p.innerText = label.toUpperCase()
  const scoreTag = createElement("span")(`scoreboard__${label}`)
  scoreTag.innerText += score
  section.append(p, scoreTag)
  return section
}

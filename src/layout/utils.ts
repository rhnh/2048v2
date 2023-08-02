import { chain, id } from "../tools/utils"

export type EventActionFn = (this: GlobalEventHandlers, ev: MouseEvent) => any
export const createButton = (
  label: string,
  action: EventActionFn,
  className: string,
) =>
  chain(createElement("button")(className))
    .map((btn: HTMLButtonElement) => {
      btn.innerHTML = label
      return btn
    })
    .map((btn: HTMLButtonElement) => {
      btn.onclick = action
      return btn
    })
    .fold(id)

export const createElement =
  (element: keyof HTMLElementTagNameMap) =>
  (className: string): HTMLElement =>
    chain(document.createElement(element))
      .map((el: HTMLElement) => {
        el.className += className
        return el
      })
      .fold(id)

export const updateCurrentScores = () => {
  const currentScore = document.querySelector(
    ".current-score",
  ) as unknown as HTMLElement
  const value = globalThis.globalScore
  currentScore.innerText = `${value}`
}
export const updateBestScores = () => {
  const currentScore = document.querySelector(
    ".best-score",
  ) as unknown as HTMLElement
  const savedValue = localStorage.getItem("best-score")
  if (savedValue && Number(savedValue) > globalThis.globalScore) {
    currentScore.innerText = `${savedValue}`
  }
  if (!savedValue || savedValue === null) {
    currentScore.innerText = `${0}`
  }
  if (savedValue === null) {
    currentScore.innerText = "0"
    return
  }
  currentScore.innerText = `${savedValue}`
}

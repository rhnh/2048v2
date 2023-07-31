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

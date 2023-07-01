export const id = <T>(x: T): T => x
export const log = (x: unknown) => {
  console.log(x)
  return x
}
export const log2d = (xs: number[][]) => {
  xs.map((x) => console.log(x))
  console.log("")
  return xs
}
export const chain = <T>(x: T) => ({
  map: (f: Function) => chain(f(x)),
  fold: (f: Function) => f(x),
})

export const createElement =
  (tag: keyof HTMLElementTagNameMap) =>
  (className: string): HTMLElement => {
    const element = document.createElement(tag)
    element.className = className
    return element
  }

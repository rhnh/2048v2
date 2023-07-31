export type Cell = {
  id?: number
  value: number
  pValue: number
  color?: string
  backgroundColor?: string
}
export type Cells = Cell[][]

export type Status = "playing" | "idle" | "finished"

export const id = <T>(x: T): T => x
export const log = (x: unknown) => {
  console.info(x)
  return x
}
export const log2d = (xs: Cells) => {
  xs.map((x) => console.info(x))
  console.info("")
  return xs
}
export const chain = <T>(x: T) => ({
  map: (f: Function) => chain(f(x)),
  fold: (f: Function) => f(x),
})

export const print = (c: Cells) => {
  let s = ""
  for (let i = 0; i < c.length; i++) {
    for (let j = 0; j < c.length; j++) {
      s += ` ${c[i][j].value}|${c[i][j].pValue}   `
    }
    s += "\n"
  }
  console.log(s)
}
export const restart = () => {
  if (
    Number(globalThis.globalScore) > Number(localStorage.getItem("best-score"))
  ) {
    localStorage.setItem("best-score", `${globalThis.globalScore}`)
  }
  window.location.reload()
}
export const getScreenWidth = () =>
  window.innerWidth > 0 ? window.innerWidth : screen.width

export const cellsToString = (cells: Cells) =>
  cells.map((d) => d.map((d) => `${d.value}+${d.pValue}`)).toString()

const getLen = (n: number) => {
  let i = 2
  while (i * i < n) {
    i++
  }
  return i
}
export const stringToCells = (str: string) => {
  const firstArray = str.split(",")

  const results: Cells = []
  const f = firstArray.map((values) => {
    const index = values.indexOf("+")
    const value = values.slice(0, index)
    const pValue = values.slice(index + 1)
    const cell: Cell = { value: Number(value), pValue: Number(pValue), id: 0 }
    return cell
  })
  while (f.length) results.push(f.splice(0, getLen(firstArray.length)))
  return results
}

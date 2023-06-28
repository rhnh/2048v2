export const id = <T>(x: T): T => x
export const log = (x: unknown) => {
  console.log(x, "hello")
  return x
}
export const log2d = (xs: number[][]) => {
  xs.map((x) => console.log(x))
  console.log("")
  return xs
}
export const chain = <T>(x: T) => {
  return {
    map: (f: Function) => chain(f(x)),
    fold: (f: Function) => f(x),
  }
}

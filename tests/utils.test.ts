import {
  iReverse,
  zeroLast,
  doubleSame,
  transpose,
  generate2DArray,
} from "../src/utils/tools"
describe("First", () => {
  test("Not mut", () => {
    const arr = [1, 2, 3]
    const fp = iReverse(arr)
    expect(fp).toEqual([3, 2, 1])
    expect(arr).toEqual([1, 2, 3])
  })

  test("zeroLast", () => {
    const arr = [0, 1, 0, 0, 2]
    expect(zeroLast(arr)).toEqual([1, 2, 0, 0, 0])
    expect(arr).toEqual([0, 1, 0, 0, 2])
  })
})

describe("Testing Duplicate", () => {
  test("At the beginning", () => {
    const arr = [4, 4, 4, 2]
    const res = doubleSame(arr)
    expect(res.length).toBe(arr.length)
    expect(res).toEqual([8, 4, 2, 0])
  })
  test("At the beginning and remaining", () => {
    const arr = [4, 4, 2, 2]
    const res = doubleSame(arr)
    expect(res.length).toBe(arr.length)
    expect(res).toEqual([8, 4, 0, 0])
  })
  test("At the beginning and remaining", () => {
    const arr = [2, 2, 0, 2]
    const res = doubleSame(arr)
    expect(res.length).toBe(arr.length)
    expect(res).toEqual([4, 2, 0, 0])
  })
  test("if zeros in the middle ", () => {
    const arr = [2, 0, 2, 0]
    const res = doubleSame(arr)
    expect(res.length).toBe(arr.length)
    expect(res).toEqual([4, 0, 0, 0])
  })
  test("if matched in the middle", () => {
    const arr = [8, 4, 4, 2]
    const res = doubleSame(arr)
    expect(res.length).toBe(arr.length)
    expect(res).toEqual([8, 8, 2, 0])
  })
  test("Don't double 2 matches", () => {
    const arr = [4, 2, 2, 0]
    const res = doubleSame(arr)
    expect(res.length).toBe(arr.length)
    expect(res).toEqual([4, 4, 0, 0])
  })
  test("Three matches", () => {
    const arr = [2, 2, 2, 0]
    const res = doubleSame(arr)
    expect(res.length).toBe(arr.length)
    expect(res).toEqual([4, 2, 0, 0])
  })
})

describe("Transpose", () => {
  test("Basics", () => {
    const xs = [
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
    ]
    expect(transpose(xs)).toEqual([
      [1, 1, 1, 1],
      [2, 2, 2, 2],
      [3, 3, 3, 3],
      [4, 4, 4, 4],
    ])
  })
})

describe("Generate 2d Array containing zeros ", () => {
  const arr = generate2DArray(4)
  test("generate2DArray", () => {
    expect(arr).toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ])
  })
})

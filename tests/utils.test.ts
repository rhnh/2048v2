import { zeroLast, double, transpose, generate2DArray } from "../src/utils"
import { moveDown, moveLeft, moveRight, moveUp } from "../src/move"
describe("First", () => {
  test("zeroLast", () => {
    const arr = [0, 1, 0, 0, 2]
    expect(zeroLast(arr)).toEqual([1, 2, 0, 0, 0])
    expect(arr).toEqual([0, 1, 0, 0, 2])
  })
})

describe("Testing Duplicate", () => {
  test("At the beginning", () => {
    const arr = [4, 4, 4, 2]
    const res = double(arr)
    expect(res.length).toBe(arr.length)
    expect(res).toEqual([8, 4, 2, 0])
  })
  test("At the beginning and remaining", () => {
    const arr = [4, 4, 2, 2]
    const res = double(arr)
    expect(res.length).toBe(arr.length)
    expect(res).toEqual([8, 4, 0, 0])
  })
  test("At the beginning and remaining", () => {
    const arr = [2, 2, 0, 2]
    const res = double(arr)
    expect(res.length).toBe(arr.length)
    expect(res).toEqual([4, 2, 0, 0])
  })
  test("if zeros in the middle ", () => {
    const arr = [2, 0, 2, 0]
    const res = double(arr)
    expect(res.length).toBe(arr.length)
    expect(res).toEqual([4, 0, 0, 0])
  })
  test("if matched in the middle", () => {
    const arr = [8, 4, 4, 2]
    const res = double(arr)
    expect(res.length).toBe(arr.length)
    expect(res).toEqual([8, 8, 2, 0])
  })
  test("Don't double 2 matches", () => {
    const arr = [4, 2, 2, 0]
    const res = double(arr)
    expect(res.length).toBe(arr.length)
    expect(res).toEqual([4, 4, 0, 0])
  })
  test("Three matches", () => {
    const arr = [2, 2, 2, 0]
    const res = double(arr)
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

describe("Movements", () => {
  const xs = [
    [2, 2, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]
  describe("moveLeft", () => {
    test("can move left", () => {
      expect(
        moveLeft([
          [2, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ]),
      ).toEqual([
        [2, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ])
    })
    test("can move left", () => {
      expect(moveLeft(xs)).toEqual([
        [4, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ])
    })
  })
  describe("moveUp", () => {
    test("can move Up", () => {
      expect(moveUp(xs)).toEqual([
        [2, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ])
    })
    test("can move Up and add", () => {
      expect(
        moveUp([
          [4, 0, 0, 0],
          [4, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ]),
      ).toEqual([
        [8, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ])
    })
  })
  describe("moveRight", () => {
    test("can move Right", () => {
      expect(
        moveRight([
          [0, 0, 0, 4],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ]),
      ).toEqual([
        [0, 0, 0, 4],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ])
    })
    test("can move Right and add", () => {
      expect(moveRight(xs)).toEqual([
        [0, 0, 0, 4],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ])
    })
  })

  describe("moving down", () => {
    const xs = [
      [2, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]

    test("can move down", () => {
      const result = moveDown(xs)
      expect(result).toEqual([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [2, 2, 0, 0],
      ])
    })
    test.todo("can move down and add", () => {
      expect(
        moveDown([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [2, 2, 0, 0],
          [2, 2, 0, 0],
        ]),
      ).toEqual([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [4, 4, 0, 0],
      ])
    })
    test.todo("can move down and add 3 rows", () => {
      expect([
        [0, 0, 0, 0],
        [2, 2, 0, 0],
        [2, 2, 0, 0],
        [2, 2, 0, 0],
      ]).toEqual([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [2, 2, 0, 0],
        [4, 4, 0, 0],
      ])
    })
    test.todo("can move down and add 4 rows", () => {
      const xs = [
        [4, 4, 0, 0],
        [4, 4, 0, 0],
        [4, 4, 0, 0],
        [4, 4, 0, 0],
      ]
      const result = moveDown(xs)
      expect(result).toEqual([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [8, 8, 0, 0],
        [8, 8, 0, 0],
      ])
    })
    test.todo("is moveDown immutable", () => {
      expect(xs).toEqual(xs)
    })
  })
})

import {
  canMoveHorizontally,
  canMoveVertically,
  empty,
  hasSiblings,
  isGameOver,
} from "../src/utils"

describe("hasSiblings", () => {
  //Check if the game is finished
  test("should return true, and ignore zeros", () => {
    expect(hasSiblings([12, 11, 1, 12, 121, 0, 0])).toBe(true)
  })
  test("should return true, siblings are same at the end", () => {
    expect(hasSiblings([12, 11, 1, 12, 121, 10, 10])).toBe(true)
  })

  test("should return true, siblings are same at the start", () => {
    expect(hasSiblings([12, 12, 1, 12, 121, 10, 10])).toBe(true)
  })
  test("should return true, zeros  at the start", () => {
    expect(hasSiblings([0, 0, 1, 12, 121, 10, 0])).toBe(true)
  })
  test("should return false, siblings are same at the start", () => {
    expect(hasSiblings([1, 1, 1, 12, 121, 10, 0])).toBe(true)
  })
  test("should return true, siblings are same at the middle", () => {
    expect(hasSiblings([13, 113, 12, 12, 121, 10, 0])).toBe(true)
  })
  test("should return false, siblings are same at the middle", () => {
    expect(hasSiblings([13, 113, 12, 132, 121, 10, 0])).toBe(false)
  })
  test("should return true,because of the zeros", () => {
    expect(hasSiblings([0, 0, 33, 14, 52])).toBe(true)
  })
})

describe("hasDuplicateRows", () => {
  test("rows:Should return true, zeros don't count ", () => {
    expect(
      canMoveHorizontally([
        [0, 0, 33, 14, 52],
        [11, 32, 13, 4, 15],
        [51, 2, 3, 124, 25],
        [61, 23, 13, 4, 5],
      ]),
    ).toBe(true)
  })
  test("rows: Should return true xs[0][0] === xs[0][1] ==1", () => {
    expect(
      canMoveHorizontally([
        [1, 1, 33, 14, 52],
        [11, 32, 13, 4, 15],
        [51, 2, 3, 124, 25],
        [61, 23, 13, 4, 5],
      ]),
    ).toBe(true)
  })
  test("rows: should return true end 5 = 5 ", () => {
    expect(
      canMoveHorizontally([
        [1, 21, 33, 14, 52],
        [11, 32, 13, 4, 15],
        [51, 2, 3, 124, 25],
        [61, 23, 13, 5, 5],
      ]),
    ).toBe(true)
  })
  test("rows:should return true, zeros at the end don't  count", () => {
    expect(
      canMoveHorizontally([
        [1, 21, 33, 14, 52],
        [11, 32, 13, 4, 15],
        [51, 2, 3, 124, 25],
        [61, 23, 13, 0, 0],
      ]),
    ).toBe(true)
  })
})
describe("hasDuplicateColumns", () => {
  test("columns: should return false, no duplicate", () => {
    expect(
      canMoveVertically([
        [0, 0, 33, 14, 52],
        [11, 32, 13, 4, 15],
        [51, 2, 3, 124, 25],
        [61, 23, 13, 4, 5],
      ]),
    ).toBe(false)
  })
  test("columns: no duplicate", () => {
    expect(
      canMoveVertically([
        [1, 2, 33, 14, 52],
        [11, 32, 13, 4, 15],
        [51, 2, 3, 124, 25],
        [61, 23, 13, 4, 5],
      ]),
    ).toBe(false)
  })
  test("example", () => {
    expect(
      canMoveVertically([
        [1, 2, 33, 14, 52],
        [11, 32, 13, 4, 15],
        [51, 2, 3, 124, 25],
        [61, 23, 13, 4, 5],
      ]),
    ).toEqual(false)
  })
})
describe("Game over", () => {
  test("should return true, if no valid moves are available", () => {
    expect(
      isGameOver([
        [1, 2, 33, 14, 52],
        [11, 32, 13, 4, 15],
        [51, 2, 3, 124, 25],
        [61, 23, 13, 4, 5],
      ]),
    ).toBe(true)
  })
  test("should return false, if  valid moves are available, horizontally", () => {
    expect(
      isGameOver([
        [11, 11, 33, 14, 52],
        [12, 32, 13, 4, 15],
        [51, 2, 3, 124, 25],
        [61, 23, 13, 4, 5],
      ]),
    ).toBe(false)
  })
  test("should return false, if  valid moves are available, vertically", () => {
    expect(
      isGameOver([
        [11, 2, 33, 14, 52],
        [11, 32, 13, 4, 15],
        [51, 2, 3, 124, 25],
        [61, 23, 13, 4, 5],
      ]),
    ).toBe(false)
  })
  test("should return false, if zeros", () => {
    expect(
      isGameOver([
        [0, 0, 33, 14, 52],
        [11, 32, 13, 4, 15],
        [51, 2, 3, 124, 25],
        [61, 23, 13, 4, 5],
      ]),
    ).toBe(false)
  })
})

describe("Empty", () => {
  test("Empty", () => {
    expect(
      empty([
        [11, 2, 33, 14, 52],
        [11, 32, 13, 4, 15],
        [51, 2, 3, 124, 25],
        [61, 23, 13, 4, 5],
      ]),
    ).toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ])
  })
})

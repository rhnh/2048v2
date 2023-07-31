import {
  fillMoreCells,
  generateEmptyCells,
  getHightestValue,
} from "../src/tools/tools"

describe("fillMoreCells", () => {
  test("#1  should fill more than one 1 cell", () => {
    const cells = generateEmptyCells(4)
    const xs = fillMoreCells({ cells, isInitial: false, base: 2, total: 4 })
    xs.map((x) => x.map((cell) => cell.value > 0))
    expect(xs.length).toBeGreaterThan(0)
    expect(getHightestValue(xs)).not.toBe(0)
  })

  test("#2 should return", () => {
    const cells = generateEmptyCells(4)
    const xs = fillMoreCells({ cells, isInitial: false, base: 2, total: 4 })
    xs.map((x) => x.map((cell) => cell.value > 0))
    expect(xs.length).toBe(4)
  })
})

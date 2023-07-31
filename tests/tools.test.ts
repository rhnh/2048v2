import {
  fillMoreCells,
  fillOneCell,
  generateEmptyCells,
  getHightestValue,
} from "../src/tools/tools"
import {
  Cells,
  cellsToString,
  chain,
  id,
  stringToCells,
} from "../src/tools/utils"

const boardSize = 4
let cells = generateEmptyCells(boardSize)
describe("fillOneCell", () => {
  test("#1 should return baseValue, because of value is baseValue and initial value it is true for the start of game", () => {
    let baseValue = 2
    const value = getHightestValue(
      fillOneCell({
        cells: generateEmptyCells(boardSize),
        isInitial: true,
        base: 2,
      }),
    )

    expect(value).toBe(2)
    expect(
      getHightestValue(
        fillOneCell({
          cells: generateEmptyCells(boardSize),
          isInitial: true,
          base: boardSize + 1,
        }),
      ),
    ).toBe(boardSize + 1)
  })
  test("#2  should return baseValue or 2*baseValue, because of value is 2 and initial value it is true for the start of game", () => {
    const mockMath = Object.create(global.Math)
    mockMath.random = () => 0.91
    global.Math = mockMath
    let baseValue = 4
    cells = fillOneCell({
      cells: generateEmptyCells(boardSize),
      isInitial: false,
      base: baseValue,
    })

    expect(getHightestValue(cells)).toBe(2 * baseValue)

    expect(
      getHightestValue(
        fillOneCell({
          cells: generateEmptyCells(boardSize),
          isInitial: false,
          base: baseValue,
        }),
      ),
    ).toBe(baseValue * 2)
  })

  test("#3  full, should return the array", () => {
    let cells: Cells = [
      [
        { value: 4, id: 0, pValue: 0 },
        { value: 2, id: 1, pValue: 0 },
        { value: 2, id: 2, pValue: 0 },
        { value: 3, id: 3, pValue: 0 },
      ],
      [
        { value: 4, id: 4, pValue: 0 },
        { value: 2, id: 5, pValue: 0 },
        { value: 2, id: 6, pValue: 0 },
        { value: 7, id: 7, pValue: 0 },
      ],
      [
        { value: 2, id: 8, pValue: 0 },
        { value: 2, id: 9, pValue: 0 },
        { value: 4, id: 10, pValue: 0 },
        { value: 2, id: 11, pValue: 0 },
      ],
      [
        { value: 2, id: 12, pValue: 0 },
        { value: 2, id: 13, pValue: 0 },
        { value: 2, id: 14, pValue: 0 },
        { value: 2, id: 15, pValue: 0 },
      ],
    ]
    cells = fillOneCell({ cells, isInitial: true, base: 2 })
    const cellValue = getHightestValue(cells) !== 0

    expect(cellValue).toBeTruthy()
  })
})

describe("getHightestValue", () => {
  test("#1 should return the hightest value", () => {
    const boardSize = 4
    let cells: Cells = fillOneCell({
      cells: generateEmptyCells(boardSize),
      isInitial: true,
      base: 2,
    })
    expect(getHightestValue(cells)).toBe(2)
    cells[0][3].value = 2048
    expect(getHightestValue(cells)).toBe(2048)
  })
})
const str4 = "0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,8+-1,0+0"
const str6 =
  "4+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0"
const str8 =
  "4+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0,0+0"
describe("cellsToString", () => {
  test("should make a string of all cell values", () => {
    const cellString = cellsToString(cells)
    expect(cellString).toBe(str4)
    expect(typeof cellString === "string").toBeTruthy()
  })

  test("should make a string of all cell values", () => {
    const cells = generateEmptyCells(6)
    cells[0][0].value = 4
    const cellString = cellsToString(cells)
    expect(cellString).toBe(str6)
    expect(typeof cellString === "string").toBeTruthy()
  })
  test("should make a string of all cell values", () => {
    const cells = generateEmptyCells(8)
    cells[0][0].value = 4
    const cellString = cellsToString(cells)
    expect(cellString).toBe(str8)
    expect(typeof cellString === "string").toBeTruthy()
  })
})
describe("stringToCells", () => {
  test("stringToCells 4", () => {
    const cells = generateEmptyCells(4)
    cells[0][0].value = 4
    const cellString = cellsToString(cells)
    expect(stringToCells(cellString).length).toBe(4)
    expect(stringToCells(cellString)).toEqual(cells)
  })
  test("stringToCells 6", () => {
    const cells = generateEmptyCells(6)
    cells[0][0].value = 6
    const cellString = cellsToString(cells)
    expect(stringToCells(cellString).length).toBe(6)
    expect(stringToCells(cellString)).toEqual(cells)
  })
  test("stringToCells 8", () => {
    const cells = generateEmptyCells(8)
    cells[0][0].value = 8
    const cellString = cellsToString(cells)
    expect(stringToCells(cellString).length).toBe(8)
    expect(stringToCells(cellString)).toEqual(cells)
  })
})

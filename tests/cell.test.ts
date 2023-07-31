import {
  reverseCell,
  transpose,
  zeroLast,
  isEqual,
  doubleSameSibling,
  isFulled2d,
  isFulled,
  hasSameSibling,
} from "../src/tools/tools"
import { Cell, Cells } from "../src/tools/utils"

const cells: Cells = [
  [
    { value: 0, id: 0, pValue: 0 },
    { value: 2, id: 1, pValue: 0 },
    { value: 2, id: 2, pValue: 0 },
    { value: 3, id: 3, pValue: 0 },
  ],
  [
    { value: 0, id: 4, pValue: 0 },
    { value: 2, id: 5, pValue: 0 },
    { value: 2, id: 6, pValue: 0 },
    { value: 0, id: 7, pValue: 0 },
  ],
  [
    { value: 2, id: 8, pValue: 0 },
    { value: 2, id: 9, pValue: 0 },
    { value: 0, id: 10, pValue: 0 },
    { value: 2, id: 11, pValue: 0 },
  ],
  [
    { value: 2, id: 12, pValue: 0 },
    { value: 2, id: 13, pValue: 0 },
    { value: 2, id: 14, pValue: 0 },
    { value: 2, id: 15, pValue: 0 },
  ],
]
const cells2 = [
  [
    { value: 0, id: 0, pValue: 0 },
    { value: 0, id: 4, pValue: 0 },
    { value: 2, id: 8, pValue: 0 },
    { value: 2, id: 12, pValue: 0 },
  ],
  [
    { value: 2, id: 1, pValue: 0 },
    { value: 2, id: 5, pValue: 0 },
    { value: 2, id: 9, pValue: 0 },
    { value: 2, id: 13, pValue: 0 },
  ],
  [
    { value: 2, id: 2, pValue: 0 },
    { value: 2, id: 6, pValue: 0 },
    { value: 0, id: 10, pValue: 0 },
    { value: 2, id: 14, pValue: 0 },
  ],
  [
    { value: 3, id: 3, pValue: 0 },
    { value: 0, id: 7, pValue: 0 },
    { value: 2, id: 11, pValue: 0 },
    { value: 2, id: 15, pValue: 0 },
  ],
]

describe("reverseCell", () => {
  test("Should reverse an array of cells", () => {
    const cells: Cell[] = [
      { value: 0, id: 1, pValue: 0 },
      { value: 0, id: 2, pValue: 0 },
      { value: 0, id: 3, pValue: 0 },
    ]
    expect(reverseCell(cells)).toEqual([
      { value: 0, id: 3, pValue: 0 },
      { value: 0, id: 2, pValue: 0 },
      { value: 0, id: 1, pValue: 0 },
    ])
    expect(reverseCell(cells)).not.toEqual(cells)
  })
})
describe("zeroLast", () => {
  test("Should move all the zeros to the last position", () => {
    const cells: Cell[] = [
      { value: 0, id: 3, pValue: 0 },
      { value: 2, id: 1, pValue: 0 },
      { value: 2, id: 2, pValue: 0 },
    ]
    expect(zeroLast(cells)).toEqual([
      { value: 2, id: 1, pValue: 0 },
      { value: 2, id: 2, pValue: 0 },
      { value: 0, id: 3, pValue: 0 },
    ])
    expect(reverseCell(cells)).not.toEqual(cells)
  })
})

describe("transposeCells", () => {
  test("Should transpose Array[][]", () => {
    expect(transpose(cells)).toEqual(cells2)
  })
})

describe("isEqual", () => {
  test("should return true,", () => {
    expect(isEqual(cells, cells)).toBe(true)
    expect(isEqual(cells, cells2)).toBe(false)
  })
})

describe("doubleSame", () => {
  test("should values in same row", () => {
    expect(
      doubleSameSibling([
        { value: 2, id: 0, pValue: 0 },
        { value: 2, id: 1, pValue: 0 },
        { value: 0, id: 2, pValue: 0 },
        { value: 2, id: 3, pValue: 0 },
      ]),
    ).toEqual([
      { value: 4, id: 0, pValue: 2 },
      { value: 2, id: 3, pValue: 0 },
      { value: 0, id: 1, pValue: 0 },
      { value: 0, id: 2, pValue: 0 },
    ])
  })
  test("should return ", () => {
    expect(
      doubleSameSibling([
        { value: 4, id: 0, pValue: 2 },
        { value: 2, id: 3, pValue: 0 },
        { value: 0, id: 1, pValue: 0 },
        { value: 4, id: 2, pValue: 0 },
      ]),
    ).toEqual([
      { value: 4, id: 0, pValue: 0 },
      { value: 2, id: 3, pValue: 0 },
      { value: 4, id: 2, pValue: 0 },
      { value: 0, id: 1, pValue: 0 },
    ])
  })
  test("end", () => {
    expect(
      doubleSameSibling([
        { value: 5, pValue: 0, id: 8 },
        { value: 51, pValue: 0, id: 9 },
        { value: 4, pValue: 0, id: 10 },
        { value: 4, pValue: 0, id: 11 },
      ]),
    ).toEqual([
      { value: 5, pValue: 0, id: 8 },
      { value: 51, pValue: 0, id: 9 },
      { value: 8, pValue: 4, id: 10 },
      { value: 0, pValue: 0, id: 11 },
    ])
  })
})

describe("isFull", () => {
  test("should return false", () => {
    expect(
      isFulled2d([
        [
          { value: 4, id: 0, pValue: 2 },
          { value: 2, id: 3, pValue: 0 },
          { value: 4, id: 2, pValue: 0 },
          { value: 0, id: 1, pValue: 2 },
        ],
      ]),
    ).toBeFalsy()
    expect(
      isFulled2d([
        [
          { value: 4, id: 0, pValue: 2 },
          { value: 2, id: 3, pValue: 0 },
          { value: 4, id: 2, pValue: 0 },
          { value: 2, id: 1, pValue: 2 },
        ],
        [
          { value: 4, id: 0, pValue: 2 },
          { value: 2, id: 3, pValue: 0 },
          { value: 4, id: 2, pValue: 0 },
          { value: 2, id: 1, pValue: 2 },
        ],
        [
          { value: 4, id: 0, pValue: 2 },
          { value: 2, id: 3, pValue: 0 },
          { value: 4, id: 2, pValue: 0 },
          { value: 2, id: 1, pValue: 2 },
        ],
        [
          { value: 4, id: 0, pValue: 2 },
          { value: 2, id: 3, pValue: 0 },
          { value: 0, id: 2, pValue: 0 },
          { value: 2, id: 1, pValue: 2 },
        ],
      ]),
    ).toBeFalsy()
  })
  test("should return true => it is full", () => {
    expect(
      isFulled2d([
        [
          { value: 4, id: 0, pValue: 2 },
          { value: 2, id: 3, pValue: 0 },
          { value: 4, id: 2, pValue: 0 },
          { value: 2, id: 1, pValue: 2 },
        ],
        [
          { value: 4, id: 0, pValue: 2 },
          { value: 2, id: 3, pValue: 0 },
          { value: 4, id: 2, pValue: 0 },
          { value: 2, id: 1, pValue: 2 },
        ],
        [
          { value: 4, id: 0, pValue: 2 },
          { value: 2, id: 3, pValue: 0 },
          { value: 4, id: 2, pValue: 0 },
          { value: 2, id: 1, pValue: 2 },
        ],
        [
          { value: 4, id: 0, pValue: 2 },
          { value: 2, id: 3, pValue: 0 },
          { value: 3, id: 2, pValue: 0 },
          { value: 2, id: 1, pValue: 2 },
        ],
      ]),
    ).toBeTruthy()
  })
})

describe("isFulled", () => {
  test("isFulled", () => {
    const result = isFulled([
      { value: 4, id: 0, pValue: 2 },
      { value: 2, id: 3, pValue: 0 },
      { value: 3, id: 2, pValue: 0 },
      { value: 2, id: 1, pValue: 2 },
    ])
    expect(result).toBe(true)
    expect(
      isFulled([
        { value: 0, id: 0, pValue: 2 },
        { value: 2, id: 3, pValue: 0 },
        { value: 3, id: 2, pValue: 0 },
        { value: 2, id: 1, pValue: 2 },
      ]),
    ).toBe(false)
    expect(
      isFulled([
        { value: 4, id: 0, pValue: 2 },
        { value: 2, id: 3, pValue: 0 },
        { value: 3, id: 2, pValue: 0 },
        { value: 2, id: 1, pValue: 2 },
      ]),
    ).toBe(true)
  })
})

describe("hasSameSibling", () => {
  test("#1 should return true, start", () => {
    expect(
      hasSameSibling([
        { value: 2, pValue: 0, id: 0 },
        { value: 2, pValue: 0, id: 0 },
      ]),
    ).toBeTruthy()
  })

  test("#2 should return false, because not match", () => {
    expect(
      hasSameSibling([
        { value: 4, pValue: 0, id: 0 },
        { value: 2, pValue: 0, id: 0 },
      ]),
    ).toBeFalsy()
  })
  test("#3 should return true, middle", () => {
    expect(
      hasSameSibling([
        { value: 4, pValue: 0, id: 0 },
        { value: 2, pValue: 0, id: 0 },
        { value: 2, pValue: 0, id: 0 },
        { value: 4, pValue: 0, id: 0 },
      ]),
    ).toBeTruthy()
  })
  test("#4 should return true, middle", () => {
    expect(
      hasSameSibling([
        { value: 4, pValue: 0, id: 0 },
        { value: 5, pValue: 0, id: 0 },
        { value: 2, pValue: 0, id: 0 },
        { value: 2, pValue: 0, id: 0 },
      ]),
    ).toBeTruthy()
  })
})

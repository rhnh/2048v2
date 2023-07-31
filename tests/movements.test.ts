import { moveDown, moveLeft, moveRight, moveUp } from "../src/tools/movements"
import { Cells } from "../src/tools/utils"
const data: Cells = [
  [
    { value: 1, pValue: 0, id: 0 },
    { value: 21, pValue: 0, id: 1 },
    { value: 33, pValue: 0, id: 2 },
    { value: 14, pValue: 0, id: 3 },
  ],
  [
    { value: 11, pValue: 0, id: 4 },
    { value: 32, pValue: 0, id: 5 },
    { value: 13, pValue: 0, id: 6 },
    { value: 4, pValue: 0, id: 7 },
  ],
  [
    { value: 5, pValue: 0, id: 8 },
    { value: 51, pValue: 0, id: 9 },
    { value: 4, pValue: 0, id: 10 },
    { value: 4, pValue: 0, id: 11 },
  ],
  [
    { value: 4, pValue: 0, id: 12 },
    { value: 61, pValue: 0, id: 13 },
    { value: 23, pValue: 0, id: 14 },
    { value: 4, pValue: 0, id: 15 },
  ],
]

describe("Movements", () => {
  test("moveLeft", () => {
    expect(moveLeft(data)).toEqual([
      [
        { value: 1, pValue: 0, id: 0 },
        { value: 21, pValue: 0, id: 1 },
        { value: 33, pValue: 0, id: 2 },
        { value: 14, pValue: 0, id: 3 },
      ],
      [
        { value: 11, pValue: 0, id: 4 },
        { value: 32, pValue: 0, id: 5 },
        { value: 13, pValue: 0, id: 6 },
        { value: 4, pValue: 0, id: 7 },
      ],
      [
        { value: 5, pValue: 0, id: 8 },
        { value: 51, pValue: 0, id: 9 },
        { value: 8, pValue: 4, id: 10 },
        { value: 0, pValue: 0, id: 11 },
      ],
      [
        { value: 4, pValue: 0, id: 12 },
        { value: 61, pValue: 0, id: 13 },
        { value: 23, pValue: 0, id: 14 },
        { value: 4, pValue: 0, id: 15 },
      ],
    ])
  })
})
describe("Movements", () => {
  test("moveRight", () => {
    expect(moveRight(data)).toEqual([
      [
        { value: 1, pValue: 0, id: 0 },
        { value: 21, pValue: 0, id: 1 },
        { value: 33, pValue: 0, id: 2 },
        { value: 14, pValue: 0, id: 3 },
      ],
      [
        { value: 11, pValue: 0, id: 4 },
        { value: 32, pValue: 0, id: 5 },
        { value: 13, pValue: 0, id: 6 },
        { value: 4, pValue: 0, id: 7 },
      ],
      [
        { value: 0, pValue: 0, id: 10 },
        { value: 5, pValue: 0, id: 8 },
        { value: 51, pValue: 0, id: 9 },
        { value: 8, pValue: 4, id: 11 },
      ],
      [
        { value: 4, pValue: 0, id: 12 },
        { value: 61, pValue: 0, id: 13 },
        { value: 23, pValue: 0, id: 14 },
        { value: 4, pValue: 0, id: 15 },
      ],
    ])
  })
})

describe("Movements", () => {
  test("moveUp", () => {
    expect(moveUp(data)).toEqual([
      [
        { value: 1, pValue: 0, id: 0 },
        { value: 21, pValue: 0, id: 1 },
        { value: 33, pValue: 0, id: 2 },
        { value: 14, pValue: 0, id: 3 },
      ],
      [
        { value: 11, pValue: 0, id: 4 },
        { value: 32, pValue: 0, id: 5 },
        { value: 13, pValue: 0, id: 6 },
        { value: 8, pValue: 4, id: 7 },
      ],
      [
        { value: 5, pValue: 0, id: 8 },
        { value: 51, pValue: 0, id: 9 },
        { value: 4, pValue: 0, id: 10 },
        { value: 4, pValue: 0, id: 15 },
      ],
      [
        { value: 4, pValue: 0, id: 12 },
        { value: 61, pValue: 0, id: 13 },
        { value: 23, pValue: 0, id: 14 },
        { value: 0, pValue: 0, id: 11 },
      ],
    ])
  })
})
describe("Movements", () => {
  test("moveDown", () => {
    expect(moveDown(data)).toEqual([
      [
        { value: 1, pValue: 0, id: 0 },
        { value: 21, pValue: 0, id: 1 },
        { value: 33, pValue: 0, id: 2 },
        { value: 0, pValue: 0, id: 11 },
      ],
      [
        { value: 11, pValue: 0, id: 4 },
        { value: 32, pValue: 0, id: 5 },
        { value: 13, pValue: 0, id: 6 },
        { value: 14, pValue: 0, id: 3 },
      ],
      [
        { value: 5, pValue: 0, id: 8 },
        { value: 51, pValue: 0, id: 9 },
        { value: 4, pValue: 0, id: 10 },
        { value: 4, pValue: 0, id: 7 },
      ],
      [
        { value: 4, pValue: 0, id: 12 },
        { value: 61, pValue: 0, id: 13 },
        { value: 23, pValue: 0, id: 14 },
        { value: 8, pValue: 4, id: 15 },
      ],
    ])
  })
})

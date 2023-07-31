import { expect } from "./vitest-setup"
import { createCellElement } from "../src/layout/cell"
import { Cell } from "../src/tools/utils"
import { createElement } from "../src/layout/utils"

describe("createCell", () => {
  test("#1 should have be a valid html and have cells ", () => {
    const cell: Cell = { value: 4, pValue: 2, id: 0 }
    const span = createCellElement({ cell, boardSize: 2, base: 2, colors: [] })

    expect(span).toHaveClass("cells")
    expect(span).toBeValid()
    expect(span).toHaveClass("double-cell")
    expect(span).not.toHaveClass("new-cell")
  })
  test("#2 should create a new cell with 'new-cell' class ", () => {
    const cell: Cell = { value: 2, pValue: -1, id: 0 }
    const span = createCellElement({ cell, boardSize: 2, base: 2, colors: [] })
    expect(span).toHaveClass("cells")
    expect(span).toBeValid()
    expect(span).not.toHaveClass("double-cell")
    expect(span).toHaveClass("new-cell")
  })

  test("#3 should create a have only one class ", () => {
    const cell: Cell = { value: 0, pValue: 0, id: 0 }
    const span = createCellElement({ cell, boardSize: 2, base: 2, colors: [] })
    expect(span).toHaveClass("cells")
    expect(span).toBeValid()
    expect(span).not.toHaveClass("double-cell")
    expect(span).not.toHaveClass("new-cell")
  })
})

// describe("generateBoard", () => {
//   test("should generate a 2d Board", () => {
//     const boardSize = 4
//     const cells = generateEmptyCells(boardSize)
//     expect(cells.length).toBe(boardSize)
//     expect(cells[0][0].value).toBeDefined()
//     expect(cells[0][0].value).toBe(0)
//     expect(cells[0][0].pValue).toBe(0)
//     expect(cells[0].length).toBe(boardSize)
//     expect(typeof cells[0][0].value).toBe("number")
//   })
//   test("should generate a 2d Board", () => {
//     const boardSize = 8
//     const cells = generateEmptyCells(boardSize)
//     expect(cells.length).toBe(boardSize)
//     expect(cells[0].length).toBe(boardSize)
//   })
// })

// describe("renderBoard", () => {
//   const board = createElement("article")("board") as unknown as HTMLElement
//   afterEach(() => {
//     removeChildren(board)
//   })
//   test("should render board", async () => {
//     const user = userEvent.setup()
//     const cells = generateEmptyCells(4)
//     cells[0][1].value = 2 // make the two neighboring cells have the same value
//     cells[0][2].value = 2

//     renderBoard({ cells, board, state: "playing" })
//     const span = board.querySelector("span")
//     expect(span).toBeDefined()
//     expect(board).toContainElement(span)

//     user.keyboard("l").then(async (e) => {
//       const spans = Array.from(board.querySelectorAll("span"))
//       const validSpanValue = await spans.filter((e) => e.innerText === "4")[0]
//       expect(validSpanValue).toBeDefined()
//       expect(Number(validSpanValue.innerText)).toBe(4)
//       expect(Number(validSpanValue.innerText)).not.toBe(2)
//     })
//   })
//   test.todo("should render game over if the cells are filled", () => {
//     let cells = generateEmptyCells(4)
//     cells[0][0].value = 323
//     cells[0][1].value = 23
//     cells[0][2].value = 363
//     cells[0][3].value = 233
//     cells[1][0].value = 1323
//     cells[1][1].value = 523
//     cells[1][2].value = 5363
//     cells[1][3].value = 2373
//     cells[2][0].value = 3243
//     cells[2][1].value = 22342343
//     cells[2][2].value = 3434363
//     cells[2][3].value = 265433
//     cells[3][0].value = 323453
//     cells[3][1].value = 23345
//     cells[3][2].value = 363453
//     cells[3][3].value = 23453433
//     renderBoard({ cells, board, state: "playing" })
//     const child = board.querySelector(".game-over") as unknown as HTMLElement
//     expect(board).toContainElement(child)
//   })
// })

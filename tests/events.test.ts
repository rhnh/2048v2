import { renderBoard } from "../src/layout/board"
// query utilities:
import { expect } from "./vitest-setup"
import userEvent from "@testing-library/user-event"
import { print } from "../src/tools/utils"
import { generateEmptyCells, fillOneCell } from "../src/tools/tools"
import { createElement } from "../src/layout/utils"
describe("keyDown events", () => {
  test("up", async () => {
    const user = userEvent.setup()

    const cells = fillOneCell({ cells: generateEmptyCells(4), base: 2 })
    const board = createElement("article")("board")
    renderBoard({ board, cells, state: "idle", base: 2, colors: [] })
    // print(cells)
    await user.keyboard("ArrowUp")
    expect(board).toHaveClass("board")
  })
})

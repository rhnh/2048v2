import {
  Cells,
  cellsToString,
  chain,
  getScreenWidth,
  id,
  restart,
  stringToCells,
} from "../tools/utils"
import { createButton, createElement } from "./utils"
import { Modal } from "./modal"
import { removeChildren, renderBoard } from "./board"
import { fillMoreCells, generateEmptyCells } from "../tools/tools"
import { header } from "./header"
import { buttonBar } from "./components"
import { getCellWidth } from "../tools/mq"

export const restartBtn = (className: string) =>
  createButton("Restart", restart, `restart-btn ${className}`)

export const colorCustomization = ({
  base,
  board,
  colors,
  cells,
  className,
}: {
  board: HTMLElement
  cells: Cells
  base: number
  colors: string[]
  className: string
}) => {
  const btnColors = colors.map((color, i) => colorBox(colors, color, i, base))

  return createButton(
    "Colors",
    () => {
      Modal({
        board,
        cells: globalThis.globalCells
          ? stringToCells(globalThis.globalCells)
          : cells,
        state:
          globalThis.isPlaying && globalThis.isPlaying.length > 0
            ? globalThis.isPlaying
            : "idle",
        visibility: "visible",
        base: globalThis.globalBase,
        colors,
        className: "color-plate",
        showOnClose: true,
      })([
        wrapper(
          [changeBoardColor(board, "board-color"), ...btnColors],
          "color-container",
        ),
      ])
    },
    `${className ?? ""} colors-btn`,
  )
}
const colorBox = (
  colors: string[],
  color: string,
  i: number,
  base: number,
): HTMLElement => {
  const p = createElement("p")("colors")
  const labelTextValue = base !== 2 ? Math.pow(2, i - 1) * base : Math.pow(2, i)
  const colorInput = createElement("input")(`color-input--${labelTextValue}`)
  const label = createElement("label")("color-label")

  label.innerText = `${i === 0 ? "Empty Cell" : labelTextValue}`
  colorInput.setAttribute("type", "color")
  colorInput.setAttribute("value", color)
  colorInput.onchange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const { value } = target

    colors[i] = value
  }
  p.append(label, colorInput)
  return p
}
const changeBoardColor = (board: HTMLElement, className: string) => {
  const p = createElement("p")("colors")
  const colorInput = createElement("input")(`color-input--${className}`)
  colorInput.setAttribute("type", "color")
  colorInput.setAttribute("value", "#bbada0")
  colorInput.onchange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const { value } = target
    board.style.backgroundColor = value
  }
  const label = createElement("label")("color-label")
  label.innerText = "board"
  p.append(label, colorInput)
  return p
}

export const rulesBtn = ({
  base,
  board,
  colors,
  cells,
  className,
}: {
  board: HTMLElement
  cells: Cells
  base: number
  colors: string[]
  className: string
}) =>
  createButton(
    "Rules",
    () => {
      Modal({
        board,
        cells: globalThis.globalCells
          ? stringToCells(globalThis.globalCells)
          : cells,
        state:
          globalThis.isPlaying && globalThis.isPlaying.length > 0
            ? globalThis.isPlaying
            : "idle",
        visibility: "visible",
        base,
        colors,
        showOnClose: true,
      })([rulesParagraph])
    },
    `${className ?? ""} rules-btn`,
  )
export const creditsBtn = ({
  board,
  cells,
  base,
  colors,
  className,
}: {
  base: number
  colors: string[]
  board: HTMLElement
  cells: Cells
  className: string
}) =>
  createButton(
    "Credits",
    () => {
      Modal({
        board,
        cells: globalThis.globalCells
          ? stringToCells(globalThis.globalCells)
          : cells,
        state:
          globalThis.isPlaying && globalThis.isPlaying.length > 0
            ? globalThis.isPlaying
            : "idle",
        visibility: "visible",
        base,
        colors,
        showOnClose: true,
      })([creditsParagraph])
    },
    ` ${className ?? ""} credits-btn,`,
  )

export const rulesParagraph = createElement("p")(
  "rules",
) as unknown as HTMLElement
rulesParagraph.style.padding = "0"
rulesParagraph.style.margin = "0"
rulesParagraph.style.paddingLeft = "1em"
rulesParagraph.style.marginTop = "1em"
rulesParagraph.innerHTML = `<strong>Press Keys</strong>    <br/><br/>
  Use Arrow keys, Vim keys or gaming keys  <br/><br/>
   &ensp;Left: "Arrow Left" or "a" or "j" <br/>
   &ensp;Right: "Arrow Right" "d" or "l"<br/>
   &ensp;Down: "Arrow Down" or "s" or "k"<br/>
   &ensp;up: "Arrow up" or "w" or "k"  <br/>
   <br/>

  &ensp;R: "To Restart the game" </br>
  </br>
  <strong>Rules</strong>
  <br/>
  If you reach 2048 in 4x4,
  <br/> 3072 in 6x6,
  <br/> 4096 in 8x8.
  <br/> You will win! &emsp;
  <strong>
  Good luck
  </strong>
`
const creditsParagraph = createElement("p")("rules") as unknown as HTMLElement
creditsParagraph.style.padding = "0"
creditsParagraph.style.padding = "0"
creditsParagraph.style.margin = "0"
creditsParagraph.style.paddingLeft = "1em"
creditsParagraph.style.marginTop = "1em"
creditsParagraph.innerHTML = `  
<br/>
<h2>2048</h2>
<br/><br/>
This <strong> 2048</strong> Sliding puzzle was published by  <br/>
 <a href="https://github.com/gabrielecirulli/2048"> source code by  Gabriele Cirulli</a>  <br/>
 <br/>
The font <a href="https://www.dafont.com/de/calculator.font">calculator</a> is used from Dafont.com <br/>
<br/>
Here is source Code from this <a href="https://github.com/rhnh/2048v2">repo</a>
`
export const selectBoardSize =
  ({
    board,
    base,
    cells,
    btnLabel,
    colors,
    className,
  }: {
    colors: string[]
    board: HTMLElement
    cells: Cells
    btnLabel: string
    base: number
    className: string
  }) =>
  (boardSize: number) =>
    createButton(
      btnLabel,
      () => {
        globalThis.isPlaying = "playing"
        removeChildren(board)
        cells = fillMoreCells({
          cells: generateEmptyCells(boardSize),
          isInitial: true,
          base,
          total: 2,
        })

        renderBoard({ board, cells, state: "playing", base, colors })
      },
      `play ${className}`,
    )

export const boardSize4x4 = ({
  board,
  cells,
  btnLabel,
  base,
  colors,
}: {
  board: HTMLElement
  cells: Cells
  btnLabel: string
  base: number
  colors: string[]
}) =>
  selectBoardSize({
    board,
    cells,
    btnLabel,
    base,
    colors,
    className: "four",
  })(4)
export const boardSize8x8 = ({
  board,
  cells,
  btnLabel,
  base,
  colors,
}: {
  board: HTMLElement
  cells: Cells
  btnLabel: string
  base: number
  colors: string[]
}) =>
  selectBoardSize({
    board,
    cells,
    btnLabel,
    base,
    colors,
    className: "eight",
  })(8)
export const boardSize6x6 = ({
  board,
  cells,
  btnLabel,
  base,
  colors,
}: {
  board: HTMLElement
  cells: Cells
  btnLabel: string
  base: number
  colors: string[]
}) =>
  selectBoardSize({
    board,
    cells,
    btnLabel,
    base,
    colors,
    className: "six",
  })(6)
export const centeredElement = (element: HTMLElement, cells: Cells) => {
  const screenWidth = getScreenWidth()

  const length = getCellWidth(cells.length, screenWidth)
  element.style.display = "flex"
  element.style.height = `${length * cells.length}px`
  element.style.width = `${length * cells.length}px`
  return element
}
export const wrapper = (elements: HTMLElement[], className: string) =>
  chain(createElement("article")(className))
    .map((wrapper: HTMLElement) => {
      return wrapper
    })
    .map((article: HTMLElement) => {
      article.append(...elements)
      return article
    })
    .fold(id)
export const centerWrapper = (
  child: HTMLElement,
  className?: string,
): HTMLElement =>
  chain(createElement("div")(`wrapper ${className ?? ""}`))
    .map((div: HTMLElement) => {
      div.style.display = "flex"
      div.style.justifyContent = "center"
      div.style.alignItems = "center"
      div.appendChild(child)
      return div
    })
    .fold(id)

export const createSelectBoard =
  (board: HTMLElement) =>
  (buttons: HTMLElement[]): HTMLElement =>
    chain(createElement("article")("selection"))
      .map((article: HTMLElement) => {
        article.style.position = "absolute"
        article.style.display = "grid"
        article.style.gridTemplateColumns = "repeat(2,1fr)"
        article.style.gridTemplateRows = "repeat(3,1fr)"
        article.style.width = "100%"
        article.style.height = "100%"
        board.appendChild(article)
        return article
      })
      .map((selection: HTMLElement) => {
        selection.append(...buttons)
        return selection
      })
      .map((selection: HTMLElement) => {
        board.append(selection)
        return selection
      })
      .fold(id)

const gameOverMessage = (message?: string): HTMLElement =>
  chain(createElement("section")("game-over--message"))
    .map((p: HTMLElement) => {
      p.innerHTML = message ?? "You lost"
      return p
    })
    .fold(id)
const setNewBoard = ({
  cells,
  board,
  base,
  colors,
}: {
  cells: Cells
  board: HTMLElement
  base: number
  colors: string[]
}) => {
  cells = fillMoreCells({
    cells: generateEmptyCells(cells.length),
    total: 2,
    base,
    isInitial: true,
  })
  renderBoard({ cells, board, state: "playing", base, colors })
}

export const renderGameOver = ({
  base,
  board,
  cells,
  colors,
  message,
}: {
  colors: string[]
  board: HTMLElement
  cells: Cells
  base: number
  message?: string
}) =>
  Modal({
    board,
    cells,
    state: "playing",
    visibility: "visible",
    showOnClose: false,
    base,
    colors,
  })([
    centeredElement(
      wrapper(
        [
          gameOverMessage(
            message ??
              `You lost! <br/> You are score <strong> ${globalThis.globalScore} </strong> `,
          ),
          createButton(
            "Try again",
            () => setNewBoard({ board, cells, base: 2, colors }),
            "status-btn try-again-btn",
          ),
        ],
        "game-over",
      ),
      cells,
    ),
  ])

export const nextLevel = ({
  board,
  cells,
  base,
  colors,
}: {
  cells: Cells
  base: number
  board: HTMLElement
  colors: string[]
}) => {
  if (base < 4) {
    return Modal({
      board,
      cells,
      state: "playing",
      visibility: "visible",
      base,
      colors,
      showOnClose: false,
    })([
      centeredElement(
        wrapper(
          [
            tryAgain({ board, cells, colors }),
            nextButton({ base, board, cells, colors }),
          ],
          "next-level",
        ),
        cells,
      ),
    ])
  } else {
    return Modal({
      board,
      cells,
      state: "playing",
      visibility: "visible",
      base,
      colors,
      showOnClose: false,
    })([
      centeredElement(
        wrapper(
          [gameOverMessage("You won"), tryAgain({ board, cells, colors })],
          "next-level",
        ),
        cells,
      ),
    ])
  }
}
export const tryAgain = ({
  board,
  cells,
  colors,
}: {
  board: HTMLElement
  cells: Cells
  colors: string[]
}) =>
  createButton(
    "Try again",
    () => {
      globalThis.isPlaying = "playing"
      setNewBoard({ board, cells, base: 2, colors })
    },
    "status-btn try-again-btn",
  )
export const nextButton = ({
  base,
  cells,
  board,
  colors,
}: {
  base: number
  cells: Cells
  board: HTMLElement
  colors: string[]
}) =>
  chain(createElement("button")("status-btn next-level-btn"))
    .map((btn: HTMLButtonElement) => {
      btn.innerText = "Keep playing"
      if (base > 4 || globalThis.globalBase > 4) {
        btn.disabled = true
        btn.style.display = "none"
      }
      return btn
    })
    .map((btn: HTMLButtonElement) => {
      btn.onclick = () => {
        base = base + 1
        globalThis.globalBase = base
        globalThis.isPlaying = "playing"
        const newCells = generateEmptyCells(cells.length)
        setNewBoard({
          board,
          cells: newCells,
          base,
          colors,
        })
        removeChildren(document.body)
        globalThis.globalCells = cellsToString(newCells)
        document.body.append(
          header(globalThis.globalScore, cells),
          board,
          buttonBar({
            board,
            cells,
            colors,
            base,
          }),
        )
      }

      return btn
    })
    .fold(id)

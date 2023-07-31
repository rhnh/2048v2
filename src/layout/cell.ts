import { getColorShade, getExponent, isPVOfTwo } from "../tools/colors"
import { getCellFontSize } from "../tools/mq"
import { Cell, chain, getScreenWidth, id } from "../tools/utils"
import { createElement } from "./utils"

export function createCellElement({
  cell,
  base,
  boardSize,
  colors,
}: {
  cell: Cell
  boardSize: number
  base: number
  colors: string[]
}): HTMLSpanElement {
  return chain(createElement("span")("cells"))
    .map((span: HTMLSpanElement) => {
      span.innerText = cell.value === 0 ? "" : `${cell.value}`
      return span
    })
    .map((span: HTMLSpanElement) => {
      span.className += ` ${
        (cell.pValue === -1 && cell.value === base) ||
        (cell.value === base * 2 && cell.pValue === -1)
          ? "new-cell"
          : cell.value === base * cell.pValue && cell.pValue !== 0
          ? "double-cell"
          : ""
      }`
      return span
    })
    .map((span: HTMLElement) => {
      //font size
      const screenWidth = getScreenWidth()
      const fontSize = getCellFontSize({
        actualScreenWidth: screenWidth,
        digitLength: `${cell.value}`.length,
        boardSize,
      })
      span.style.fontSize = fontSize
      return span
    })
    .map((span: HTMLSpanElement) => {
      //color
      colors.map((c, i) => {
        if (!isPVOfTwo(cell.value)) {
          if (base % 2 !== 0) {
            const cellValue = cell.value / base

            if (i === getExponent(cellValue)) {
              span.style.backgroundColor = getColorShade(colors[i + 1], -1.4)
              span.style.color = getColorShade(c, 17)
            }
          }

          if (i === getExponent(cell.value)) {
            span.style.backgroundColor = getColorShade(colors[i], -1.4)
            span.style.color = getColorShade(c, 17)
          }
        }

        if (base === 2 && i === getExponent(cell.value)) {
          span.style.backgroundColor = getColorShade(colors[i], -1.4)
          span.style.color = getColorShade(c, 17)
        } else {
          if (i === getExponent(cell.value) / base) {
            span.style.backgroundColor = getColorShade(colors[i], -1.4)
            span.style.color = getColorShade(c, 17)
          } else {
            if (i === getExponent(cell.value)) {
              span.style.backgroundColor = getColorShade(colors[i - 1], -1.4)
              span.style.color = getColorShade(c, 17)
            }
          }
        }
      })

      return span
    })
    .fold(id)
}

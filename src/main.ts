import { gridSizeOption, renderControl } from "./controls"
import { renderCells, renderBoard } from "./board"
import { renderScore } from "./headers"

import "./style.css"
import { createElement } from "./tools"

import { fillCells, generate2DArray } from "./utils"
let cells = generate2DArray(4)
cells = fillCells(cells, true)(2)
const board = createElement("article")("board")
const scoreboard = createElement("article")("container__scoreboard")
renderBoard({ cells, board })
renderCells(board, cells)
const score = renderScore("score", `${globalThis.globalScore ?? 0}`)
const best = renderScore("best", "2220348")
scoreboard.append(score, best)

const title = createElement("h1")("title")
title.innerText = "Game: 2048"

const control = renderControl(board)
board.appendChild(gridSizeOption(board))

document.body.append(title, scoreboard, board, control)

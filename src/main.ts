import { renderControl } from "./controls"
import { drawCells, renderBoard } from "./board"
import { renderScore } from "./headers"

import "./style.css"
import { createElement } from "./tools"

import { fillCells, generate2DArray } from "./utils"
let cells = generate2DArray(4)
cells = fillCells(cells, true)(2)
const board = createElement("article")("board")
renderBoard({ cells, board })
drawCells(board, cells)

const score = renderScore("score", "222048")
const best = renderScore("best", "2220348")
const containerScoreBoard = createElement("article")("container__scoreboard")
containerScoreBoard.append(score, best)

const title = createElement("h1")("title")
title.innerText = "Game: 2048"

const control = renderControl(board)

document.body.append(title, containerScoreBoard, board, control)

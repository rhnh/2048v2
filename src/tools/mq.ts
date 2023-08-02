export const getCellWidth = (
  boardSize: number,
  screenWidth: number,
): number => {
  let size: number = 150
  if (boardSize === 4) {
    size = getWidthBoardSizeFour(screenWidth)
  }
  if (boardSize === 6) {
    size = getWidthBoardSizeSix(screenWidth)
  }
  if (boardSize === 8) {
    size = getWidthBoardSizeEight(screenWidth)
  }
  return size
}
function getWidthBoardSizeFour(screenWidth: number): number {
  if (screenWidth <= xxSmallScreen320) {
    return 78
  }
  if (screenWidth <= xSmallScreen360) {
    return 88
  }
  if (screenWidth <= smallScreen375) {
    return 92
  }
  if (screenWidth <= xxxMediumScreen384) {
    return 94.5
  }
  if (screenWidth <= xxMediumScreen390) {
    return 96
  }
  if (screenWidth <= xMediumScreen414) {
    return 101.5
  }
  if (screenWidth <= mediumScreen428) {
    return 105
  }
  if (screenWidth <= largeScreen800) {
    return 120
  }
  return 120
}
function getWidthBoardSizeSix(screenWidth: number): number {
  if (screenWidth <= xxSmallScreen320) {
    return 52
  }
  if (screenWidth <= xSmallScreen360) {
    return 60
  }
  if (screenWidth <= smallScreen375) {
    return 61
  }
  if (screenWidth <= xxxMediumScreen384) {
    return 62.5
  }
  if (screenWidth <= xxMediumScreen390) {
    return 63.5
  }
  if (screenWidth <= xMediumScreen414) {
    return 67
  }
  if (screenWidth <= mediumScreen428) {
    return 70
  }
  if (screenWidth <= largeScreen800) {
    return 90
  }
  return 76
}
function getWidthBoardSizeEight(actualScreenWidth: number) {
  if (actualScreenWidth <= xxSmallScreen320) {
    return 38.5
  }
  if (actualScreenWidth <= xSmallScreen360) {
    return 43
  }
  if (actualScreenWidth <= smallScreen375) {
    return 46
  }
  if (actualScreenWidth <= xxxMediumScreen384) {
    return 46.5
  }
  if (actualScreenWidth <= xxMediumScreen390) {
    return 47.5
  }
  if (actualScreenWidth <= xMediumScreen414) {
    return 50
  }
  if (actualScreenWidth <= mediumScreen428) {
    return 52
  }
  if (actualScreenWidth <= largeScreen800) {
    return 70
  }
  return 70
}
const xxSmallScreen320 = 320
const xSmallScreen360 = 360
const smallScreen375 = 375
const xxxMediumScreen384 = 384
const xxMediumScreen390 = 390
const xMediumScreen414 = 414
const mediumScreen428 = 428
const largeScreen800 = 800

const getFontBoardSizeFour = ({
  digitLength,
  actualScreenWidth,
}: {
  actualScreenWidth: number
  digitLength: number
}): number => {
  if (actualScreenWidth <= xxSmallScreen320) {
    if (digitLength < 3) return 20
    return 18
  }
  if (actualScreenWidth <= xSmallScreen360) {
    if (digitLength < 3) return 30
    return 20
  }
  if (actualScreenWidth <= smallScreen375) {
    if (digitLength < 3) return 35
    return 22
  }
  if (actualScreenWidth <= xxxMediumScreen384) {
    if (digitLength < 3) return 35
    return 22
  }

  return 40
}

const getFontBoardSizeSix = ({
  digitLength,
  actualScreenWidth,
}: {
  actualScreenWidth: number
  digitLength: number
}): number => {
  if (actualScreenWidth <= xxSmallScreen320) {
    if (digitLength < 3) return 24
    return 20
  }
  if (actualScreenWidth <= xSmallScreen360) {
    if (digitLength < 3) return 24
    return 20
  }
  if (actualScreenWidth <= smallScreen375) {
    if (digitLength < 3) return 30
    return 20
  }
  if (actualScreenWidth <= xxxMediumScreen384) {
    if (digitLength < 3) return 35
    return 22
  }
  return 24
}
const getFontBoardSizeEight = ({
  digitLength,
  actualScreenWidth,
}: {
  actualScreenWidth: number
  digitLength: number
}): number => {
  if (actualScreenWidth <= xxSmallScreen320) {
    if (digitLength < 3) return 24
    return 16
  }
  if (actualScreenWidth <= xSmallScreen360) {
    if (digitLength < 3) return 22
    return 20
  }
  if (actualScreenWidth <= smallScreen375) {
    if (digitLength < 3) return 25
    return 22
  }
  if (actualScreenWidth <= xxxMediumScreen384) {
    if (digitLength < 3) return 28
    return 20
  }
  return 24
}

//!!Todo
export function getCellFontSize({
  boardSize,
  actualScreenWidth,
  digitLength,
}: {
  boardSize: number
  actualScreenWidth: number
  digitLength: number
}): string {
  let size = 40
  if (boardSize === 4)
    size = getFontBoardSizeFour({ actualScreenWidth, digitLength })
  if (boardSize === 6)
    size = getFontBoardSizeSix({ digitLength, actualScreenWidth })
  if (boardSize === 8) {
    size = getFontBoardSizeEight({ digitLength, actualScreenWidth })
  }
  return `${size}px`
}

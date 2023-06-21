export const getWidth = (boardSize: number, screenWidth: number) => {
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
  return `${size}px `.repeat(boardSize)
}
function getWidthBoardSizeFour(screenWidth: number): number {
  if (screenWidth <= xxSmallScreen320) {
    return 76
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
    return 50
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
    return 38
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
//!!Todo
export function getFontSize(boardSize: number, actualScreenWidth: number) {}
const getFontBoardSizeFour = () => {}

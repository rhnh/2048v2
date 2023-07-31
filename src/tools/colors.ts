import { Cell, chain, id } from "./utils"

type RGBType = { red: number; green: number; blue: number }
const shade = ({
  rgb,
  factor,
  colorConstant = 0.06899,
}: {
  rgb: RGBType
  factor: number
  colorConstant?: number
}): RGBType => ({
  red: rgb.red * (1 - colorConstant * factor),
  green: rgb.green * (1 - colorConstant * factor),
  blue: rgb.blue * (1 - colorConstant * factor),
})

/**
 *
 * @param str -  a hex e.g : #fff
 * @returns - hex without #
 */
const removeTag = (str: string) => (str.startsWith("#") ? str.slice(1) : str)

/**
 *
 * @param str - hex : eg: fff and return fffff
 * @returns
 */
const expandHex = (str: string): string =>
  str.length === 3
    ? str
        .split("")
        .map((c) => c + c)
        .join("")
    : str

/**
 *
 * @param str[] an string array
 * @returns and splits into groups of 2
 */
const pairs = (str: string): string[] =>
  str.match(/.{2}/g) as unknown as string[]

/**
 *
 * @param str -
 * @returns - number value for any color hex string
 */
const parseHexToRGB = (str: string): number => parseInt(str, 16)

/**
 * Takes an Array of Hexadecimal and returns to RGB
 * @param str
 * @returns RGB
 */
const hexArrayToRGB = (str: string[]): RGBType => ({
  red: parseHexToRGB(str[0]),
  green: parseHexToRGB(str[1]),
  blue: parseHexToRGB(str[2]),
})
/**
 *
 * @param rgbInt - a numeric value eg: 16 => a
 * @returns - return hex number
 */
const intToHexColor = (rgbInt: number): string =>
  Math.min(Math.max(Math.round(rgbInt), 0), 255).toString(16)

/**
 * @info - Takes an hexadecimal value, and returns hexadecimal
 * @param hex - takes an hex
 * @returns  hexadecimal color
 */
const fillHex = (hex: string) => (hex.length === 1 ? hex + 0 : hex)

const rgbToHex = (rgb: RGBType): string =>
  fillHex(intToHexColor(rgb.red)) +
  fillHex(intToHexColor(rgb.green)) +
  fillHex(intToHexColor(rgb.blue))

export const getColorShade = (
  baseColor: string,
  factor: number,
  colorConstant?: number,
) =>
  chain(baseColor)
    .map(removeTag) //removes #
    .map(expandHex) // if baseColor is shorten hex, expands to full 6 digit hex
    .map(pairs) // divides into 3 pairs, returns an array
    .map(hexArrayToRGB) //[hex,hex,hex] to RGB
    .map((x: RGBType) =>
      shade({
        rgb: x,
        factor,
        colorConstant: colorConstant ?? 0.06899,
      }),
    ) // return raw shades
    .map(rgbToHex) //converts RGB to Hexadecimal
    .map((color: string) => `#${color}`)
    .fold(id) // returns the value

export const getColorShades = ({
  total,
  baseColor,
}: {
  total: number
  baseColor: string
}): string[] => {
  const colors: string[] = []
  let i = 0
  while (i < total) {
    colors.push(getColorShade(baseColor, i))
    i++
  }
  return colors
}

/**
 * - Example: 2^x= 8 => x = Math.log(8)/Math.log(2)
 * - Since Array index start with a zero, zero returns 0
 * @param x - value can => 2,4,8,16
 * @returns an index array
 */
export const getExponent = (x: number): number =>
  x === 0 ? 0 : Math.log(x) / Math.log(2)
/**
 * gets all power value of 2 between 2  power value numbers
 * @param - {power value of 2}
 * @returns
 */
export const rangeBetweenPV = ({
  cellValue1,
  cellValue2,
}: {
  cellValue1: number
  cellValue2: number
}): number[] => {
  if (!isPVOfTwo(cellValue1) || !isPVOfTwo(cellValue2)) {
    return []
  }
  let values: number[] = []
  let start = cellValue1 < cellValue2 ? cellValue1 : cellValue2
  let end = start === cellValue1 ? cellValue2 : cellValue1
  let i = start
  let x = getExponent(start)
  while (i < end) {
    i = Math.pow(2, x)
    values.push(i)
    x++
  }
  return values
}

/**
 *  - checks, if the 2 numbers of Power Value (PV) of 2
 *  - Example: 4 is power value of 2 => 2^2 = 4
 * @param n a numeric value
 * @returns true or false
 */
export const isPVOfTwo = (n: number): boolean => getExponent(n) % 1 === 0

export const generateColor = (
  hex: string,
  cellIndex: number,
  numberOfShades: number,
) => {
  let i = 0
  const shades: Cell[] = []
  if (cellIndex === 0) cellIndex = 1
  while (i < numberOfShades) {
    const shade: Cell = {
      pValue: 0,
      id: 0,
      value: Math.pow(2, i + cellIndex),
      color: getColorShade(hex, i),
      backgroundColor: getColorShade(hex, i),
    }

    shades.push(shade)
    i++
  }
  return shades
}

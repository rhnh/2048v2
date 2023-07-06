import { chain, id } from "./tools"
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

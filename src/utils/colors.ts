/**
 *  https://github.com/edelstone/tints-and-shades
 */

type func = (x: any) => any
type RGBType = { red: number; green: number; blue: number }

const chain = (x: unknown) => {
  return {
    map: (f: func) => chain(f(x)),
    fold: (f: func) => f(x),
  }
}
const id = (x: any) => x
const log = (x: any) => {
  console.info(x)
  return x
}
/* ############################################### */
const shade = (rgb: RGBType, i: number): RGBType => ({
  red: rgb.red * (1 - 0.06899 * i),
  green: rgb.green * (1 - 0.06899 * i),
  blue: rgb.blue * (1 - 0.06899 * i),
})

/**
 *
 * @param str - hex : eg: fff and return fffff
 * @returns
 */
const expandHex = (str: string): string => {
  return str.length === 3
    ? str
        .split("")
        .map((c) => c + c)
        .join("")
    : str
}
/**
 *
 * @param str -  a hex e.g : #fff
 * @returns - hex without #
 */
const removeTag = (str: string) => (str.startsWith("#") ? str.slice(1) : str)

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
 *
 * @param rgbInt - a numeric value eg: 16 => a
 * @returns - return hex number
 */
const intToHexColor = (rgbInt: number): string => {
  return Math.min(Math.max(Math.round(rgbInt), 0), 255).toString(16)
}

const everyHexToRGB = (str: string[]): RGBType => ({
  red: parseHexToRGB(str[0]),
  green: parseHexToRGB(str[1]),
  blue: parseHexToRGB(str[2]),
})

const fill = (str: string) => {
  if (str.length === 1) {
    return str + str
  }
  return str
}
const rgbToHex = (rgb: RGBType): string =>
  fill(intToHexColor(rgb.red)) +
  fill(intToHexColor(rgb.green)) +
  fill(intToHexColor(rgb.blue))

export const getColorShade = (baseColor: string, n: number) => {
  return chain(baseColor)
    .map(removeTag)
    .map(expandHex)
    .map(pairs)
    .map(everyHexToRGB)
    .map((x) => shade(x, n))
    .map(rgbToHex)
    .fold(id)
}

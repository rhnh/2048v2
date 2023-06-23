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

const hexArrayToRGB = (str: string[]): RGBType => ({
  red: parseHexToRGB(str[0]),
  green: parseHexToRGB(str[1]),
  blue: parseHexToRGB(str[2]),
})
/**
 * @info - Takes an hexadecimal value, and returns hexadecimal
 * @param hex - takes an hex
 * @returns  returns
 */
const fill = (hex: string) => {
  if (hex.length === 1) {
    return hex + 0
  }
  return hex
}
const rgbToHex = (rgb: RGBType): string =>
  fill(intToHexColor(rgb.red)) +
  fill(intToHexColor(rgb.green)) +
  fill(intToHexColor(rgb.blue))

export const getColorShade = (baseColor: string, n: number) => {
  return chain(baseColor)
    .map(removeTag) //removes #
    .map(expandHex) // if baseColor is shorten hex, expands to full 6 digit hex
    .map(pairs) // divides into 3 pairs, returns an array
    .map(hexArrayToRGB) //[hex,hex,hex] to RGB
    .map((x) => shade(x, n)) // return the shades
    .map(rgbToHex) //converts RGB to Hexadecimal
    .fold(id) // returns the value
}

export const getColorShades = (
  n: number,
  baseColor: string,
  color1: string,
  color2: string,
  color3: string,
  color4: string,
  color5: string,
  color6: string,
  color7: string,
  color8: string,
) => {
  if (n === 0) {
    return baseColor
  }

  if (n <= 16) {
    return getColorShade(color1, n / 2)
  }
  if (n >= 32 && n <= 128) {
    return getColorShade(color2, n / 32)
  }
  if (n > 128 && n <= 512) {
    return getColorShade(color3, n / 256)
  }
  if (n > 1024 && n <= 4096) {
    return getColorShade(color4, n / 1024)
  }

  if (n >= 4096 && n < 16384) {
    return getColorShade(color5, n / 4096)
  }
  if (n >= 1024 && n < 4096) {
    return getColorShade(color6, n / 1024)
  }
  if (n >= 4096 && n <= 16384) {
    return getColorShade(color7, n / 4096)
  }
  if (n >= 16384 && n <= 49152) {
    return getColorShade(color8, n / 16384)
  }
  return "#3949AB"
}

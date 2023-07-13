import {
  getColorShades,
  getExponent,
  rangeBetweenPV,
  isPVOfTwo,
} from "../src/colors"

describe("CellColor Array", () => {
  test("cellValueToIndex", () => {
    expect(getExponent(4)).toBe(2)
    expect(getExponent(2)).toBe(1)
    expect(getExponent(0)).toBe(0)
  })
  test("getCellValueTill", () => {
    expect(rangeBetweenPV({ cellValue1: 2, cellValue2: 4 })).toEqual([2, 4])
    expect(rangeBetweenPV({ cellValue1: 2, cellValue2: 16 })).toEqual([
      2, 4, 8, 16,
    ])
    expect(rangeBetweenPV({ cellValue1: 4, cellValue2: 32 })).toEqual([
      4, 8, 16, 32,
    ])
  })
  test("isCellValue", () => {
    expect(isPVOfTwo(2)).toBe(true)
    expect(isPVOfTwo(4)).toBe(true)
    expect(isPVOfTwo(8)).toBe(true)
    expect(isPVOfTwo(16)).toBe(true)
    expect(isPVOfTwo(32)).toBe(true)
    expect(isPVOfTwo(64)).toBe(true)
    expect(isPVOfTwo(64)).toBe(true)
    expect(isPVOfTwo(2048)).toBe(true)
    expect(isPVOfTwo(1048)).toBe(false)
    expect(isPVOfTwo(6)).toBe(false)
    expect(isPVOfTwo(12)).toBe(false)
    expect(isPVOfTwo(44)).toBe(false)
    expect(isPVOfTwo(13)).toBe(false)
    expect(isPVOfTwo(15)).toBe(false)
    expect(isPVOfTwo(Math.pow(2, 30))).toBe(true)
    expect(isPVOfTwo(34359738368)).toBe(true)
    expect(isPVOfTwo(34359738361)).toBe(false)
  })
})

describe("color", () => {
  test("clolor", () => {
    let result = getColorShades({ baseColor: "#fff", total: 3 })
    expect(result).toEqual(["#ffffff", "#ededed", "#dcdcdc"])
    result = getColorShades({ baseColor: "#fff", total: 3 })
    expect(result.length).toBe(3)
  })

  test("colors", () => {
    const pvs = rangeBetweenPV({ cellValue1: 512, cellValue2: 2048 })
    const pvRange = getColorShades({ baseColor: "#fc0", total: pvs.length })
    const colors: string[] = []
    const r = pvs.map((c, i) => {
      return (colors[getExponent(c)] = pvRange[i])
    })
    for (let i = 0; i < colors.length; i++) {
      console.log(i, colors[i])
    }
  })
})

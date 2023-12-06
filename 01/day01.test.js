fs = require('fs');
const {
    getNumbers, wordNumberToStringDigit, parsedArray
  } = require("./day01");

testinput = fs.readFileSync('01/day01testinput.txt').toString().split("\n");
input = fs.readFileSync('01/day01input.txt').toString().split("\n");

test("should parse the first and last digits out", () => {
    const input = '1abc2'
    const input2 = 'pqr3stu8vwx'
    const parsed = getNumbers(input)
    const parsed2 = getNumbers(input2)
    expect(parsed).toBe(12)
    expect(parsed2).toBe(38)
})

test("converts number words to number strings", () => {
  const output = wordNumberToStringDigit("two")
  expect(output).toBe("2")
})

test("also finds numbers as words", () => {
  const input1 = "two1nine"
  const output1 = getNumbers(input1)
  expect(output1).toBe(29)
})

test("should run on multiple strings", () => {
    const output = parsedArray(testinput)
    expect(output).toStrictEqual([12, 38, 15, 77, 29, 83, 13, 24, 42, 14, 76])
})

test("add them all up", () => {
    const output = parsedArray(testinput).reduce((partialSum, a) => partialSum + a, 0)
    expect(output).toBe(142 + 281)
})

test("also finds overlapping numbers", () => {
  const input = "6oneight"
  const output = getNumbers(input)
  expect(output).toBe(68)
})

test("works on apparently dodgy number", () => {
  const input = "dgcvchcdmksvqhdqvs29onenddxsqseven"
  const output = getNumbers(input)
  expect(output).toBe(27)
})
// which turns out it was dodgy because I can't spell "seven"

test("actual puzzle", () => {
    const output = parsedArray(input).reduce((partialSum, a) => partialSum + a, 0)
    expect(output).toBe(54676)
})
fs = require('fs');
const {
  parseNumbers,
  findNumbersNearSymbols
  } = require("./puzzle");

testinput = fs.readFileSync(`${__dirname}/puzzletestinput.txt`).toString().split("\n");
input = fs.readFileSync(`${__dirname}/puzzleinput.txt`).toString().split("\n");

test("parses out all the numbers and their locations", () => {
  let parsedNumbers = parseNumbers(testinput)
  expect(parsedNumbers[0]).toStrictEqual({number: 467, locations: [[0,0], [1, 0], [2, 0]]})
  expect(parsedNumbers[9]).toStrictEqual({number: 598, locations: [[5,9], [6, 9], [7, 9]]})
})

test("checks the surrounding locations to see if there is asymbol there", () => {
  let parsedNumbers = parseNumbers(testinput)
  let numbersNearSymbols = findNumbersNearSymbols(parsedNumbers, testinput)
  expect(numbersNearSymbols).toStrictEqual([467, 35, 633, 617, 592, 755, 664, 598])
})
fs = require('fs');
const { hasUncaughtExceptionCaptureCallback } = require('process');
const {
  parseCard,
  getMatchingNumbers,
  getScore,
  getTotalScore,
  getNumberOfCards
  } = require("./puzzle");

testinput = fs.readFileSync(`${__dirname}/puzzletestinput.txt`).toString().split("\n");
input = fs.readFileSync(`${__dirname}/puzzleinput.txt`).toString().split("\n");

test("parses to two sets of numbers", () => {
  const card = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53"
  const parsedCard = parseCard(card)
  expect(parsedCard.winningNumbers).toStrictEqual([41, 48, 83, 86, 17])
  expect(parsedCard.myNumbers).toStrictEqual([83, 86, 6, 31, 17, 9, 48, 53])
})

test("gets the matching numbers", () => {
  const parsedCard = {winningNumbers: [41, 48, 83, 86, 17], myNumbers: [83, 86, 6, 31, 17, 9, 48, 53]}
  const matchingNumbers = getMatchingNumbers(parsedCard)
  expect(matchingNumbers).toStrictEqual([48, 83, 86, 17])
})

test("gets the cards score", () => {
  const matchingNumbers = [48, 83, 86, 17]
  const score = getScore(matchingNumbers)
  expect(score).toBe(8)
})

test("gets the scores for all the cards", () => {
  const cards = testinput
  const totalScore = getTotalScore(cards)
  expect(totalScore).toBe(13)
})

test("part 1", () => {
  const cards = input
  const totalScore = getTotalScore(cards)
  expect(totalScore).toBe(24160)
})

test("get the number of scratch cards won under the new rules", () => {
  const cards = testinput
  const score = getNumberOfCards(cards)
  expect(score).toBe(30)
})

test("part 2", () => {
  const cards = input
  const score = getNumberOfCards(cards)
  expect(score).toBe(30)
})
fs = require('fs');
const {
  parseCard,
  getMatchingNumbers,
  getScore,
  getTotalScore,
  getNumberOfCards,
    getTotalNumberOfCards
  } = require("./puzzle");

testinput = fs.readFileSync(`${__dirname}/puzzletestinput.txt`).toString().split("\n");
testinput2 = fs.readFileSync(`${__dirname}/puzzletestinput2.txt`).toString().split("\n");
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

test("get the number of each scratch card won under the new rules", () => {
  const cards = testinput
  const score = getNumberOfCards(cards)
  expect(score).toStrictEqual([
      {"copies": 1, "matches": 4},
    {"copies": 2, "matches": 2},
    {"copies": 4, "matches": 2},
    {"copies": 8, "matches": 1},
    {"copies": 14, "matches": 0},
    {"copies": 1, "matches": 0}])
})

test("gets the total number of cards won", () => {
  const scores = [{"copies": 1, "matches": 4}, {"copies": 2, "matches": 2}, {"copies": 4, "matches": 2}, {"copies": 8, "matches": 1}, {"copies": 14, "matches": 0}, {"copies": 1, "matches": 0}]
  const score = getTotalNumberOfCards(scores)
  expect(score).toBe(30)
})

test("part 2", () => {
  const cards = input
  const scores = getNumberOfCards(cards)
  const score = getTotalNumberOfCards(scores)
  expect(score).toBe(5659035)
})

test("when the last line has some matches", () => {
  const cards = testinput2
  const score = getNumberOfCards(cards)
  expect(score).toStrictEqual([
    {"copies": 1, "matches": 4},
    {"copies": 2, "matches": 2},
    {"copies": 4, "matches": 2},
    {"copies": 8, "matches": 1},
    {"copies": 14, "matches": 0},
    {"copies": 1, "matches": 0},
    {"copies" : 1, "matches": 1}])
  const totalCards = getTotalNumberOfCards(score)
  expect(totalCards).toBe(31)
  // problem wasn't actually last line, it was that I was using the score not the count from before but hadn't noticed because the example had too few cards
})
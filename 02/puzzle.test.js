fs = require('fs');
const {
  isSetPossible,
  isGamePossible,
    getPassingIds,
    getSmallestSet,
    getPowerOfSet,
    addAllThePowers
  } = require("./puzzle");

testinput = fs.readFileSync(`${__dirname}/puzzletestinput.txt`).toString().split("\n");
input = fs.readFileSync(`${__dirname}/puzzleinput.txt`).toString().split("\n");

test("should check a single set against the requirement", () => {
  const set = '3 blue, 4 red'
  const requirement = {"red":12, "green":13, "blue": 14}
  const possible = isSetPossible(set, requirement)
  expect(possible).toBe(true)

  const failingSet = "8 green, 6 blue, 20 red"
  const notpossible = isSetPossible(failingSet, requirement)
  expect(notpossible).toBe(false)
})

test("should check all sets in a game against the requirement", () => {
  const sets = "3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green".split(';')
  const requirement = {"red":12, "green":13, "blue": 14}
  const possible = isGamePossible(sets, requirement)
  expect(possible).toBe(true)

  const failingSets = "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red".split(';')
  const notPossible = isGamePossible(failingSets, requirement)
  expect(notPossible).toBe(false)
})

test("should return the ids of the games that pass", () => {
  const games = testinput
  const requirement = {"red":12, "green":13, "blue": 14}
  const ids = getPassingIds(games, requirement)
  expect(ids).toStrictEqual([1, 2, 5])
})

test("add them all up", () => {
  const games = testinput
  const requirement = {"red":12, "green":13, "blue": 14}
  const ids = getPassingIds(games, requirement)
  const output = ids.reduce((partialSum, a) => partialSum + a, 0)
  expect(output).toBe(8)
})

test("answer part1", () => {
  const games = input
  const requirement = {"red":12, "green":13, "blue": 14}
  const ids = getPassingIds(games, requirement)
  const output = ids.reduce((partialSum, a) => partialSum + a, 0)
  expect(output).toBe(2085)
})

test("get the smallest number of balls needed for the game", () => {
  const game = "3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green".split(';')
  const smallestSet = getSmallestSet(game)
  expect(smallestSet).toStrictEqual({"red":4, "green":2, "blue": 6})
})

test("gets power of smallest number of balls needed", () => {
  const game = "3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green".split(';')
  const powerOfSet = getPowerOfSet(game)
  expect(powerOfSet).toBe(48)
})

test("gets powers of all the sets", () => {
  const games = testinput
  const powers = addAllThePowers(games)
  expect(powers).toBe(2286)
})

test("answer part2", () => {
  const games = input
  const powers = addAllThePowers(games)
  expect(powers).toBe(79315)
})

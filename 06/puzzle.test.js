fs = require('fs');
const {
  findFirstWinningTime,
  getNumberOfWinningHolds,
  parseRaces,
  getWinningHolds,
    getMarginOfError,
    parseRacesKerning
  } = require("./puzzle");

testinput = fs.readFileSync(`${__dirname}/puzzletestinput.txt`).toString().split("\n");
input = fs.readFileSync(`${__dirname}/puzzleinput.txt`).toString().split("\n");

test("find the first point where you can win", () => {
  let time = 7
  let distance = 9
  let win = findFirstWinningTime(time, distance)
  expect(win).toBe(2)
})

test("find number of winning holds", () => {
  let time = 7
  let firstWinningTime = 2
  let winningHolds = getNumberOfWinningHolds(firstWinningTime, time)
  expect(winningHolds).toBe(4)
})

test("parse races", () => {
  let races = testinput
  let parsedRaces = parseRaces(races)
  expect(parsedRaces).toStrictEqual([{time: 7, distance: 9}, {time: 15, distance: 40}, {time: 30, distance: 200}])
})

test("get winning holds for each race", () => {
  let races = [{time: 7, distance: 9}, {time: 15, distance: 40}, {time: 30, distance: 200}]
  let winningHolds = getWinningHolds(races)
  expect(winningHolds).toStrictEqual([4, 8, 9])
})

test("get margin of error", () => {
  let races = testinput
  let marginOfError = getMarginOfError(races)
  expect(marginOfError).toBe(288)
})

test("part 1", () => {
  let races = input
  let marginOfError = getMarginOfError(races)
  expect(marginOfError).toBe(220320)
})

test("get time and distance with new parsing", () => {
  let races = testinput
  let parsedRaces = parseRacesKerning(races)
  expect(parsedRaces).toStrictEqual([{time: 71530, distance: 940200}])
})

test("get winning times with new parsing", () => {
  let races = testinput
  let parsedRaces = parseRacesKerning(races)
  let winningHolds = getWinningHolds(parsedRaces)
  expect(winningHolds[0]).toBe(71503)
})

test("part 2", () => {
  let races = input
  let parsedRaces = parseRacesKerning(races)
  let winningHolds = getWinningHolds(parsedRaces)
  expect(winningHolds[0]).toBe(34454850)
})
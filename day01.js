function getNumbers(input) {
    digits = [...input.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/gm)]
    console.log(digits)
    parsed = wordNumberToStringDigit(digits[0][1]) + wordNumberToStringDigit(digits[digits.length -1][1])
    return Number(parsed)
}

function wordNumberToStringDigit(input) {
    numberMap = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
    number = Number(input) || numberMap.findIndex((item) => item == input)
    return String(number)
}

function parsedArray(input) {
    parsedArray = []
    input.forEach(inputstring => {
        parsedArray.push(getNumbers(inputstring))
    });
    console.log(parsedArray)
    return parsedArray
}

module.exports = {
    getNumbers,
    wordNumberToStringDigit,
    parsedArray
}
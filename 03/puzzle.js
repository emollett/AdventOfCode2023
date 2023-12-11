function parseNumbers(lines) {
    numbers = []

    lines.forEach((line, y) => {
        number = ''
        locations = []
        line.split('').forEach((character, x) => {
            if (Number(character)){
                number += character
                locations.push([x, y])
            }
            else {
                if (number.length > 0) numbers.push({number: Number(number), locations})
                console.log(numbers)
                number = ''
                locations = []
            }
        })
    })

    return numbers
}

function findNumbersNearSymbols(parsedNumber, lines) {
    let partNumbers = []
    parsedNumber.forEach((number) => {
        (number.locations).forEach((location) => {
            //check all around, as soon as you hit a symbol, push the number to an array and continue the loop
            if(lines[location[1]-1][location[0]-1] != '.' && isNaN(lines[location[1]-1][location[0]-1]){
                partNumbers.push(number.number)
                break
            }

            // diagonal left up= x-1, y-1
            // above = x, y-1
            // diagonal right up = x+1, y-1
            // right = x+1, y
            // diagonal right down = x+1, y+1
            // down = x, y+1
            // diagonal left down = x-1, y+1
            // left = x-1, y
        })
    })
}

module.exports = {
    parseNumbers,
    findNumbersNearSymbols
}
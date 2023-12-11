function parseNumbers(lines) {
    numbers = []

    lines.forEach((line, y) => {
        number = ''
        locations = []
        line.split('').forEach((character, x) => {
            if (Number(character) || character === '0'){
                number += character
                locations.push([x, y])
            }
            else {
                if (number.length > 0) numbers.push({number: Number(number), locations})
                number = ''
                locations = []
            }
            if (line.length -1 === x && number.length > 0)numbers.push({number: Number(number), locations})
        })
    })
    return numbers
}

function findNumbersNearSymbols(parsedNumber, lines) {
    let partNumbers = []
    let height = lines.length
    let width = lines[0].length
    parsedNumber.forEach((number) => {
        // going through each location the number has
        for (let i =0; i< (number.locations).length; i++){
            let location = number.locations[i]
            let x = location[0]
            let y = location[1]
            //check all around that location, as soon as you hit a symbol, push the number to an array and continue with the other parsed numbers loop
            if(y != 0 && x != 0 && lines[y-1][x-1] !== '.' && isNaN(lines[y-1][x-1])){
                partNumbers.push(number.number)
                break
            }
            if(y != 0 && lines[y-1][x] !== '.' && isNaN(lines[y-1][x])){
                partNumbers.push(number.number)
                break
            }
            if(y != 0 && x != width -1 && lines[y-1][x+1] !== '.' && isNaN(lines[y-1][x+1])){
                partNumbers.push(number.number)
                break
            }
            if(x != width -1 && lines[y][x+1] !== '.' && isNaN(lines[y][x+1])){
                partNumbers.push(number.number)
                break
            }
            if(y != height-1 && x != width -1 && lines[y+1][x+1] !== '.' && isNaN(lines[y+1][x+1])){
                partNumbers.push(number.number)
                break
            }
            if(y != height-1 && lines[y+1][x] !== '.' && isNaN(lines[y+1][x])){
                partNumbers.push(number.number)
                break
            }
            if(y != height-1 && x != 0 && lines[y+1][x-1] !== '.' && isNaN(lines[y+1][x-1])){
                partNumbers.push(number.number)
                break
            }
            if(x != 0 && lines[y][x-1] !== '.' && isNaN(lines[y][x-1])){
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
        }
    })
    return partNumbers
}

function getSumOfPartNumbers(input) {
    let parsednumbers = parseNumbers(input)
    let partNumbers = findNumbersNearSymbols(parsednumbers, input)
    return partNumbers.reduce((sum, a) => sum + a, 0)
}

module.exports = {
    parseNumbers,
    findNumbersNearSymbols,
    getSumOfPartNumbers
}
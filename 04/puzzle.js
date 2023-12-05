function parseCard(card) {
    numbers = card.split(':')[1].split('|')

    winningNumbers = numbers[0].trim().split(/\s+/).map((string) => Number(string))
    myNumbers = numbers[1].trim().split(/\s+/).map((string) => Number(string))

    return {winningNumbers, myNumbers}
}

function getMatchingNumbers(parsedCard) {
    let results = (parsedCard.winningNumbers).filter(value => (parsedCard.myNumbers).includes(value))
    return results
}

function getScore(matchingNumbers) {
    return matchingNumbers.length > 0 ? Math.pow(2, matchingNumbers.length-1) : 0
}

function getTotalScore(cards) {
    runningScore = 0
    cards.forEach((card) => {
        parsedCard = parseCard(card)
        score = getScore(getMatchingNumbers(parsedCard))
        runningScore += score
    })
    return runningScore
}

module.exports = {
    parseCard,
    getMatchingNumbers,
    getScore,
    getTotalScore
}
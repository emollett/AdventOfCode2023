function parseCard(card) {
    let numbers = card.split(':')[1].split('|')

    let winningNumbers = numbers[0].trim().split(/\s+/).map((string) => Number(string))
    let myNumbers = numbers[1].trim().split(/\s+/).map((string) => Number(string))

    return {winningNumbers, myNumbers}
}

function getMatchingNumbers(parsedCard) {
    return (parsedCard.winningNumbers).filter(value => (parsedCard.myNumbers).includes(value))
}

function getScore(matchingNumbers) {
    return matchingNumbers.length > 0 ? Math.pow(2, matchingNumbers.length-1) : 0
}

function getTotalScore(cards) {
    let runningScore = 0
    cards.forEach((card) => {
        parsedCard = parseCard(card)
        score = getScore(getMatchingNumbers(parsedCard))
        runningScore += score
    })
    return runningScore
}

function getNumberOfCards(cards) {
    let scores = []
    cards.forEach((card) => {
        parsedCard = parseCard(card)
        matches = getMatchingNumbers(parsedCard).length
        scores.push({matches, copies: 1})
    })

    scores.forEach((score, index) => {
        for (let i = 1; i <= score.matches; i++) {
            if (index+i < scores.length) scores[index+i].copies += score.copies
        }
    })
    return scores
}

function getTotalNumberOfCards(scores) {
    let numberOfCards = 0
    scores.forEach((score) => {
        numberOfCards += score.copies
    })
    return numberOfCards
}

module.exports = {
    parseCard,
    getMatchingNumbers,
    getScore,
    getTotalScore,
    getNumberOfCards,
    getTotalNumberOfCards
}
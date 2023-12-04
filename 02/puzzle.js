function isSetPossible(set, requirement) {
    let parsedSet = {
        red: set.match(/\d* red/)?.[0].replaceAll(/\D|\s/g, '') || 0,
        green: set.match(/\d* green/)?.[0].replaceAll(/\D|\s/g, '') || 0,
        blue: set.match(/\d* blue/)?.[0].replaceAll(/\D|\s/g, '') || 0
    }
    return (parsedSet.red <= requirement.red && parsedSet.blue <= requirement.blue && parsedSet.green <= requirement.green)
}

function isGamePossible(sets, requirement) {
    return sets.every((set) => isSetPossible(set, requirement))
}

function getPassingIds(games, requirement) {
    let ids = []
    games.forEach((game) => {
        let gameParts = game.split(':')
        let id = gameParts[0].replaceAll(/\D|\s/g, '')
        let sets= gameParts[1].split(';')
        if (isGamePossible(sets, requirement)) ids.push(Number(id))
    })
    return ids
}

function getSmallestSet(sets) {
    let smallestSet = {
        red: 0,
        green: 0,
        blue: 0
    }

    sets.forEach((set) => {
        let red = Number(set.match(/\d* red/)?.[0].replaceAll(/\D|\s/g, '')) || 0
        let green = Number(set.match(/\d* green/)?.[0].replaceAll(/\D|\s/g, '')) || 0
        let blue = Number(set.match(/\d* blue/)?.[0].replaceAll(/\D|\s/g, '')) || 0
        
        if (red > smallestSet.red ) smallestSet.red = red
        if (green > smallestSet.green ) smallestSet.green = green
        if (blue > smallestSet.blue ) smallestSet.blue = blue
    })

    return smallestSet
}

function getPowerOfSet(sets) {
    let smallestSet = getSmallestSet(sets)
    let power = smallestSet.red * smallestSet.green * smallestSet.blue
    return power
}

function addAllThePowers(games) {
    let powers = []
    games.forEach((game) => {
        let gameParts = game.split(':')
        let sets= gameParts[1].split(';')
        powers.push(getPowerOfSet(sets))
    })
    return powers.reduce((partialSum, a) => partialSum + a, 0)
}

module.exports = {
    isSetPossible,
    isGamePossible,
    getPassingIds,
    getSmallestSet,
    getPowerOfSet,
    addAllThePowers
}
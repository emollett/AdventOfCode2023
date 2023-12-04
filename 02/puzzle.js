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

module.exports = {
    isSetPossible,
    isGamePossible,
    getPassingIds
}
function findFirstWinningTime(time, distance) {
    let timeHeld = 0
    for(let i=0; i<time; i++){
        timeHeld = i
        let remainingTime = time-timeHeld
        let distanceTravelled = timeHeld * remainingTime
        if (distanceTravelled > distance) { break; }
    }
    return timeHeld
}

function getNumberOfWinningHolds(firstWinningTime, time) {
    return (time+1)-(2*firstWinningTime)
}

function parseRaces(races){
    let times = races[0].split(':')[1].trim().split(/\s+/g)
    let distances = races[1].split(':')[1].trim().split(/\s+/g)

    let parsedRaces = []

    times.forEach((time, index) => {
        parsedRaces.push({time: Number(time), distance: Number(distances[index])})
    })

    return parsedRaces
}

function parseRacesKerning(races){
    let time = Number(races[0].split(':')[1].trim().replace(/\D+/g, ''))
    let distance = Number(races[1].split(':')[1].trim().replace(/\D+/g, ''))

    return [{time, distance}]
}

function getWinningHolds(parsedRaces){
    let winningHolds = []
    const repeats = parsedRaces.length

    for(let i=0; i<repeats; i++){
        let time = parsedRaces[i].time
        let distance = parsedRaces[i].distance
        let firstWinningTime = findFirstWinningTime(time, distance)
        let numberOfWinningHolds = getNumberOfWinningHolds(firstWinningTime, time)
        winningHolds.push(numberOfWinningHolds)
    }

    return winningHolds
}

function getMarginOfError(races){
    let parsedRaces = parseRaces(races)
    let winningHolds = getWinningHolds(parsedRaces)
    return winningHolds.reduce((partialSum, a) => partialSum * a, 1)
}

module.exports = {
    findFirstWinningTime,
    getNumberOfWinningHolds,
    parseRaces,
    getWinningHolds,
    getMarginOfError,
    parseRacesKerning
}
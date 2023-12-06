function findFirstWinningTime(time, distance) {
    for(i=0; i<time; i++){
        timeHeld = i
        remainingTime = time-timeHeld
        distanceTravelled = timeHeld * remainingTime
        if (distanceTravelled > distance) return timeHeld
    }
}

function getNumberOfWinningHolds(firstWinningTime, time) {
    return (time+1)-(2*firstWinningTime)
}

function parseRaces(races){
    times = races[0].split(':')[1].trim().split(/\s+/g)
    distances = races[1].split(':')[1].trim().split(/\s+/g)

    parsedRaces = []

    times.forEach((time, index) => {
        parsedRaces.push({time: Number(time), distance: Number(distances[index])})
    })

    return parsedRaces
}

function getWinningHolds(races){
    let winningHolds = []

    for(i=0; i<races.length; i++){
        let time = races[i].time
        let distance = races[i].distance
        let firstWinningTime = findFirstWinningTime(time, distance)
        let numberOfWinningHolds = getNumberOfWinningHolds(firstWinningTime, time)
        winningHolds.push(numberOfWinningHolds)
    }

    return winningHolds
}

module.exports = {
    findFirstWinningTime,
    getNumberOfWinningHolds,
    parseRaces,
    getWinningHolds
}
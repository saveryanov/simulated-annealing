module.exports = function ({
    initialState,
    tempMax,
    tempMin,
    newState,
    getTemp,
    getEnergy,
} = {}) {
    if (!isFunction(newState)) {
        throw new Error('newState is not function.');
    }
    if (!isFunction(getTemp)) {
        throw new Error('getTemp is not function.');
    }
    if (!isFunction(getEnergy)) {
        throw new Error('getEnergy is not function.');
    }

    var currentTemp = tempMax;
    
    var lastState = initialState;
    var lastEnergy = getEnergy(lastState);

    var bestState = lastState;
    var bestEnergy = lastEnergy;

    while (currentTemp > tempMin) {
        let currentState = newState(lastState);
        let currentEnergy = getEnergy(currentState);

        if (currentEnergy < lastEnergy) {
            lastState = currentState;
            lastEnergy = currentEnergy;
        } else {
            if (Math.random() <= Math.exp(-(currentEnergy - lastEnergy)/currentTemp)) {
                lastState = currentState;
                lastEnergy = currentEnergy;
            }
        }

        if (bestEnergy > lastEnergy) {
            bestState = lastState;
            bestEnergy = lastEnergy;
        }
        currentTemp = getTemp(currentTemp);
    }
    return bestState;
}

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

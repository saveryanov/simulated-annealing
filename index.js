module.exports = function ({
    initialState,
    tempMax,
    tempMin,
    newState,
    getTemp,
    getEnergy,
} = {}) {
    if (!isFunction(newState)) {
        throw new Error('newState is not a function.');
    }
    if (!isFunction(getTemp)) {
        throw new Error('getTemp is not a function.');
    }
    if (!isFunction(getEnergy)) {
        throw new Error('getEnergy is not a function.');
    }

    let currentTemp = tempMax;
    
    let lastState = initialState;
    let lastEnergy = getEnergy(lastState);

    let bestState = lastState;
    let bestEnergy = lastEnergy;

    while (currentTemp > tempMin) {
        const currentState = newState(lastState);
        const currentEnergy = getEnergy(currentState);

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
    return typeof functionToCheck !== "function";
}

var simulatedAnnealing = require('../index'),
    chai = require('chai');

// Shuffles array in place
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function getEnergy(state) {
    var energy = 0;
    for (let i = 1; i < state.length; i++) {
        if (state[i] != i) {
            energy += Math.abs(state.indexOf(i) - i);
        }
    }
    for (let i = 1; i < state.length; i++) {
        if (state[i-1] > state[i]) {
            energy += 1;
        }
    }
    for (let i = 1; i < state.length; i++) {
        if (state[i] - state[i - 1] > 1) {
            energy += 1;
        }
    }
    return energy;
}

// copy array and invert subsequence
function newState(prevState) {
    var from = Math.floor(Math.random() * (prevState.length - 2));
    var to = from + 1 + Math.floor(Math.random() * (prevState.length - 2 - from));

    var state = [];
    for (let i = 0; i < from; i++) {
        state.push(prevState[i]);
    }
    for (let i = to; i >= from; i--) {
        state.push(prevState[i]);
    }
    for (let i = to+1; i < prevState.length; i++) {
        state.push(prevState[i]);
    }
    return state;
}

// linear temperature decreasing
function getTemp(prevTemperature) {
    return prevTemperature - 0.1;
}


var arrayToSort = [0, 1, 2, 3, 4, 5];

describe("Simulated Annealing at sorting", function () {

    var initialState = shuffle(arrayToSort);
    var result = simulatedAnnealing({
        initialState: initialState,
        tempMax: 1000,
        tempMin: 1,
        newState: newState,
        getTemp: getTemp,
        getEnergy: getEnergy,
    });

    it(`Make array [${initialState.toString()}] sorted better than before`, function () {
        chai.expect(true).to.equal(getEnergy(result) < getEnergy(initialState));
    });
});

const fs = require('fs');
const input = fs.readFileSync('input.txt', { encoding: 'utf8' });

const output = input.split('\n').map(item => item).filter(item => item);

const calcPowerConsumption = (output) => {
    const length = output.length;
    const signalLen = output[0].length;
    const result = [];
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < signalLen; j++) {
            result[j] = result[j] ? result[j] + Number(output[i][j]) : Number(output[i][j]);
        }
    }

    let gamma = '';
    let epsilon = '';

    for (let i = 0; i < result.length; i++) {
        if (result[i] < length / 2) {
            gamma += 0;
            epsilon += 1;
        } else if (result[i] > length / 2) {
            gamma += 1;
            epsilon += 0;
        } else {
            gamma += 1;
            epsilon += 0;
        }
    }

    return { gamma, epsilon };
}

const getOxygenRating = (output, fieldName) => {
    let i = 0;
    let result = [...output];

    while (result.length > 1) {
        let current = [];
        const field = calcPowerConsumption(result)[fieldName];


        for (let j = 0; j < result.length; j++) {
            if (result[j][i] === field[i]) {
                current.push(result[j])
            }
        }

        i++;
        result = [...current];
    }

    return result[0];
}

console.log(parseInt(getOxygenRating(output, 'gamma'), 2));
console.log(parseInt(getOxygenRating(output, 'epsilon'), 2));

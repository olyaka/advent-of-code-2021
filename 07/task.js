const fs = require('fs');
const input = fs.readFileSync('input.txt', { encoding: 'utf8' });

const output = input.trim()
    .split(',')
    .map(item => Number(item));


const calcFuel = (crabs) => {
    const sorted = crabs.sort((a, b) => a > b);
    const fuelMap = new Map();
    console.log(sorted)

    for (let i = sorted[0]; i <= sorted[sorted.length - 1]; i++) {
        let fuel = 0;

        for (let j = 0; j < crabs.length; j++) {
            const sum = (1 + Math.abs(i - crabs[j])) / 2 * Math.abs(i - crabs[j]);
            fuel += sum;
        }

        fuelMap.set(i, fuel);
    }

    console.log(fuelMap);

    return fuelMap;
}


console.log(Math.min(...calcFuel(output).values()));

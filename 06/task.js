const fs = require('fs');
const input = fs.readFileSync('input.txt', { encoding: 'utf8' });

const output = input.trim()
    .split(',')
    .map(item => Number(item));

function calcFish2(fish, days) {
    let fishMap = new Map();
    for (let j = 0; j <= 8; j += 1) {
        fishMap.set(j, 0);
    }
    for (let value of fish) {
        fishMap.set(value, fishMap.get(value) + 1);
    }

    for (let i = 0; i < days; i++) {
        let zeroFish = fishMap.get(0);
        let prev = zeroFish;
        for (let j = 8; j >= 0; j -= 1) {
            let count = fishMap.get(j);
            fishMap.set(j, prev);
            prev = count;
        }
        fishMap.set(6, fishMap.get(6) + zeroFish);
    }

    let sum = 0;
    for (let j = 0; j <= 8; j += 1) {
        sum += fishMap.get(j);
    }
    return sum;
}

function calcFish(fish, days) {
    for (let i = 0; i < days; i++) {
        let todayFish = [];
        for (let j = 0; j < fish.length; j++) {
            if (fish[j] === 0) {
                fish[j] = 6;
                todayFish.push(8);
            } else {
                fish[j] = fish[j] - 1;
            }
        }

        fish = [...fish, ...todayFish];
        todayFish = [];
    }

    return fish;
}

function calcFishCount(fish, days) {
    let count = 0;
    for (let i = 0; i < days; i++) {
        let todayFish = [];
        for (let j = 0; j < fish.length; j++) {
            if (fish[j] === 0) {
                fish[j] = 6;
                todayFish.push(8);
            } else {
                fish[j] = fish[j] - 1;
            }
        }

        fish = [...fish, ...todayFish];
        todayFish = [];
    }

    return fish;
}

// let fish = calcFish(output, 80)
// console.log(calcFish([0], 256))
console.log(calcFish2(output, 256))

// console.log(fish.length);



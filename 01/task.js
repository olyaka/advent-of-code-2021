const fs = require('fs');
const input = fs.readFileSync('input.txt', { encoding: 'utf8' });

const depths = input.split('\n').map(item => Number(item)).filter(item => item);

const calcIncreasing = (depths) => {
    return depths.reduce((sum, depth, i) => {
        const isIncreasing = depths[i + 1] ? depths[i + 1] > depth : false;

        return isIncreasing ? sum + 1 : sum;
    }, 0)
}

const calcDepthsWithinWindow = (depths, windowSize) => {
    const result = [];

    for (let i = 0; i < depths.length; i++) {
        let j = 0;
        let sum = 0;

        while (j < windowSize) {
            if (depths[i + j]) {
                sum += depths[i + j];
            }
            j++;
        }

        result.push(sum);
    }

    return result;
}

const calcIncreasingSlidingWindow = (depths) => {
    const depthsWithinWindow = calcDepthsWithinWindow(depths, 3);

    return calcIncreasing(depthsWithinWindow);
}

// console.log(calcIncreasing(depths));
console.log(calcIncreasingSlidingWindow(depths));

const fs = require('fs');
const { nextTick } = require('process');

const input = fs.readFileSync('./input.txt', 'utf8');

const output = input.split('\n')
    .map(item => item
        .split('')
        .map(item => Number(item))
    );

const DIRECTIONS = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
];

function calcFlashes(octupuses, steps) {
    let sum = 0;
    const width = octupuses.length;
    const height = octupuses[0].length;
    let stepFlashes = 0;
    let step = 0;
    while (stepFlashes !== width * height) {
        let queue = [];
        const flashed = new Set();
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                octupuses[i][j] += 1;
    
                if (octupuses[i][j] > 9) {
                    queue.push([i, j]);
                    flashed.add(`${i},${j}`);
                }
            }
        }

        while (queue.length) {
            const [x, y] = queue.pop();

            const maxEnergy = increaseEnergy(x, y, flashed);

            sum += 1;

            if (maxEnergy.length) {
                queue = queue.concat(maxEnergy);
            }
        }

        stepFlashes = flashed.size;
        step++;
    }

    function increaseEnergy(x, y, flashed) {
        const maxEnergy = [];
        octupuses[x][y] = 0;

        DIRECTIONS.forEach(direction => {
            const nextX = x + direction[0];
            const nextY = y + direction[1];

            if (nextX >= 0 && nextX < width && nextY >= 0 && nextY < height && !flashed.has(`${nextX},${nextY}`)) {
                octupuses[nextX][nextY] += 1;

                if (octupuses[nextX][nextY] > 9) {
                    octupuses[nextX][nextY] = 0;
                    flashed.add(`${nextX},${nextY}`);

                    maxEnergy.push([nextX, nextY]);
                }
            }
        });

        return maxEnergy;
    }

    return step;
}

console.log(calcFlashes(output, 100));
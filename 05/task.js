const fs = require('fs');
const input = fs.readFileSync('input.txt', { encoding: 'utf8' });

const output = input
    .split('\n')
    .filter(item => item)
    .map(item => item
        .split(' -> ')
        .filter(item => item)
        .map(item => item
            .split(',')
            .filter(item => item)
        )
    );

function calcK(start, end) {
    if (start[0] === end[0]) {
        return 0;
    }

    return (end[1] - start[1])/(end[0] - start[0]);
}

function calcB(start, k) {
    if (k === 0) {
        return Number(start[1]);
    }

    return start[1] - k * start[0];
}

function calcLines(points) {
    const lines = {};

    for (let i = 0; i < points.length; i++) {
        const startX = Number(points[i][0][0]);
        const startY = Number(points[i][0][1]);
        const endX = Number(points[i][1][0]);
        const endY = Number(points[i][1][1]);

        const k = calcK(points[i][0], points[i][1]);
        const b = calcB(points[i][0], k);

        if (k === 0) {
            if (startY === endY) {
                for (let x = Math.min(startX, endX); x <= Math.max(startX, endX); x++) {
                    const y = startY;

                    if (lines[`${x},${y}`] !== undefined) {
                        lines[`${x},${y}`] = lines[`${x},${y}`] + 1;
                    } else {
                        lines[`${x},${y}`] = 1;
                    }
                }
            } else if (startX === endX) {
                for (let y = Math.min(startY, endY); y <= Math.max(startY, endY); y++) {
                    const x = startX;

                    if (lines[`${x},${y}`]) {
                        lines[`${x},${y}`] = lines[`${x},${y}`] + 1;
                    } else {
                        lines[`${x},${y}`] = 1;
                    }
                }
            }
        } else {
            for (let x = Math.min(startX, endX); x <= Math.max(startX, endX); x++) {
                const y = k * x + b;

                if (lines[`${x},${y}`] !== undefined) {
                    lines[`${x},${y}`] = lines[`${x},${y}`] + 1;
                } else {
                    lines[`${x},${y}`] = 1;
                }
            }
        }
    }

    return lines;
}

function calcSum(lines) {
    let sum = 0;
    const values = Object.values(lines);

    for (let i = 0; i < values.length; i++) {
        if (values[i] > 1) {
            sum++;
        }
    }

    return sum;
}



const lines = calcLines(output);
console.log(lines);

console.log(calcSum(lines));

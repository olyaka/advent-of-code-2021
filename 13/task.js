const fs = require('fs');
const input = fs.readFileSync('input.txt', { encoding: 'utf8' });

const output = input.trim()
    .split('\n\n');

const dots = output[0]
    .split('\n')
    .filter(item => item)
    .map(item => item
        .split(',')
        .map(item => Number(item)));
const commands = output[1]
    .split('\n')
    .filter(item => item)
    .map(item => {
        if (item.match(/fold along x=\d*/)) {
            return [Number(item.match(/fold along x=(\d*)/)[1]), 0];
        }

        return [0, Number(item.match(/fold along y=(\d*)/)[1])];
    });

function foldHorizontal(dots, line) {
    return Array.from(dots.reduce((acc, dot) => {
        if (dot[1] < line) {
            acc.add(`${dot[0]},${dot[1]}`);
        } else {
            acc.add(`${dot[0]},${2 * line - dot[1]}`);
        }

        return acc;
    }, new Set)).map(item => item
        .split(',')
        .map(item => Number(item)));
}

function foldVertical(dots, line) {
    return Array.from(dots.reduce((acc, dot) => {
        if (dot[0] < line) {
            acc.add(`${dot[0]},${dot[1]}`);
        } else {
            acc.add(`${2 * line - dot[0]},${dot[1]}`);
        }

        return acc;
    }, new Set)).map(item => item
        .split(',')
        .map(item => Number(item)));
}

function execCommands(dots, commands) {
    let currentDots = dots;

    for (let i = 0; i < commands.length; i++) {
        if (commands[i][0] === 0) {
            currentDots = foldHorizontal(currentDots, commands[i][1]);
        } else {
            currentDots = foldVertical(currentDots, commands[i][0]);
        }
    }

    return currentDots;
}

const result = execCommands(dots, commands);
const resultDots = result.reduce((acc, dot) => {
    acc.add(`${dot[0]},${dot[1]}`);

    return acc;
}, new Set())
const xMax = Math.max(...result.map(item => item[0])) + 1;
const yMax = Math.max(...result.map(item => item[1])) + 1;

console.log(resultDots);

for (let i = 0; i < yMax; i++) {
    let string ='';
    for (let j = 0; j < xMax; j++) {
        if (resultDots.has(`${j},${i}`)) {
            string += '#';
        } else {
            string += '.';
        }
    }

    console.log(string);
}

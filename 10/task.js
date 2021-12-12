const fs = require('fs');
const input = fs.readFileSync('input.txt', { encoding: 'utf8' });

const output = input.trim()
    .split('\n')
    .filter(item => item)
    .map(item => item
        .split('')
    );

const CHARACTER_PAIRS = {
    '(': ')',
    '{': '}',
    '[': ']',
    '<': '>',
};

const CHARACTER_SCORE = {
    ')': 3,
    '}': 1197,
    ']': 57,
    '>': 25137,
};

const INCOMPLETE_SCORE = {
    '(': 1,
    '{': 3,
    '[': 2,
    '<': 4,
};

const OPENING = Object.keys(CHARACTER_PAIRS);

function findCorrupt(lines) {
    const corruptIndexes = [];
    const incomplete = [];
    let result = 0;

    for (let i = 0; i < lines.length; i++) {
        let openingStack = [];
        for (let j = 0; j < lines[i].length; j++) {
            if (OPENING.includes(lines[i][j])) {
                openingStack.push(lines[i][j]);
            } else {
                if (CHARACTER_PAIRS[openingStack.pop()] !== lines[i][j]) {
                    corruptIndexes.push(i);
                    result += CHARACTER_SCORE[lines[i][j]]
                    break;
                }
            }
        }

        if (openingStack.length !== 0 && !corruptIndexes.includes(i)) {
            incomplete.push(openingStack);
        }
    }

    return { corruptIndexes, incomplete };
}

function complete(incomplete) {
    const result = [];

    for (let i = 0; i < incomplete.length; i++) {
        let currentResult = 0;
        const reversed = incomplete[i].reverse();

        for (let j = 0; j < reversed.length; j++) {
            currentResult = currentResult * 5 + INCOMPLETE_SCORE[reversed[j]];
        }

        result.push(currentResult);
    }

    console.log(result.sort((a, b) => b - a));

    return result.sort((a, b) => b - a)[Math.floor(result.length / 2)];
}

console.log(complete(findCorrupt(output).incomplete));

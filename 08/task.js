const fs = require('fs');
const input = fs.readFileSync('input.txt', { encoding: 'utf8' });

const output = input.trim()
    .split('\n')
    .filter(item => item)
    .map(item => item
        .split('|')
        .filter(item => item)
        .map(item => item
            .split(' ')
            .filter(item => item)
        )
    );

function calcDigits(strings) {
    const result = [];

    for (let i = 0; i < strings.length; i++) {
        const currentString = strings[i];
        switch (currentString.length) {
            case 2:
            case 3:
            case 4:
            case 7:
                result.push(currentString);
        }
    }

    return result;
}

function getSortedString(str) {
    return Array.from(str).sort().join('')
};

function getDigit(strings) {
    let result = 0;

    for (let i = 0; i < strings.length; i++) {
        const { items, mapper } = strings[i];
        let number = '';
        for (let j = 0; j < items.length; j++) {
            const currentString = getSortedString(items[j]);

            // console.log(mapper[currentString]);
            // console.log(mapper, currentString);

            switch (currentString.length) {
                case 2:
                    number += 1;
                    break;
                case 3:
                    number += 7;
                    break;
                case 4:
                    number += 4;
                    break;
                case 7:
                    number += 8;
                    break;
                default:
                    number += mapper[currentString];
                    break;
            }
        }

        result += Number(number);
    }

    return result;
}

function calcCode(digits) {
    const sorted = digits.sort((a, b) => a.length > b.length);
    const resMap = {};

    const one = Array.from(sorted[0]);
    const seven = Array.from(sorted[1]);
    const four = Array.from(sorted[2]);
    const unknown5_1 = Array.from(sorted[3]);
    const unknown5_2 = Array.from(sorted[4]);
    const unknown5_3 = Array.from(sorted[5]);
    const unknown6_1 = Array.from(sorted[6]);
    const unknown6_2 = Array.from(sorted[7]);
    const unknown6_3 = Array.from(sorted[8]);
    const eight = Array.from(sorted[9]);

    resMap.a = seven.find(letter => !one.includes(letter));
    resMap.c = one.find(letter => !unknown6_1.includes(letter) || !unknown6_2.includes(letter) || !unknown6_3.includes(letter));
    resMap.f = one.find(letter => letter !== resMap.c);
    resMap.d = four
        .filter(letter => !one.includes(letter))
        .find(letter => unknown5_1.includes(letter) && unknown5_2.includes(letter) && unknown5_3.includes(letter));
    resMap.b = four.find(letter => !one.includes(letter) && letter !== resMap.d);
    resMap.g = unknown6_1.find(
        letter => !seven.includes(letter)
        && !one.includes(letter)
        && !four.includes(letter)
        && unknown6_2.includes(letter)
        && unknown6_3.includes(letter)
        && unknown5_1.includes(letter)
        && unknown5_2.includes(letter)
        && unknown5_3.includes(letter)
    );
    console.log(resMap, eight);
    resMap.e = eight.find(letter => !Object.values(resMap).includes(letter));
    console.log(resMap.e);

    return resMap;
}

function getOutputStrings(input) {
    return input.reduce((acc, curr) => {
        return acc.concat(curr[1]);
    }, [])
}

function getDigits(input) {
    return input.map(item => item[0]);
}

function getMapper(code) {
    console.log('code',code);
    return {
        [getSortedString(`${code.a}${code.b}${code.c}${code.e}${code.f}${code.g}`)]: 0,
        [getSortedString(`${code.c}${code.f}`)]: 1,
        [getSortedString(`${code.a}${code.c}${code.d}${code.e}${code.g}`)]: 2,
        [getSortedString(`${code.a}${code.c}${code.d}${code.f}${code.g}`)]: 3,
        [getSortedString(`${code.b}${code.c}${code.d}${code.f}`)]: 4,
        [getSortedString(`${code.a}${code.b}${code.d}${code.f}${code.g}`)]: 5,
        [getSortedString(`${code.a}${code.b}${code.d}${code.e}${code.f}${code.g}`)]: 6,
        [getSortedString(`${code.a}${code.c}${code.f}`)]: 7,
        [getSortedString(`${code.a}${code.b}${code.c}${code.d}${code.e}${code.f}${code.g}`)]: 8,
        [getSortedString(`${code.a}${code.b}${code.c}${code.d}${code.f}${code.g}`)]: 9,
    }
}

// const strings = getOutputStrings(output);
// console.log(calcDigits(strings).length);
console.log(getDigit(output.map(line => {
    return {
        mapper: getMapper(calcCode(line[0])),
        items: line[1],
    }
})));

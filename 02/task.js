const fs = require('fs');
const input = fs.readFileSync('input.txt', { encoding: 'utf8' });

const COMMANDS = {
    FORWARD: 'forward',
    DOWN: 'down',
    UP: 'up',
}

const commands = input.split('\n').filter(item => item).map(item => {
    const data = item.split(' ');

    return { command: data[0], offset: Number(data[1]) };
});

console.log(commands);

const calcPosition = (start, commands) => {
    let { x, depth, aim } = start;

    for (let i = 0; i < commands.length; i++) {
        const { command, offset } = commands[i];

        switch (command) {
            case COMMANDS.DOWN:
                aim += offset;
                // depth += offset;
                break;
            case COMMANDS.UP:
                aim -= offset;
                // depth -= offset;
                break;
            case COMMANDS.FORWARD:
                x += offset;
                depth += offset * aim;
                break;
        }

        console.log(x, depth, aim);
    }

    return { x, depth, aim };
}

const { x, depth, aim } = calcPosition({ x: 0, depth: 0, aim: 0 }, commands);

console.log(x, depth);

console.log(x * depth);

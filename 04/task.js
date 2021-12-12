const fs = require('fs');
const input = fs.readFileSync('input.txt', { encoding: 'utf8' });

const output = input.split('\n\n').filter(item => item);
const commands = output[0].split(',');
const boards = output.slice(1).map((board) => board.split('\n').filter(item => item).map((row) => (row.split(' ').filter(item => item))));
const columns = [];

function calcWinner(boards, commands) {
    for (let c = 0; c < commands.length; c++) {
        const command = commands[c];

        for (let i = 0; i < boards.length; i++) {
            if (!columns[i]) {
                columns[i] = {};
            }

            for (let j = 0; j < boards[i].length; j++) {
                for (let k = 0; k < boards[i][j].length; k++) {
                    if (boards[i][j][k] === command) {
                        if (columns[i][k]) {
                            columns[i][k] += 1;
                        } else {
                            columns[i][k] = 1;
                        }

                        boards[i][j][k] = true;
                    }
                }

                if (columns[i] && Object.values(columns[i]).find(column => column === boards[i].length)) {
                    return { columns, command, commandIndex: c,  board: boards[i], boardIndex: i };
                }

                if (boards[i][j].filter(number => number !== true).length === 0) {
                    boards[i].splice(j, 1);
                    return { columns, command, commandIndex: c,  board: boards[i], boardIndex: i };
                }
            }
        }
    }
}

function calcScore(board, command) {
    let result = 0;

    board.forEach((row) => row.forEach((number) => {
        result += number === true ? 0 : Number(number);
    }));

    return result * Number(command);
}

function calcLastToWin(boards, commands) {
    let currentCommands = [...commands];
    let lastCommand;
    let winner;

    while (!winner) {
        const { command, commandIndex, boardIndex } = calcWinner(boards, currentCommands);

        // console.log(boards);

        if (boards.length === 1) {
            lastCommand = command;
            winner = boards[0];
        }

        boards.splice(boardIndex, 1);
        columns.splice(boardIndex, 1);
        currentCommands = currentCommands.slice(commandIndex);
    }

    return { command: lastCommand, board: winner };
}

// const { command, board } = calcWinner(boards, commands);
const { command, board } = calcLastToWin(boards, commands);
console.log(boards, command, board);

console.log(calcScore(board, command));

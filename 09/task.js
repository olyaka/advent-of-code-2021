const fs = require('fs');
const input = fs.readFileSync('input.txt', { encoding: 'utf8' });

const output = input.trim()
    .split('\n')
    .filter(item => item)
    .map(item => item
        .split('')
        .map(item => Number(item))
    );

function calcLowest(depth) {
    let sum = 0;
    const result = [];
    for (let i = 0; i < depth.length; i++) {
        for (let j = 0; j < depth[i].length; j++) {
            const neighbours = [];

            if (i > 0) {
                neighbours.push(depth[i - 1][j]);
            }

            if (i < depth.length - 1) {
                neighbours.push(depth[i + 1][j]);
            }

            if (j > 0) {
                neighbours.push(depth[i][j - 1]);
            }

            if (j < depth[i].length - 1) {
                neighbours.push(depth[i][j + 1]);
            }

            if (depth[i][j] === Math.min(depth[i][j], ...neighbours) && !neighbours.includes(depth[i][j])) {
                sum = sum + depth[i][j] + 1;
                result.push([i, j]);
            }
        }
    }

    return result;
}

function calcBasins(depth, lowest) {
    const result = [];

    for (let i = 0; i < lowest.length; i++) {
        const current = lowest[i];
        const x = current[0];
        const y = current[1];
        let set = new Set();

        dfs(depth, x, y, set);

        if (set.size) {
            result.push(set);
        }
    }

    return result;
}

function dfs(grid, i, j, set) {
    if (i > 0) {
        // if (grid[i][j] - grid[i - 1][j] === -1) {
            set.add(`${i},${j}`);
            addToBasin(grid, i - 1, j, set);
        // }
    }

    if (i < grid.length - 1) {
        // if (grid[i][j] - grid[i + 1][j] === -1) {
            set.add(`${i},${j}`);
            addToBasin(grid, i + 1, j, set);
        // }
    }

    if (j > 0) {
        // if (grid[i][j] - grid[i][j - 1] === -1) {
            set.add(`${i},${j}`);
            addToBasin(grid, i, j - 1, set);
        // }
    }

    if (j < grid[i].length - 1) {
        // if (grid[i][j] - grid[i][j + 1] === -1) {
            set.add(`${i},${j}`);
            addToBasin(grid, i, j + 1, set);
        // }
    }
}

function addToBasin(grid, i, j, set) {
    if (grid[i][j] !== 9 && !set.has(`${i},${j}`)) {
        set.add(`${i},${j}`);
        dfs(grid, i, j, set);
    }
}

const basins = calcBasins(output, calcLowest(output)).sort((a, b) => {
    return b.size - a.size;
});
console.log(basins.length);
const largestBasins = basins[0].size * basins[1].size * basins[2].size;
// console.log(basins[0], basins[1], basins[2]);

console.log(largestBasins);

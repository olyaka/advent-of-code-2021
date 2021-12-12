const fs = require('fs');
const input = fs.readFileSync('input.txt', { encoding: 'utf8' });

const output = input.trim()
    .split('\n')
    .filter(item => item)
    .reduce((acc, line) => {
        const caves = line.split('-');

        if (!acc[caves[0]]) {
            acc[caves[0]] = [];
        }

        if (!acc[caves[1]]) {
            acc[caves[1]] = [];
        }

        acc[caves[0]].push(caves[1]);
        acc[caves[1]].push(caves[0]);

        return acc;
    }, {});

function findPaths(cavesMap) {
    const result = [];

    findPath('start', { path: [], isVisited: false });

    function findPath(node, path) {
        if (node === 'end') {
            result.push([...path.path, node]);

            return;
        }

        const { canVisit, shouldSetIsVisited } = isNodeCanBeVisited(node, path);

        if (canVisit) {
            for (let i = 0; i < cavesMap[node].length; i++) {
                path.path.push(node);
                findPath(cavesMap[node][i], { path: path.path, isVisited: path.isVisited || shouldSetIsVisited } );
                path.path.pop();
            }
        }
    }


    function isNodeCanBeVisited(node, path) {
        if (node === node.toUpperCase()) {
            return { canVisit: true, shouldSetIsVisited: false };
        }

        if (!path.path.includes(node)) {
            return { canVisit: true, shouldSetIsVisited: false };
        }

        if (node !=='start' && node !== 'end' && !path.isVisited) {
            return { canVisit: true, shouldSetIsVisited: true };
        }

        return { canVisit: false, shouldSetIsVisited: false };
    }

    return result.map(item => item.join(','));
}

console.log(findPaths(output).length);

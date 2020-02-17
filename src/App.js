import React, { useState } from 'react';
import _ from 'lodash';
import './App.css';

function makeGrid(grid, setGrid) {
    function makeCell(x, y) {
        const idx = getCellIndex(x, y);
        const value = grid[idx];

        function onChange(event) {
            const value = event.target.value || undefined;

            if (!value || (value > 0 && value < 10)) {
                const newGrid = _.clone(grid);
                newGrid[idx] = value;
                setGrid(newGrid);
            }
        }

        return (
            <td>
                <input type="number" value={value} onChange={onChange} />
            </td>
        );
    }

    function makeRow(y) {
        return (
            <tr>
                {
                    _.range(0, 9)
                        .map((x) => makeCell(x, y))
                }
            </tr>
        );
    }

    return makeRow;
}

function getCellIndex(x, y) {
    return x + (y * 9);
}

function getColumn(x, y) {
    return _(_.range(0, 9))
        .filter(newY => newY != y)
        .map(y => [x, y])
        .value();
}

function getRow(x, y) {
    return _(_.range(0, 9))
        .filter(newX => newX != x)
        .map(x => [x, y])
        .value();
}

function getBlock(x, y) {
    const x_start = x - (x % 3);
    const y_start = y - (y % 3);

    return _(_.range(0, 3))
        .flatMap(y => _.range(0, 3)
            .map(x => [x + x_start, y + y_start]))
        .filter(([a, b]) => a != x || b != y)
        .value();
}

function findMissing(grid, x, y) {
    const idx = getCellIndex(x, y);
    const values = _(getColumn(x, y))
        .concat(getRow(x, y))
        .concat(getBlock(x, y))
        .map(([x, y]) => _.toNumber(grid[getCellIndex(x, y)]))
        .filter(x => _.isFinite(x))
        .uniq()
        .sort()
        .value();
    return values;
}

function solve(grid, setGrid) {
    const new_grid = _.clone(grid);

    for (let y = 0; y < 9; ++y) {
        for (let x = 0; x < 9; ++x) {

            const idx = getCellIndex(x, y);
            if (!!new_grid[idx]) {
                continue;
            }

            const values = findMissing(new_grid, x, y);

            if (values.length === 8) {
                const possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                const value = _(possibilities)
                    .filter(x => !_(values).some(y => x === y))
                    .nth(0);
                new_grid[idx] = value;
                setGrid(new_grid);
            }
        }
    }
}

function App() {

    const [grid, setGrid] = useState(
        // _.range(0, 81).map(x => undefined),
        [
            undefined, undefined, 2, undefined, undefined, undefined, 6, undefined, undefined,
            undefined, 3, 1, 6, undefined, undefined, undefined, 2, 4,
            8, undefined, undefined, 2, 9, undefined, undefined, undefined, undefined,
            undefined, undefined, 9, 3, undefined, 7, 5, 4, undefined,
            undefined, 5, 4, undefined, 2, undefined, 7, 6, undefined,
            undefined, 7, 8, 4, undefined, 6, 3, undefined, undefined,
            undefined, undefined, undefined, undefined, 1, 9, undefined, undefined, 6,
            7, 2, undefined, undefined, undefined, 3, 9, 1, undefined,
            undefined, undefined, 3, undefined, undefined, undefined, 4, undefined, undefined,
        ],
    );

    const makeRow = makeGrid(grid, setGrid);

    return (
        <div className="App">
            <table>
                {
                    _.range(0, 9)
                        .map(makeRow)
                }
            </table>
            <button type="button" onClick={() => solve(grid, setGrid)}> Solve </button>
        </div>
    );
}

export default App;

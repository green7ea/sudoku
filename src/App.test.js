import App from './App';

import {
    getBlock,
    getCellIndex,
    getColumn,
    getRow,
} from './App';

test('getCellIndex', () => {
    expect(getCellIndex(0, 0)).toEqual(0);
    expect(getCellIndex(1, 0)).toEqual(1);
    expect(getCellIndex(0, 1)).toEqual(9);
    expect(getCellIndex(1, 1)).toEqual(10);
});

test('getColumn', () => {
    expect(getColumn(5, 3))
        .toEqual([
            [5, 0],
            [5, 1],
            [5, 2],
            [5, 4],
            [5, 5],
            [5, 6],
            [5, 7],
            [5, 8],
            [5, 9],
        ]);
});

test('getRow', () => {
    expect(getRow(5, 3))
        .toEqual([
            [0, 3],
            [1, 3],
            [2, 3],
            [3, 3],
            [4, 3],
            [6, 3],
            [7, 3],
            [8, 3],
            [9, 3],
        ]);
});

test('getBlock', () => {
    expect(getBlock(7, 3))
        .toEqual([
            [6, 3],
            [8, 3],
            [6, 4],
            [7, 4],
            [8, 4],
            [6, 5],
            [7, 5],
            [8, 5],
        ]);
});

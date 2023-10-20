const DEFAULT_SIZE = 3;
export class Board {
    constructor(size) {
        this.winning = [];
        this.placed = 0;
        this.testLine = (i, j) => {
            return this.testOverRange(x => i, x => x, this.cells[i][j]);
        };
        this.testColumn = (i, j) => {
            return this.testOverRange(x => x, x => j, this.cells[i][j]);
        };
        this.testDiagonal = (i, j) => {
            return (i == j && this.testOverRange(x => x, x => x, this.cells[i][j]));
        };
        this.testAntidiagonal = (i, j) => {
            return (i == this.size - 1 - j && this.testOverRange(x => x, x => this.size - 1 - x, this.cells[i][j]));
        };
        this.size = size !== null && size !== void 0 ? size : DEFAULT_SIZE;
        this.range = [...Array(this.size).keys()];
        this.cells = this.range.map(() => Array(this.size));
        this.capacity = this.size * this.size;
    }
    place(coordinate, player) {
        const { i, j } = coordinate;
        this.placed++;
        this.cells[i][j] = player;
        return this.checkWin(coordinate);
    }
    at(i, j) {
        return this.cells[i][j];
    }
    isFull() {
        return this.placed >= this.capacity;
    }
    checkWin({ i, j }) {
        const player = this.cells[i][j];
        return [
            this.testLine,
            this.testColumn,
            this.testDiagonal,
            this.testAntidiagonal
        ].some(test => test(i, j));
    }
    testOverRange(fI, fJ, player) {
        if (this.range.every(x => this.cells[fI(x)][fJ(x)] == player)) {
            this.winning = this.range.map(x => ({ i: fI(x), j: fJ(x) }));
            return true;
        }
        return false;
    }
}

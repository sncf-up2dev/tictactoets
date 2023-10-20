import { Coordinate } from "./Coordonate.js";
import { Player } from "./Player.js";

const DEFAULT_SIZE = 3;

export class Board {

    private readonly size: number;
    private readonly range: number[];
    private readonly cells: Player[][];
    private readonly capacity: number;
    public winning: Coordinate[] = [];
    private placed = 0;

    public constructor(size?: number) {
        this.size = size ?? DEFAULT_SIZE;
        this.range = [...Array(this.size).keys()];
        this.cells = this.range.map(() => Array(this.size));
        this.capacity = this.size * this.size;
    }

    public place(coordinate: Coordinate, player: Player): boolean {
        const {i, j} = coordinate;
        this.placed++;
        this.cells[i][j] = player;
        return this.checkWin(coordinate);
    }

    public at(i: number, j: number): Player {
        return this.cells[i][j];
    }

    public isFull(): boolean {
        return this.placed >= this.capacity;
    }

    private checkWin({i, j}: Coordinate): boolean {
        const player = this.cells[i][j];

        return [
            this.testLine,
            this.testColumn,
            this.testDiagonal,
            this.testAntidiagonal
        ].some(test => test(i, j));
    }

    private testOverRange(fI: (i: number) => number, fJ: (j: number) => number, player: Player): boolean {
        if (this.range.every(x => this.cells[fI(x)][fJ(x)] == player)) {
            this.winning = this.range.map(x => ({i: fI(x), j: fJ(x)}));
            return true;
        }
        return false;
    }

    private testLine = (i: number, j: number): boolean => {
        return this.testOverRange(x => i, x => x, this.cells[i][j]);
    }

    private testColumn = (i: number, j: number): boolean => {
        return this.testOverRange(x => x, x => j, this.cells[i][j]);
    }

    private testDiagonal = (i: number, j: number): boolean => {
        return (i == j && this.testOverRange(x => x, x => x, this.cells[i][j]))
    }

    private testAntidiagonal = (i: number, j: number): boolean => {
        return (i == this.size - 1 - j && this.testOverRange(x => x, x => this.size - 1 - x, this.cells[i][j]))
    }
}
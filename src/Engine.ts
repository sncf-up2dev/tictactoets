import { Board } from "./Board.js";
import { Coordinate } from "./Coordonate.js";
import { Player } from "./Player.js";

export class Engine {

    private readonly board: Board;

    public constructor(
        size?: number,
        public currentPlayer: Player = 'X',
    ) {
        this.board = new Board(size);
    }

    public get winningCombination(): Coordinate[] {
        return this.board.winning;
    }

    public get gameOver(): boolean {
        return this.board.isFull();
    }

    public place(i: number, j: number): boolean {
        if (!this.currentPlayer) {
            throw new Error("Current player should not be null at this stage!");
        }
        if (!this.canPlace(i, j)) {
            throw new Error(`Cell not empty at ($i, $j)`);
        }
        const next = {i, j};
        const result = this.board.place(next, this.currentPlayer);
        this.flipPlayer();
        return result;
    }

    public canPlace(i: number, j: number): boolean {
        return !this.board.at(i, j);
    }

    private flipPlayer(): Player {
        return this.currentPlayer = this.currentPlayer == 'X' ? 'Y' : 'X';
    }
}
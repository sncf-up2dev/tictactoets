import { Board } from "./Board.js";
export class Engine {
    constructor(size, currentPlayer = 'X') {
        this.currentPlayer = currentPlayer;
        this.board = new Board(size);
    }
    get winningCombination() {
        return this.board.winning;
    }
    get gameOver() {
        return this.board.isFull();
    }
    place(i, j) {
        if (!this.currentPlayer) {
            throw new Error("Current player should not be null at this stage!");
        }
        if (!this.canPlace(i, j)) {
            throw new Error(`Cell not empty at ($i, $j)`);
        }
        const next = { i, j };
        const result = this.board.place(next, this.currentPlayer);
        this.flipPlayer();
        return result;
    }
    canPlace(i, j) {
        return !this.board.at(i, j);
    }
    flipPlayer() {
        return this.currentPlayer = this.currentPlayer == 'X' ? 'Y' : 'X';
    }
}

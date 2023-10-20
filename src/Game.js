import { Engine } from "./Engine.js";
export class Game {
    constructor(el, size) {
        this.el = el;
        this.size = size;
        this.buttons = [];
        this.engine = new Engine(size);
    }
    generate() {
        this.el.childNodes.forEach(e => e.remove());
        for (let i = 0; i < this.size; i++) {
            const line = document.createElement('div');
            this.el.appendChild(line);
            this.buttons[i] = [];
            for (let j = 0; j < this.size; j++) {
                const button = document.createElement('button');
                button.onclick = this.createClickHandler(i, j);
                button.innerHTML = '&nbsp;';
                line.appendChild(button);
                this.buttons[i][j] = button;
            }
        }
    }
    createClickHandler(i, j) {
        return () => {
            if (this.engine.canPlace(i, j)) {
                this.buttons[i][j].innerHTML = this.engine.currentPlayer;
                if (this.engine.place(i, j)) {
                    this.markWinningCombination();
                }
            }
        };
    }
    markWinningCombination() {
        this.engine.winningCombination.forEach(({ i, j }) => {
            this.buttons[i][j].style.fontWeight = 'Bold';
        });
    }
}

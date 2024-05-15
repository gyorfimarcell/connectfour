const container = document.getElementById("container");
let board;
let playerNumbers = [];
const winElement = document.getElementById("win");

let player1Active = true;

const player1Color = "red";
const player2Color = "yellow";

function InitBoard() {
    board = document.createElement("div");
    board.id = "board";

    for (let index = 0; index < 7; index++) {
        const col = document.createElement("div");
        col.className = "col";

        for (let index = 0; index < 6; index++) {
            const hole = document.createElement("div");
            hole.className = "hole"
            col.appendChild(hole);
        }

        col.addEventListener("click", () => ColClicked(col));

        board.appendChild(col);
    }

    container.appendChild(board);
}

function AddPlayerBox(player) {
    const box = document.createElement("div");
    box.className = "player-box";

    const icon = document.createElement("div");
    icon.className = "icon";
    icon.classList.add(`icon-${player}`);
    icon.innerText = "🙉";
    box.appendChild(icon);

    const name = document.createElement("p");
    name.innerText = `Player ${player}`;
    box.appendChild(name);

    const number = document.createElement("p");
    number.innerText = "0";
    box.appendChild(number);
    playerNumbers.push(number);

    container.appendChild(box);
}

function ColClicked(col) {
    const holes = col.querySelectorAll(".hole");

    if (holes.length == 0) {
        return;
    }

    const tokensInCol = col.querySelectorAll(".token").length;

    const token = document.createElement("token");
    token.style.setProperty("--drop-offset", -590 + (32 + 64) * tokensInCol + "px");
    token.style.animationDuration = 0.5 / 7 * holes.length + "s";
    token.classList.add("token", `player-${player1Active ? "1" : "2"}-token`);

    col.insertBefore(token, holes[0]);
    col.removeChild(holes[0]);

    const playerText = playerNumbers[player1Active ? 0 : 1];
    playerText.innerText = Number(playerText.innerText) + 1;

    CheckForWin(player1Active ? 1 : 2);
    ChangeTurn();
}

function ChangeTurn() {
    player1Active = !player1Active;
    board.style.setProperty("--active-player-color", `var(--player-${player1Active ? "1" : "2"})`);
}

function CheckForWin(player) {
    if (VerticalWin(player) || HorizontalWin(player) || DiagonalWin(player)) {
        winElement.querySelector(".win-bg").innerText = `Player ${player} Wins!`;
        winElement.style.display = "";
    }
}

function VerticalWin(player) {
    let count = 0;
    for (let colIndex = 0; colIndex < 7; colIndex++) {
        for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
            if (board.children[colIndex].children[rowIndex].classList.contains(`player-${player}-token`)) {
                count++;
            }
            else {
                count = 0;
            }

            if (count == 4) {
                return true;
            }
        }
    }

    return false;
}

function HorizontalWin(player) {
    let count = 0;
    for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
        for (let colIndex = 0; colIndex < 7; colIndex++) {
            if (board.children[colIndex].children[rowIndex].classList.contains(`player-${player}-token`)) {
                count++;
            }
            else {
                count = 0;
            }

            if (count == 4) {
                return true;
            }
        }
    }

    return false;
}

function DiagonalWin(player) {
    for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
        for (let colIndex = 0; colIndex < 7; colIndex++) {
            let dir1 = [];
            let dir2 = [];

            for (let index = 0; index < 4; index++) {
                dir1.push(board.children[colIndex + index]?.children[rowIndex + index]);
                dir2.push(board.children[colIndex - index]?.children[rowIndex + index]);
            }

            if (dir1.filter(x => x != undefined && x.classList.contains(`player-${player}-token`)).length == 4
                || dir2.filter(x => x != undefined && x.classList.contains(`player-${player}-token`)).length == 4) {
                return true;
            }
        }
    }

    return false;
}

function StartGame() {
    AddPlayerBox(1);
    InitBoard();
    AddPlayerBox(2);
}

StartGame();
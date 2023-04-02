let board = document.querySelector('#game-board');
let message = document.querySelector('#message');
let shuffleButton = document.querySelector('#shuffle-button');

let pieces = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, null]
];
let emptyPiece = [2, 2];

function createBoard() {
    board.innerHTML = '';
    for (let i = 0; i < pieces.length; i++) {
        for (let j = 0; j < pieces[i].length; j++) {
            let tile = document.createElement('div');
            tile.classList.add('tile');
            tile.style.backgroundPositionX = `${-j * 100}px`;
            tile.style.backgroundPositionY = `${-i * 100}px`;
            tile.style.position = 'relative';
            if (pieces[i][j] === null) {
                tile.setAttribute('id', 'empty');
            } else {
                tile.setAttribute('id', `${i},${j}`);
            }
            board.appendChild(tile);
        }
    }
    message.innerHTML = '';
}

function shuffle() {
    // Implementation for shuffle algorithm
    // ...
    createBoard();
}

function swap(piece1, piece2) {
    // Implementation for swap algorithm
    // ...
    createBoard();
}

function checkWin() {
    for (let i = 0; i < pieces.length; i++) {
        for (let j = 0; j < pieces[i].length; j++) {
            if (pieces[i][j] !== (i * 3) + j + 1) {
                return false;
            }
        }
    }
    return true;
}

function movePiece(piece) {
    let id = piece.getAttribute('id').split(',');
    let row = parseInt(id[0]);
    let col = parseInt(id[1]);

    if (row > 0 && pieces[row - 1][col] === null) {
        swap([row, col], [row - 1, col]);
    } else if (row < 2 && pieces[row + 1][col] === null) {
        swap([row, col], [row + 1, col]);
    } else if (col > 0 && pieces[row][col - 1] === null) {
        swap([row, col], [row, col - 1]);
    } else if (col < 2 && pieces[row][col + 1] === null) {
        swap([row, col], [row, col + 1]);
    }

    if (checkWin()) {
        message.innerHTML = 'You win!';
    }
}

shuffleButton.addEventListener('click', shuffle);

createBoard();

board.addEventListener('click', event => {
    let target = event.target;
    if (target.classList.contains('tile')) {
        movePiece(target);
    }
});

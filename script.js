const cells = document.querySelectorAll('[data-cell]');
const winningMessageTextElement = document.getElementById('winningMessageText');
const restartButton = document.getElementById('restartButton');
let isCircleTurn;
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    isCircleTurn = false;
    cells.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('circle');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setWinningMessage('');
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = isCircleTurn ? 'circle' : 'x';
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        setWinningMessage(`${isCircleTurn ? "O's" : "X's"} Wins!`);
    } else if (isDraw()) {
        setWinningMessage('Draw!');
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    isCircleTurn = !isCircleTurn;
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
}

function setWinningMessage(message) {
    winningMessageTextElement.innerText = message;
}

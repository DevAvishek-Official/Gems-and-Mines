let gridSize = 5;
let mineCount = 5;
let grid = [];
let gemCount = 1;
let gemClick = new Audio('assets/gemEffect.mp3');
let mineClick = new Audio('assets/mineEffect.mp3');
let gameBoard = document.querySelector('.grid');

document.addEventListener('onload', (defaultGame()));

function defaultGame() {
    grid = initializeGrid(gridSize);
    placeMines(grid, mineCount);
    displayGrid(grid);
    console.log(grid);
}

function startGame() {
    gemCount = 1;
    mineCount = parseInt(document.getElementById('mines').value);
    grid = initializeGrid(gridSize);
    placeMines(grid, mineCount);
    displayGrid(grid);
};

function initializeGrid(size) {
    let grid = [];
    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            row.push({ mine: false, revealed: false });
        }
        grid.push(row);
    }
    return grid;
};

function placeMines(grid, mineCount) {
    let size = grid.length;
    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
        let x = Math.floor(Math.random() * size);
        let y = Math.floor(Math.random() * size);
        if (!grid[x][y].mine) {
            grid[x][y].mine = true;
            minesPlaced++;
        }
    }
};

function displayGrid(grid) {
    gameBoard.innerHTML = '';
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', () => selectTile(i, j));
            gameBoard.appendChild(cell);
            let img = document.createElement('img');
            cell.appendChild(img);
        }
    }
};

function selectTile(x, y) {
    if (grid[x][y].revealed) return;

    grid[x][y].revealed = true;
    let cell = gameBoard.children[x * gridSize + y];

    cell.classList.add('fetching');
    setTimeout(() => {
        if (grid[x][y].mine) {
            cell.classList.add('mine');
            cell.style.backgroundImage = `url(assets/mineEffect.webp)`;
            cell.style.backgroundSize = `cover`;
            cell.firstChild.src = `assets/mine.svg`;
            cell.firstChild.style.scale = "1.4";
            cell.firstChild.style.opacity = "1";
            mineClick.play();
            revealMines();
        } else {
            cell.classList.add('gem');
            cell.firstChild.src = `assets/gem.svg`;
            cell.firstChild.style.scale = "1.4 ";
            cell.firstChild.style.opacity = "1";
            console.log(gemCount++);
            gemClick.play();
        }
        cell.classList.remove('fetching');
    }, 1000);
};

function revealMines() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            setTimeout(() => {
                if (grid[i][j].mine) {
                    let cell = gameBoard.children[i * gridSize + j];
                    cell.classList.add('mine');
                    cell.firstChild.src = `assets/mine.svg`;
                } else {
                    let cell = gameBoard.children[i * gridSize + j];
                    cell.classList.add('gem');
                    cell.firstChild.src = `assets/gem.svg`;
                }
            }, 500);
        }
    }
};
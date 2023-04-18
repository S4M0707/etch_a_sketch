// Toggles for different buttons.
let togglePen = true;
let toggleRGB = false;
let toggleEraser = false;

// This function is buit to create the entire grid.
const gridContainer = document.querySelector('.gridContainer');
function createGrid(n = 16) {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }

    for (let i = 0; i < n; i++) {
        let gridRow = document.createElement('div');
        gridRow.className = 'gridRow';
        gridRow.style.cssText = `height: ${100 / n}%;`;
        for (let j = 0; j < n; j++) {
            let gridCell = document.createElement('div');
            gridCell.className = `gridCell_${i}_${j}`;
            gridCell.style.cssText = `width: ${100 / n}%;`;
            gridRow.appendChild(gridCell);
        }
        gridContainer.appendChild(gridRow);
    }
}

function clearCanvas(e) {
    const cells = document.querySelectorAll('.gridRow > div');

    cells.forEach((cell) => {
        cell.style['background-color'] = '#eeeeee';
    });
}

let toggleDraw = false;
gridContainer.addEventListener('click', () => { toggleDraw = !toggleDraw; });

function pickColor() {
    if(togglePen) {
        return 'rgb(20, 46, 118)';
    }
    if(toggleRGB) {
        let r = (Math.floor(Math.random() * 1000)) % 256;
        let g = (Math.floor(Math.random() * 1000)) % 256;
        let b = (Math.floor(Math.random() * 1000)) % 256;

        return `rgb(${r}, ${g}, ${b})`;
    }
    if(toggleEraser) {
        return '#eeeeee';
    }
}

function draw() {
    const cells = document.querySelectorAll('.gridRow > div');
    cells.forEach((cell) => {
        cell.addEventListener('mouseover', () => {
            if (toggleDraw) {
                cell.style['background-color'] = pickColor();
            }
        })
    });
}

createGrid();
draw();

const pen = document.querySelector('.pen');
pen.addEventListener('click', () => {
    toggleRGB = false;
    toggleEraser = false;
    togglePen = true;
});

const colorBtn = document.querySelector('.colorBtn');
colorBtn.addEventListener('click', () => {
    toggleRGB = true;
    toggleEraser = false;
    togglePen = false;
});

const eraser = document.querySelector('.eraser');
eraser.addEventListener('click', () => {
    toggleRGB = false;
    toggleEraser = true;
    togglePen = false;
});

const clear = document.querySelector('.clear');
clear.addEventListener('click', clearCanvas);
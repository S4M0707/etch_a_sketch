// Toggles for different buttons.
let togglePen = true;           // By default Pen is active
let toggleRGB = false;
let toggleEraser = false;
let toggleDraw = false;

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
            const gridCell = document.createElement('div');
            gridCell.className = `gridCell_${i}_${j}`;
            gridCell.style.cssText = `width: ${100 / n}%;`;
            gridRow.appendChild(gridCell);
        }

        gridContainer.appendChild(gridRow);
    }
}

// Function for the Event of clear button
function clearCanvas(e) {
    const cells = document.querySelectorAll('.gridRow > div');

    cells.forEach((cell) => {
        cell.style['background-color'] = '#eeeeee';
    });
}

// To return the perticular color for different toggles
function pickColor() {
    if (togglePen) {
        return 'black';
    }
    if (toggleRGB) {
        let r = (Math.floor(Math.random() * 1000)) % 256;
        let g = (Math.floor(Math.random() * 1000)) % 256;
        let b = (Math.floor(Math.random() * 1000)) % 256;

        return `rgb(${r}, ${g}, ${b})`;
    }
    if (toggleEraser) {
        return '#eeeeee';
    }
}

function draw() {
    const cells = document.querySelectorAll('.gridRow > div');
    cells.forEach((cell) => {
        cell.addEventListener('mousedown', (e) => {
            toggleDraw = true;
            e.preventDefault()
        });

        cell.addEventListener('mouseup', (e) => {
            toggleDraw = false;
            e.preventDefault();
        });

        cell.addEventListener('mousemove', (e) => {
            if (toggleDraw) {
                cell.style['background-color'] = pickColor();
            }
            e.preventDefault();
        })

        cell.addEventListener('click', () => {
            cell.style['background-color'] = pickColor();
        });
    });
}

// Initializing
createGrid();
draw();

// Binding events to elements

const sizeGrid = document.querySelector('.sizeGrid');
sizeGrid.addEventListener('click', () => {
    try {
        let size = prompt("Enter the size of Grid between 1-100:");
        size = parseInt(size);
        console.log(size);

        if(isNaN(size))
            throw new Error("Not a Number");
        if (size < 0 || size > 100)
            throw new Error("Out of Limits");

        createGrid(size);
        draw();
    }
    catch (error) {
        console.log(error);
    }
});

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



const box = (container) => {

    const cellArray = [];

    const createGrid = (x, y, cellType, cellClass) => {
        for (let i = 0; i < x * y; i++) {
            cellArray[i] = document.createElement(cellType);
            cellArray[i].className = cellClass;
            cellArray[i].setAttribute("id", `cell${i}`);
            cellArray[i].addEventListener('mouseover',changeColor.bind(this,cellArray[i]));            
        }
        outputGrid(x, y);
    }    

    const outputGrid = (x, y) => {
        for (let i = 0; i < x * y; i++) {
            document.querySelector(container).appendChild(cellArray[i]);
        }
    }

    const changeColor = (cell) => {
        cell.style.background = "#" + Math.floor(Math.random()*65535).toString(16);
    }

    return Object.assign({}, { createGrid });
}

var etchBox = box('#box');

etchBox.createGrid(16, 16, 'div', 'pixel');

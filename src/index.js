import { create } from "domain";



const box = (container, resolution = 16) => {

    const grid = document.querySelector(container);
    const cellArray = [];
    let numOfCells = resolution;

    document.querySelector("#clear").addEventListener('click', clear);

    const createGrid = () => {
        for (let i = 0; i < numOfCells * numOfCells; i++) {
            cellArray[i] = document.createElement('div');
            cellArray[i].className = 'pixel';
            cellArray[i].setAttribute("id", `cell${i}`);
            cellArray[i].addEventListener('mouseover', changeColor.bind(this, cellArray[i]));
        }
        outputGrid(numOfCells);
    }

    const deleteGrid = () => {
        for (let i = 0; i < cellArray.length; i++) {
            grid.removeChild(cellArray[i]);
        }
        while(cellArray.length>0)
            cellArray.pop();                
    }

    function outputGrid(numOfCells) {
        for (let i = 0; i < numOfCells * numOfCells; i++) {
            grid.appendChild(cellArray[i]);
        }
        setResolution();        
    }

    const changeColor = (cell) => {
        cell.style.background = "#" + Math.floor(Math.random() * 65535).toString(16);
    }

    function clear() {
        popup();
        for (let i = 0; i < cellArray.length; i++) {
            cellArray[i].style.background = "white";
        }
        deleteGrid();
        createGrid();
    }

    function setResolution() {
        grid.style.setProperty('--res-x',numOfCells);
        grid.style.setProperty('--res-y',numOfCells);
    }

    function popup() {
        numOfCells = parseInt(prompt("Enter number of x and y pixels", 16));
        console.log(numOfCells);
    }

    return Object.assign({}, { createGrid });
}

var etchBox = box('#box');

etchBox.createGrid();

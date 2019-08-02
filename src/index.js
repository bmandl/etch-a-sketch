
import PCRE from "pcre-to-regexp";


const box = (container, resolution = 16) => {

    const grid = document.querySelector(container);
    const cellArray = [];
    let numOfCells = resolution;
    var bw = false;

    document.querySelector("#clear").addEventListener('click', clear);
    document.querySelector("#shader").addEventListener('click', function () { bw = true; clear(); });
    document.querySelector("#rainbow").addEventListener('click', function () { bw = false; clear(); });

    function RGBToHSL(rgb) {
        let sep = rgb.indexOf(",") > -1 ? "," : " ";
        rgb = rgb.substr(4).split(")")[0].split(sep);

        for (let R in rgb) {
            let r = rgb[R];
            if (r.indexOf("%") > -1)
                rgb[R] = Math.round(r.substr(0, r.length - 1) / 100 * 255);
        }
        // Make r, g, and b fractions of 1
        let r = rgb[0] / 255,
            g = rgb[1] / 255,
            b = rgb[2] / 255;

        // Find greatest and smallest channel values
        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;

        // Calculate hue
        // No difference
        if (delta == 0)
            h = 0;
        // Red is max
        else if (cmax == r)
            h = ((g - b) / delta) % 6;
        // Green is max
        else if (cmax == g)
            h = (b - r) / delta + 2;
        // Blue is max
        else
            h = (r - g) / delta + 4;

        h = Math.round(h * 60);

        // Make negative hues positive behind 360°
        if (h < 0)
            h += 360;

        // Calculate lightness
        l = (cmax + cmin) / 2;

        // Calculate saturation
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        // Multiply l and s by 100
        s = Math.trunc(+(s * 100).toFixed(1));
        l = Math.trunc(+(l * 100).toFixed(1));

        return { hsl: "hsl(" + h + "," + s + "%," + l + "%)", l };
    }

    const createGrid = () => {
        for (let i = 0; i < numOfCells * numOfCells; i++) {
            cellArray[i] = document.createElement('div');
            cellArray[i].className = 'pixel';
            cellArray[i].setAttribute("id", `cell${i}`);
            if (bw) {
                cellArray[i].addEventListener('mouseover', shader.bind(this, cellArray[i]));
                cellArray[i].removeEventListener('mouseover', changeColor);
            }
            else {
                cellArray[i].addEventListener('mouseover', changeColor.bind(this, cellArray[i]));
                cellArray[i].removeEventListener('mouseover', shader);
            }
        }
        outputGrid(numOfCells);
    }

    const deleteGrid = () => {
        for (let i = 0; i < cellArray.length; i++) {
            grid.removeChild(cellArray[i]);
        }
        while (cellArray.length > 0)
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

    const shader = (cell) => {//hsl(40,0%,90%)
        let currentColor = RGBToHSL(window.getComputedStyle(cell).getPropertyValue('background-color')).hsl;
        let currentShade = RGBToHSL(window.getComputedStyle(cell).getPropertyValue('background-color')).l;
        let shade = currentShade - 10 >= 0 ? currentShade - 10 : currentShade;
        let arr = currentColor.split('');
        arr.splice(currentColor.indexOf('%') + 2, currentShade >= 100 ? 4 : 3, shade.toString() + '%');
        let newColor = arr.join('');
        cell.style.background = newColor;
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
        grid.style.setProperty('--res-x', numOfCells);
        grid.style.setProperty('--res-y', numOfCells);
    }

    function popup() {
        numOfCells = parseInt(prompt("Enter number of x and y pixels", 16));
        console.log(numOfCells);
    }

    return Object.assign({}, { createGrid });
}

var etchBox = box('#box');

etchBox.createGrid();

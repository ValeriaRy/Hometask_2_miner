"use strict"

var FIELD_LENGTH = 8;
var FIELD_WIDTH = 11;
var BOMBS = 18;

var numberOpenCells = FIELD_LENGTH * FIELD_WIDTH;
var currentNumberBombs = BOMBS;

function clickAnyCell(newTable, array) {
	newTable.addEventListener("click", function() {
		doSomething(event, newTable, array);
	}, false);
	newTable.addEventListener("contextmenu", function() {
		doSomething(event, newTable, array);
	}, false);
}

function doSomething(e, table, matrix) {
	e.preventDefault();
	if ((e.currentTarget !== e.target) && (endGame() !== "end")) {
		if (e.type === 'click') {
			defineOpenCells(e.target, matrix);
			checkBomb(e.target, matrix);
		}
			
		if (e.type === 'contextmenu') {
			determineBomb(e.target);
		}
	}
    	e.stopPropagation();
}

function endGame() {
	var winMessage = document.getElementById("message");
	if ((winMessage.innerHTML === "YOU LOSE!") || (winMessage.innerHTML === "YOU WIN!")) {
		
		return "end";
	}
}
 
function defineOpenCells(openCell, matrix) {
    	var x = openCell.getAttribute("data-i");
	var y = openCell.getAttribute("data-j");
	if (openCell.className === "bomb") {
		currentNumberBombs = currentNumberBombs + 1;
		strInformation();
	} 
    	defineVictory(openCell);
	openCell.className = "open";
	if (matrix[+x][+y] === 0) {
		openEmptySpace(+x, +y, matrix);
	} else {
		openCell.innerHTML = String(matrix[+x][+y]);		
	}
}

function checkBomb (openCell, array) {
	if (Number(openCell.innerHTML) === 9) {
		var winMessage = document.getElementById("message");
		winMessage.innerHTML = "YOU LOSE!";
		openCell.className = "bombLose";
		openCell.innerHTML = "";
	}
}

function defineVictory(thisCell) {
	var result;
	if ((numberOpenCells - BOMBS - 1) === 0) {
		var winMessage = document.getElementById("message");
		winMessage.innerHTML = "YOU WIN!";
		result = "endGame";
	} else if (thisCell.className !== "open") {
		numberOpenCells = numberOpenCells - 1;
		result = "nowin";
	}
	return result;
}

function determineBomb(openBomb) {
	if (openBomb.className === "bomb") {
		currentNumberBombs = currentNumberBombs + 1;
		strInformation();
		openBomb.className = "";
		openBomb.innerHTML = "";
	} else if ((currentNumberBombs > 0) && (openBomb.className !== "open")) {
		currentNumberBombs = currentNumberBombs - 1;
		strInformation();
		openBomb.className = "bomb";
	    openBomb.innerHTML = "";
	}
}

function strInformation() {
	var bombMessage = document.getElementById("bombs");
	bombMessage.innerHTML = "Осталось бомб: " + currentNumberBombs;
}

function newGame() {
	currentNumberBombs = BOMBS;
	numberOpenCells = FIELD_LENGTH * FIELD_WIDTH;
	var winMessage = document.getElementById("message");
	winMessage.innerHTML = "";
}

function openEmptySpace(a, b, array) {
	for (var stepX = -1; stepX < 2; stepX++) {
		for (var stepY = -1; stepY < 2; stepY ++) {
			var neighborX = a + stepX; 
			var neighborY = b + stepY;
			if (hasNeighbor(neighborX, neighborY)) {
				openNeighbor(neighborX, neighborY, array);
			}
		}
	}
}

function hasNeighbor (x, y) {
	if ((x === -1) || (x === FIELD_LENGTH) || (y === -1) || (y === FIELD_WIDTH)) {
		
		return false;
	} else {

		return true;
	}
}

function openNeighbor (x, y, matrix) {
	var cell = document.getElementById("cell-" + x + "-" + y);
	if (cell.className !== "open") {
		defineVictory(cell);
		cell.className = "open";
		if (matrix[x][y] > 0) {
			cell.innerHTML = matrix[x][y];
		}
		
		if (matrix[x][y] === 0)  {
			setTimeout(openEmptySpace(x, y, matrix), 0);
		}
	}
}

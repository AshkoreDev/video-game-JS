import { emojis, maps } from './maps.js';

const upBtn = document.getElementById('upBtn');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const downBtn = document.getElementById('downBtn');

const canvas = document.getElementById('game');
const game = canvas.getContext('2d');

let canvasSize;
let elementsSize;

function setCanvasSize() {

	(window.innerHeight > window.innerWidth)
		?	canvasSize = window.innerWidth * 0.75
		:	canvasSize = window.innerHeight * 0.75;

	canvas.setAttribute('width', canvasSize);
	canvas.setAttribute('height', canvasSize);

	elementsSize = canvasSize / 10;
	startGame();
}

function startGame() {

	game.fillStyle = 'purple';
	game.font = elementsSize + 'px Verdana';
	game.textAlign = 'end';

	const map = maps[0];
  const mapRows = map.trim().split('\n');
  const mapCols = mapRows.map(row => row.trim().split(''));

	// console.log(mapRows);

	// for (let row = 1; row <= 10; row++) {
 //    for (let col = 1; col <= 10; col++) {
 //      game.fillText(emojis[mapCols[row - 1][col - 1]], elementsSize * col, elementsSize * row - 6);
	// 	}
	// }

	mapCols.forEach((row, rowI) => {

		row.forEach((col, colI) => {

			const emoji = emojis[col];
			const posX = elementsSize * (colI + 1);
			const posY = elementsSize * (rowI + 0.9);

			game.fillText(emoji, posX, posY);
		});
	});
}


function moveUp() {
	console.log('arriba');
}

function moveLeft() {
	console.log('izquierda');
}

function moveRight() {
	console.log('derecha');
}

function moveDown() {
	console.log('abajo');
}

function moveByKeys(event) {
	// console.log('key ', event);

	if (event.key == 'ArrowUp') moveUp();
	else if (event.key == 'ArrowLeft') moveLeft();
	else if (event.key == 'ArrowRight') moveRight();
	else if (event.key == 'ArrowDown') moveDown();
}

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

upBtn.addEventListener('click', moveUp);
leftBtn.addEventListener('click', moveLeft);
rightBtn.addEventListener('click', moveRight);
downBtn.addEventListener('click', moveDown);
window.addEventListener('keydown', moveByKeys);
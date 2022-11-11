import { emojis, maps } from './maps.js';

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
	// console.log({canvasSize,elementsSize});

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

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);
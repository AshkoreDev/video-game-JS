import { emojis } from './maps.js';

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
	console.log({canvasSize,elementsSize});

	startGame();
}

function startGame() {

	game.fillStyle = 'purple';
	game.font = elementsSize + 'px Verdana';
	game.textAlign = 'center';

	for(let i=1; i<=10; i++) {
		game.fillText(emojis['X'], elementsSize, elementsSize * i);
	}
}

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);
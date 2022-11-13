import { emojis, maps } from './maps.js';

const upBtn = document.getElementById('upBtn');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const downBtn = document.getElementById('downBtn');

const canvas = document.getElementById('game');
const game = canvas.getContext('2d');


let canvasSize;
let elementsSize;
const playerPosition = { x: undefined, y: undefined };
const giftPosition = { x: undefined, y: undefined };
let enemiesPosition = [];


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

  enemiesPosition = [];
	game.clearRect(0,0,canvasSize,canvasSize);

	mapCols.forEach((row, rowI) => {

		row.forEach((col, colI) => {

			const emoji = emojis[col];
			const posX = elementsSize * (colI + 1);
			const posY = elementsSize * (rowI + 0.9);

			if(col == 'O' && !playerPosition.x && !playerPosition.y) {

				playerPosition.x = posX;
				playerPosition.y = posY;

			} else if(col == 'I') {

				giftPosition.x = posX;
				giftPosition.y = posY;

			} else if(col == 'X') {

				enemiesPosition.push({
					x: posX,
					y: posY
				});
			}

			game.fillText(emoji, posX, posY);
		});
	});

	movePlayer();
}

function movePlayer() {

	const giftCollisionX = playerPosition.x.toFixed(2) == giftPosition.x.toFixed(2);
	const giftCollisionY = playerPosition.y.toFixed(2) == giftPosition.y.toFixed(2);

	const enemiesCollision = enemiesPosition.find(enemy => {
		const enemiesCollisionX = enemy.x == playerPosition.x;
		const enemiesCollisionY = enemy.y == playerPosition.y;

		return enemiesCollisionX && enemiesCollisionY;
	});

	if (giftCollisionX && giftCollisionY) {

		console.log('Pasaste de nivel.');
		
	} else if(enemiesCollision) {

		console.log('Perdiste.');
	}

	game.fillText(':)', playerPosition.x, playerPosition.y);
}

function moveUp() {

  if (Math.floor(playerPosition.y) > elementsSize) {

    playerPosition.y -= elementsSize;
    startGame();
  } 
}

function moveLeft() {
	
	if (Math.floor(playerPosition.x) > elementsSize) {

    playerPosition.x -= elementsSize;
    startGame();
  } 
}

function moveRight() {
	
	if (Math.ceil(playerPosition.x) < (10 * elementsSize)) {

    playerPosition.x += elementsSize;
    startGame();
  } 	
}

function moveDown() {
	
 	if (Math.ceil(playerPosition.y) < ((10 * elementsSize) - 10)) {

    playerPosition.y += elementsSize;
    startGame();
  } 	
}

function moveByKeys(event) {

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
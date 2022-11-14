import { emojis, maps } from './maps.js';

const upBtn = document.getElementById('upBtn');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const downBtn = document.getElementById('downBtn');

const canvas = document.getElementById('game');
const game = canvas.getContext('2d');


let level = 0;
let lives = 3;
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

	const map = maps[level];

	if (!map) {

		gameWin();
		return;
	}

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
	console.log('level: ' +level);
}

function levelWin()  {

	console.log('Subiste de nivel.');
	level++;
	startGame();
}

function levelFail() {

	console.log('Perdiste.');
	lives--;

	if (lives <= 0) {

		level = 0;
		lives = 3;
	}

	playerPosition.x = undefined;
	playerPosition.y = undefined;
	startGame();
	console.log('lives: ' + lives);
}

function gameWin() {
	
	console.log('Ganaste el juego.');
}

function movePlayer() {

	const giftCollisionX = playerPosition.x.toFixed(2) == giftPosition.x.toFixed(2);
	const giftCollisionY = playerPosition.y.toFixed(2) == giftPosition.y.toFixed(2);

	const enemiesCollision = enemiesPosition.find(enemy => {
		
		const enemiesCollisionX = enemy.x.toFixed(2) == playerPosition.x.toFixed(2);
		const enemiesCollisionY = enemy.y.toFixed(2) == playerPosition.y.toFixed(2);

		return enemiesCollisionX && enemiesCollisionY;
	});

	if (giftCollisionX && giftCollisionY)	levelWin();
	else if(enemiesCollision) levelFail();

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
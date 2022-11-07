import './maps.js';

const canvas = document.getElementById('game');
const game = canvas.getContext('2d');

function startGame() {

	// Definir donde comienza el trazo (x,y,width,height)
	// game.fillRect(0,10,100,100);

	// Borrador
	// game.clearRect(0,0,100,50);

	// Estilos del texto, debe ir antes del texto
	game.fillStyle = 'purple';
	game.font = '25px Verdana';
	game.textAlign = 'center';

	// Insertar texto ('texto',x,y)
	game.fillText('Game',140,50);

}

window.addEventListener('load', startGame);
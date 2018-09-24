var width = window.innerWidth,
	height = window.innerHeight,
	ratio = window.devicePixelRatio;

var x = width / 2,
	y = height /2,
	r = 40,							// RAYON
	step = 0,						// ETAPE POUR L ANIMATION DU SPRITE	
	vx = 0.25 * r;					// VITESSE POUR LE MOUVEMENT DROITE GAUCHE
	vy = 0.2 * r;					// VITESSE POUR LE MOUVEMENT HAUT BAS

var sprites = new Image();          // CHARGEMENT DE L IMAGE DANS LE JS
sprites.onload = animate;           // APPEL DE LA FONCTION ANIMATE UNE FOIS QUE L IMAGE EST CHARGEE
sprites.src = "img/shell.png";      // CHEMIN DE L IMAGE

var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d');

canvas.width = width * ratio;
canvas.height = height * ratio;
canvas.style.width = width + 'px';
canvas.style.height = height + 'px';
context.scale(ratio, ratio);
context.imageSmoothingEnabled= false;		//EVITER LE FLOUTAGE DE L IMAGE ON RETIRE LE LISSAGE DE L IMAGE
context.fillStyle = "rgba(255, 255, 255, 0.25)";	// POUR FAIRE UN FLOU CINETIQUE POUR LE MOUVEMENT

function animate () {
	draw();
	updateX();
	updateY();
	requestAnimationFrame(animate);
}


function draw() {
	context.fillRect(0, 0, width, height);
	drawShell(x, y, r,Math.floor(step));
}

//// DESSINER LES FACES DE LA CARAPCES
function drawShell (x, y, r,step) {
	var s = r/12;					// FACTEUR D AGRANDISSEMENT   RAYON DU SPRITE 12
	context.drawImage(sprites, 32*step, 0, 32, 32, x-16*s,y-36*s, 32*s, 32*s);
}

//// MOUVEMENT AXE HORIZONTAL
function updateX() {
	x += vx;						// MISE A JOUR DE LA POSITION

	if (x > width - r || x < r) {	// REBOND SUR LES BORDS GAUCHE DROITE EN PRENANT EN COMPTE LE RAYON
		vx *= -1;
	}

	step += 0.3;
	if (step >= 12) {
		step -= 12;
	}
}

//// MOUVEMENT AXE VERTICAL
function updateY () {
	y += vy;						// MISE A JOUR DE LA POSITION

	if (y > height + r || y < 2 * r) {	// REBOND SUR LES BORDS HAUT BAS EN PRENANT EN COMPTE LE RAYON
		vy *= -1;
	}

	step += 0.3;
	if (step >= 12) {
		step -= 12;
	}
}

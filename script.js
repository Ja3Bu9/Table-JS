function addRow() {
    class User {
        constructor(nom, prenom, date, lieu, numero, addresse) {
            this.nom = nom;
            this.prenom = prenom;
            this.date = date;
            this.lieu = lieu;
            this.numero = numero;
            this.addresse = addresse;
        }
    }
    var userOne = new User (document.getElementById('nom').value, document.getElementById('pre').value, document.getElementById('date').value, document.getElementById('lieu').value, document.getElementById('num').value, document.getElementById('add').value)

    var table = document.getElementsByTagName('table')[0];

    var newRow = table.insertRow(table.rows.length);

    var cel1 = newRow.insertCell(0);
    var cel2 = newRow.insertCell(1);
    var cel3 = newRow.insertCell(2);
    var cel4 = newRow.insertCell(3);
    var cel5 = newRow.insertCell(4);
    var cel6 = newRow.insertCell(5);

    cel1.innerHTML = userOne.nom;
    cel2.innerHTML = userOne.prenom;
    cel3.innerHTML = userOne.date;
    cel4.innerHTML = userOne.lieu;
    cel5.innerHTML = userOne.numero;
    cel6.innerHTML = userOne.addresse;
}






// ANIMATION BACKGROUND //

let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
	w,
	midX,
	h,
	particles = [];

const Tau = Math.PI * 2,
	  ConnectionDist = 100, 
	  maxParticles = 100, 
	  radius = 3,
      Msqrt = Math.sqrt,
      Mrandom = Math.random;

function handleResize(){
	w = ctx.canvas.width = window.innerWidth;
	h = ctx.canvas.height = window.innerHeight;
	midX = w * .5;
}
window.onresize = () => handleResize();
handleResize();

function createParticles() {
	let vRange = 1.5,
		vMin = .5,
		vx, vy;
	for (let i = 0; i < maxParticles; i++) {
		vx = Mrandom() * vRange + vMin;
		vy = Mrandom() * vRange + vMin;
		if(Mrandom() > .5){ vx *= -1; }
		if(Mrandom() > .5){ vy *= -1; }
		particles.push({
			x: Mrandom() * w - radius,
			y: Mrandom() * h - radius,
			xv: Mrandom() * vx,
			yv: Mrandom() * vy,
			strokeColour: {h:0, s:1}
		});
	}
}

function update() {
	let p;
	for (let loop = particles.length, i = 0; i < loop; i++) {
		p = particles[i];
		// move
		p.x += p.xv;
		p.y += p.yv;
		// keep in bounds
		if (p.x < 0) {
			p.x = 0;
			p.xv *= -1;
		}
		else if (p.x > w) {
			p.x = w;
			p.xv *= -1;
		}
		if (p.y < 0) {
			p.y = 0;
			p.yv *= -1;
		}
		else if (p.y > h) {
			p.y = h;
			p.yv *= -1;
		}
	}
}

function connect(){
	let p1, p2;
	for (let i = 0; i < maxParticles-1; i++) {
		p1 = particles[i];
		for (let j = i + 1; j < maxParticles; j++) {
			p2 = particles[j];
			currentDist = getDistance(p2.x, p1.x, p2.y, p1.y);
			if (currentDist < ConnectionDist) {
				ctx.beginPath();
				ctx.moveTo(p1.x, p1.y);
				ctx.strokeStyle = 'hsla(' + p1.hue + ', 50%, 50%, ' + (1 - currentDist * 0.01) + ')';
				ctx.lineTo(p2.x, p2.y, p1.x, p1.y);
				ctx.stroke();
			}
		}
	}
}

function draw() {
	let p, d;
	for (let loop = particles.length, i = 0; i < loop; i++) {
		p = particles[i];
		d = getDistance(midX, p.x, h, p.y);
		p.hue = d;
		ctx.beginPath();
		ctx.fillStyle = 'hsla(' + d + ' , 50%, 30%, 1)';
		ctx.arc(p.x, p.y, radius, 0, Tau);
		ctx.fill();
	}
}

function getDistance(x1, x2, y1, y2) {
	let a = x1 - x2,
		b = y1 - y2;
	return Msqrt(a * a + b * b);
}

function animate() {
	canvas.width = w;
	update();
	connect();
	draw();
	requestAnimationFrame(animate);
}

createParticles();
animate();
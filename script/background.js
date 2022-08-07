
let canvas, context, height_b, width_b;

function init_b() {
    canvas = document.getElementById("audio_background");
    height_b = window.innerHeight;
    width_b = window.innerWidth;

    var dpr = window.devicePixelRatio || 1;
	canvas.width = width_b * dpr;
	canvas.height = height_b * dpr;
	context = canvas.getContext("2d");
	context.scale(dpr, dpr);

    render_b();
}

function sinus(x, t) {
	return Math.sin(2.1 * x + t) + Math.sin(x + t) + Math.sin(2.5 * x + t);
}

const WIDTH_B = 18;
const DIST = 22;

let time = 0;

function render_b() {
	context.clearRect(0, 0, width_b, canvas.height);
	let x = 0;

	while (x <= width_b) {
		let dist = Math.abs(sinus(x, time) * 20)+10;
		let y = height_b * 0.5 - dist;
		context.beginPath();
		context.fillStyle = "rgba(0,0,0,0.4)";
		context.fillRect(x + 2,y,WIDTH_B,dist*2);
		context.closePath();
		x += DIST;
	}
	
	time += 0.01;

	requestAnimationFrame(render_b);
}
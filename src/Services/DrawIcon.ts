const SCALE = 1;
const SIZE = 19 * SCALE;
const BORDER_WIDTH = 2 * SCALE;
const INNER_SIZE = SIZE - (2 * BORDER_WIDTH);
const BORDER_RADIUS = 3 * SCALE;
const COLOR = '#5c5c5c'; // '#4a4a4b' in Firefox
const BIG_FONT = 'bold 11px Roboto';
const SMALL_FONT = 'bold 10px Roboto Condensed';
const TEXT_POSITION = 13;

// Load font
var style = document.createElement('style');
style.innerHTML = `
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  src: local('Roboto Bold'), local('Roboto-Bold'), url(data/Roboto-Bold.woff2) format('woff2');
}
@font-face {
  font-family: 'Roboto Condensed';
  font-style: normal;
  font-weight: 700;
  src: local('Roboto Condensed Bold'), local('RobotoCondensed-Bold'), url(data/Roboto-Condensed-Bold.woff2) format('woff2');
}`;
document.head.appendChild(style);

/**
 * Create off-screen canvas and draw the rounded rectangle
 */
function createBackgroundCanvas() {
	let canvas = document.createElement('canvas');
	canvas.width = SIZE;
	canvas.height = SIZE;

	let ctx = canvas.getContext('2d');
	if (ctx == null) {
		throw new Error('Could not get a canvas context');
	}
	ctx.strokeStyle = COLOR;
	ctx.fillStyle = COLOR;
	ctx.lineWidth = BORDER_WIDTH;
	ctx.textAlign = 'center';

	// Draw the border
	roundedRect(ctx, 0, 0, SIZE, SIZE, BORDER_RADIUS);
	ctx.fill();

	return ctx;
}

let ctx = createBackgroundCanvas();

/**
 * Draws the text inside the icon
 *
 * @param text: text to draw (String or Number)
 */
export default function drawIcon(text: string) {
	text = text.toString();
	// Clear the inner part of the icon, without ever redrawing the border
	ctx.clearRect(BORDER_WIDTH, BORDER_WIDTH, INNER_SIZE, INNER_SIZE);

	// Draw the text
	if (text.length >= 3) {
		ctx.font = SMALL_FONT;
		ctx.fillText(text, SIZE / 2, TEXT_POSITION, INNER_SIZE);
	} else {
		ctx.font = BIG_FONT;
		ctx.fillText(text, SIZE / 2, TEXT_POSITION);
	}

	return ctx.getImageData(0, 0, SIZE, SIZE)
}

/**
 * Draws a rounded rectangle using the current state of the canvas.
 *
 * http://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
 */
function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.lineTo(x + width - radius, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
	ctx.lineTo(x + width, y + height - radius);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	ctx.lineTo(x + radius, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
	ctx.lineTo(x, y + radius);
	ctx.quadraticCurveTo(x, y, x + radius, y);
	ctx.closePath();
}
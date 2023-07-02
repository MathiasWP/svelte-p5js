<script>
	import { Sketch } from '$lib/index.js';

	let num = 2000;
	let range = 6;

	let ax = [];
	let ay = [];

	function setup(p5) {
		const height = p5.windowHeight;
		const width = p5.windowWidth;
		p5.createCanvas(width, height);
		for (let i = 0; i < num; i++) {
			ax[i] = width / 2;
			ay[i] = height / 2;
		}
		ax = ax;
		ay = ay;
		p5.frameRate(30);
	}

	function draw(p5) {
		// Shift all elements 1 place to the left
		for (let i = 1; i < num; i++) {
			ax[i - 1] = ax[i];
			ay[i - 1] = ay[i];
		}

		// Put a new value at the end of the array
		ax[num - 1] += p5.random(-range, range);
		ay[num - 1] += p5.random(-range, range);

		// Constrain all points to the screen
		ax[num - 1] = p5.constrain(ax[num - 1], 0, p5.windowWidth);
		ay[num - 1] = p5.constrain(ay[num - 1], 0, p5.windowHeight);

		ax = ax;
		ay = ay;

		// Draw a line connecting the points
		for (let j = 1; j < num; j++) {
			let val = (j / num) * 204.0 + 51;
			p5.stroke(val);
			p5.line(ax[j - 1], ay[j - 1], ax[j], ay[j]);
		}
	}
</script>

<Sketch {setup} {draw} />

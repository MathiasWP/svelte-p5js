<script>
	import { Sketch } from '$lib/index.js';

	// center point
	let centerX = 0.0,
		centerY = 0.0;

	let radius = 45,
		rotAngle = -90;
	let accelX = 0.0,
		accelY = 0.0;
	let deltaX = 0.0,
		deltaY = 0.0;
	let springing = 0.0009,
		damping = 0.98;

	//corner nodes
	let nodes = 5;

	//zero fill arrays
	const nodeStartX = [];
	const nodeStartY = [];
	const nodeX = [];
	const nodeY = [];
	const angle = [];
	const frequency = [];

	// soft-body dynamics
	let organicConstant = 1.0;

	function setup(p5) {
		const height = p5.windowHeight;
		const width = p5.windowWidth;
		p5.createCanvas(width, height);

		//center shape in window
		centerX = width / 2;
		centerY = height / 2;

		//initialize arrays to 0
		for (let i = 0; i < nodes; i++) {
			nodeStartX[i] = 0;
			nodeStartY[i] = 0;
			nodeY[i] = 0;
			nodeY[i] = 0;
			angle[i] = 0;
		}

		// iniitalize frequencies for corner nodes
		for (let i = 0; i < nodes; i++) {
			frequency[i] = p5.random(5, 12);
		}

		p5.noStroke();
		frameRate(30);
	}

	function draw(p5) {
		const height = p5.windowHeight;
		const width = p5.windowWidth;
		//fade background
		p5.fill(31, 41, 55);
		p5.rect(0, 0, width, height);
		drawShape(p5);
		moveShape(p5);
	}

	function drawShape(p5) {
		//  calculate node  starting locations
		for (let i = 0; i < nodes; i++) {
			nodeStartX[i] = centerX + p5.cos(p5.radians(rotAngle)) * radius;
			nodeStartY[i] = centerY + p5.sin(p5.radians(rotAngle)) * radius;
			rotAngle += 360.0 / nodes;
		}

		// draw polygon
		p5.curveTightness(organicConstant);
		p5.fill('#ED225D');
		p5.beginShape();
		for (let i = 0; i < nodes; i++) {
			p5.curveVertex(nodeX[i], nodeY[i]);
		}
		for (let i = 0; i < nodes - 1; i++) {
			p5.curveVertex(nodeX[i], nodeY[i]);
		}
		p5.endShape(p5.CLOSE);
	}

	function moveShape(p5) {
		//move center point
		deltaX = p5.mouseX - centerX;
		deltaY = p5.mouseY - centerY;

		// create springing effect
		deltaX *= springing;
		deltaY *= springing;
		accelX += deltaX;
		accelY += deltaY;

		// move predator's center
		centerX += accelX;
		centerY += accelY;

		// slow down springing
		accelX *= damping;
		accelY *= damping;

		// change curve tightness
		organicConstant = 1 - (p5.abs(accelX) + p5.abs(accelY)) * 0.1;

		//move nodes
		for (let i = 0; i < nodes; i++) {
			nodeX[i] = nodeStartX[i] + p5.sin(p5.radians(angle[i])) * (accelX * 2);
			nodeY[i] = nodeStartY[i] + p5.sin(p5.radians(angle[i])) * (accelY * 2);
			angle[i] += frequency[i];
		}
	}
</script>

<Sketch {setup} {draw} />

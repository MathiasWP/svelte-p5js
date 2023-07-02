<script>
	import { Background, Clear, Canvas, Ellipse, Circle, P5, Setup, Draw, Fill } from '$lib/index.js';

	let x = 0;
	let y = 0;
	let d = 10;
	let w = 800;
	let h = 800;
	let p5;
	let mouseButton;

	const sketch = (p5) => {
		p5.setup = () => {
			p5.createCanvas(w, h);
		};

		p5.draw = () => {
			x++;
			y++;
			d += 0.3;
			p5.background('pink');
			p5.fill(x < 100 ? 'blue' : 'cyan');
			p5.circle(x, y, d);
		};
	};
</script>

<a href="/playground">Main</a>
<P5 {sketch} />

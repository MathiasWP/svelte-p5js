<script>
	import { Background, Clear, Canvas, Ellipse, Circle, P5, Setup, Draw, Fill } from '$lib/index.js';

	let x = 0;
	let y = 0;
	let d = 10;
	let w = 800;
	let h = 800;
	let p5;
	let mouseButton;
</script>

<P5
	bind:p5
	draw={() => {
		x++;
		y++;
		d += 0.3;
	}}
	bind:mouseButton
	on:mousePressed={(event) => event.detail.p5.noLoop()}
	on:mouseReleased={() => p5.loop()}
>
	<Setup>
		<Canvas {w} {h} />
	</Setup>
	<Draw>
		<Background v1={105} v2={140} v3={99} color="pink" />
		<Fill value={x < 100 ? 'blue' : 'cyan'} />
		<Circle {x} {y} {d} />
		<Fill value="orange" />
		<Ellipse {x} {y} w={20} h={20} />
	</Draw>
</P5>

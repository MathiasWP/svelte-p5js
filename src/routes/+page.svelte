<script>
	import { Background, Canvas, Ellipse, Circle, P5, Setup, Draw, Fill } from '$lib/index.js';

	let x = 0;
	let y = 0;
	let d = 10;
	let w = 800;
	let h = 800;
	let instance;
	let mouseButton;
</script>

<P5
	bind:instance
	draw={() => {
		x++;
		y++;
		d += 0.3;
	}}
	bind:mouseButton
	on:mousePressed={() => instance.noLoop()}
	on:mouseReleased={() => instance.loop()}
>
	<Setup>
		<Canvas {w} {h} />
	</Setup>
	<Draw>
		<Background v1={105} v2={140} v3={99} />
		<Fill v1={205} v2={140} v3={99} />
		<Circle {x} {y} {d} />
		<Fill v1={205} v2={40} v3={99} />
		<Ellipse {x} {y} w={20} h={20} />
	</Draw>
</P5>

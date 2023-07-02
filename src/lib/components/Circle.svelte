<script>
	import { setupComponent } from '$lib/utils/setup-component.js';

	/**
	 * @see {@link https://p5js.org/reference/#/p5/circle}
	 */

	/**
	 * @description x-coordinate of the center of the circle.
	 * @type {number}
	 */
	export let x;
	/**
	 * @description y-coordinate of the center of the circle.
	 * @type {number}
	 */
	export let y;
	/**
	 * @description diameter of the circle.
	 * @type {number}
	 */
	export let d;

	const { context, id } = setupComponent();
	$: $context.set(id, (ctx) => ctx.circle(x, y, d));
</script>

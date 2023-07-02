<script>
	import { setupComponent } from '$lib/utils/setup-component.js';

	/**
	 * @see {@link https://p5js.org/reference/#/p5/canvas}
	 */

	/**
	 * @description width of the canvas.
	 * @type {number}
	 */
	export let w;
	/**
	 * @description height of the canvas.
	 * @type {number}
	 */
	export let h;

	/**
	 * @description the canvas element when mounted
	 * @type {HTMLCanvasElement | null}
	 */
	export let element = null;

	const { context, id } = setupComponent();
	$: $context.set(id, (ctx) => (element = ctx.createCanvas(w, h)));
</script>

<slot />

<script>
	import { setupComponent } from '$lib/utils/setup-component.js';

	/**
	 * @see {@link https://p5js.org/reference/#/p5/clear}
	 */

	/**
	 * @description normalized red value
	 * @type {number | undefined}
	 */
	export let r = undefined;

	/**
	 * @description normalized green value
	 * @type {number | undefined}
	 */
	export let g = undefined;

	/**
	 * @description normalized blue value
	 * @type {number | undefined}
	 */
	export let b = undefined;

	/**
	 * @description normalized alpha value
	 * @type {number | undefined}
	 */
	export let a = undefined;

	const { context, id } = setupComponent();
	$: $context.set(id, (ctx) => ctx.clear(r, g, b, a));
</script>

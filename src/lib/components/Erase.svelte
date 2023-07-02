<script>
	import { setupComponent } from '$lib/utils/setup-component.js';

	/**
	 * @see {@link https://p5js.org/reference/#/p5/erase}
	 */

	/**
	 * @description A number (0-255) for the strength of erasing for a shape's fill. This will default to 255 when no argument is given, which is full strength. (Optional)
	 * @type {number}
	 */
	export let strengthFill = undefined;

	/**
	 * @description A number (0-255) for the strength of erasing for a shape's stroke. This will default to 255 when no argument is given, which is full strength. (Optional)
	 * @type {number}
	 */
	export let strengthStroke = undefined;

	const { context, id } = setupComponent();
	$: $context.set(id, (ctx) => ctx.erase([strengthFill], [strengthStroke]));
</script>

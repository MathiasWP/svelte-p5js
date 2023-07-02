<script>
	import { invoke } from '$lib/utils/invoke.js';
	import { isUndefined } from '$lib/utils/type-checking.js';
	import { setupComponent } from '$lib/utils/setup-component.js';

	/**
	 * @see {@link https://p5js.org/reference/#/p5/fill}
	 */

	/**
	 * @description a color string
	 * @type {string}
	 */
	export let value = undefined;

	/**
	 * @description an array containing the red, green, blue & and alpha components of the color
	 * @type {number[]}
	 */
	export let values = undefined;

	/**
	 * @description a gray value
	 * @type {number}
	 */
	export let gray = undefined;

	/**
	 * @description the stroke color
	 * @type {import('p5').Color}
	 */
	export let color = undefined;

	/**
	 * @description red or hue value relative to the current color range
	 * @type {number}
	 */
	export let v1 = undefined;
	/**
	 * @description green or saturation value relative to the current color range
	 * @type {number}
	 */
	export let v2 = undefined;
	/**
	 * @description blue or brightness value relative to the current color range
	 * @type {number}
	 */
	export let v3 = undefined;

	/**
	 * @description blue or brightness value relative to the current color range
	 * @type {number}
	 */
	export let alpha = undefined;

	const { context, id } = setupComponent();
	/**
	 * The fill method has a lot of different parameter combinations:
	 * 1: fill(v1, v2, v3, [alpha])
	 * 2: fill(value)
	 * 3: fill(gray, [alpha])
	 * 4: fill(values)
	 * 5: fill(color)
	 */
	$: params = invoke(() => {
		const params = [];
		if (!isUndefined(v1) && !isUndefined(v2) && !isUndefined(v3)) {
			params.push(v1, v2, v3);
			if (!isUndefined(alpha)) params.push(alpha);
		} else if (!isUndefined(value)) {
			params.push(value);
		} else if (!isUndefined(gray)) {
			params.push(gray);
			if (!isUndefined(alpha)) params.push([alpha]);
		} else if (!isUndefined(values)) {
			params.push(values);
		} else if (!isUndefined(color)) {
			params.push(color);
		}
		return params;
	});

	$: $context.set(id, (ctx) => ctx.fill(...params));
</script>

<script>
	import { invoke } from '$lib/utils/invoke.js';
	import { isUndefined } from '$lib/utils/is-defined.js';
	import { setupComponent } from '$lib/utils/setup-component.js';

	/**
	 * @see {@link https://p5js.org/reference/#/p5/background}
	 */

	/**
	 * @description p5.Color: any value created by the color() function
	 * @type {import('p5').Color}
	 */
	export let color = undefined;

	/**
	 * @description color string, possible formats include: integer rgb() or rgba(), percentage rgb() or rgba(), 3-digit hex, 6-digit hex
	 * @type {string[]}
	 */
	export let colorstring = undefined;

	/**
	 * @description opacity of the background relative to current color range (default is 0-255) (Optional)
	 * @type {number}
	 */
	export let a = undefined;

	/**
	 * @description a gray value
	 * @type {number}
	 */
	export let gray = undefined;

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
	 * @description an array containing the red, green, blue and alpha components of the color
	 * @type {number[]}
	 */
	export let values = undefined;

	/**
	 * @description image created with loadImage() or createImage(), to set as background (must be same size as the sketch window)
	 * @type {import('p5').Image}
	 */
	export let image = undefined;

	const { context, id } = setupComponent();
	/**
	 * The background method has a lot of different parameter combinations:
	 * 1: background(color)
	 * 2: background(colorstring, [a])
	 * 3: background(gray, [a])
	 * 3: background(v1, v2, v3, [a])
	 * 4: background(values)
	 * 5: background(image, [a])
	 */
	$: params = invoke(() => {
		const params = [];
		if (!isUndefined(color)) {
			params.push(color);
		} else if (!isUndefined(colorstring)) {
			params.push(colorstring);
			if (!isUndefined(a)) params.push([a]);
		} else if (!isUndefined(gray)) {
			params.push(gray);
			if (!isUndefined(a)) params.push([a]);
		} else if (!isUndefined(v1) && !isUndefined(v2) && !isUndefined(v3)) {
			params.push(v1, v2, v3);
			if (!isUndefined(a)) params.push([a]);
		} else if (!isUndefined(values)) {
			params.push(values);
		} else if (!isUndefined(image)) {
			params.push(image);
			if (!isUndefined(a)) params.push([a]);
		}
		return params;
	});

	$: $context.set(id, (ctx) => ctx.background(...params));
</script>

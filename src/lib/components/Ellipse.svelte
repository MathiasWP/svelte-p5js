<script>
	import { getContext } from 'svelte';
	/**
	 * @description x-coordinate of the center of the ellipse.
	 * @type {number}
	 */
	export let x;
	/**
	 * @description y-coordinate of the center of the ellipse.
	 * @type {number}
	 */
	export let y;
	/**
	 * @description width of the ellipse.
	 * @type {number}
	 */
	export let w;
	/**
	 * @optional
	 * @description height of the ellipse. (Optional)
	 * @type {number}
	 */
	export let h = undefined;

	const context = getContext('context');
	const id = Symbol();
	$: $context.set(id, (ctx) => ctx.ellipse(x, y, w, h));
</script>

<script>
	import { getContext } from 'svelte';
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

	const context = getContext('context');
	const id = Symbol();
	$: $context.set(id, (ctx) => ctx.circle(x, y, d));
</script>

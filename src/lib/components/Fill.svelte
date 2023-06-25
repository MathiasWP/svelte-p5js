<script>
	import { getContext } from 'svelte';
	/**
	 * @description red or hue value relative to the current color range
	 * @type {number}
	 */
	export let v1;
	/**
	 * @description green or saturation value relative to the current color range
	 * @type {number}
	 */
	export let v2;
	/**
	 * @description blue or brightness value relative to the current color range
	 * @type {number}
	 */
	export let v3;

	const context = getContext('context');
	const id = Symbol();
	$: $context.set(id, (ctx) => ctx.fill(v1, v2, v3));
</script>

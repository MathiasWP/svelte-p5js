<script>
	import { getContext } from 'svelte';
	/**
	 * @description red or hue value (depending on the current color mode)
	 * @type {number}
	 */
	export let v1;
	/**
	 * @description green or saturation value (depending on the current color mode)
	 * @type {number}
	 */
	export let v2;
	/**
	 * @description blue or brightness value (depending on the current color mode)
	 * @type {number}
	 */
	export let v3;

	const context = getContext('context');
	const id = Symbol();
	$: $context.set(id, (ctx) => ctx.background(v1, v2, v3));
</script>

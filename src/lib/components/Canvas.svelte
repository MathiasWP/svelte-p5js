<script>
	import { getContext } from 'svelte';
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

	const context = getContext('context');
	const id = Symbol();
	$: $context.set(id, (ctx) => (element = ctx.createCanvas(w, h)));
</script>

<slot />

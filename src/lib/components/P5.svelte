<script>
	import { onDestroy, onMount } from 'svelte';
	import { writable } from 'svelte/store';

	/**
	 * @description The sketch() function is called once when the program starts. It's used to define initial environment properties such as screen size and background color and to load media such as images and fonts as the program starts. There can only be one setup() function for each program and it shouldn't be called again after its initial execution.
	 * @type {(p5: import('p5')) => void | Promise<void>}
	 */
	export let sketch;

	/**
	 * @type {HTMLDivElement | null}
	 */
	let containerEl = null;

	/**
	 * @type {import('p5') | undefined}
	 */
	let p5Class;

	onMount(async () => {
		/**
		 * We have to load the p5 library client-side because it crashes Svelte-kit during SSR.
		 */
		const P5js = (await import('p5')).default;
		p5Class = new P5js(sketch, containerEl);
	});

	onDestroy(() => {
		/**
		 * Prevent memory leak
		 */
		if (p5Class) {
			p5Class.remove();
		}
		p5Class = undefined;
	});
</script>

<div bind:this={containerEl} />

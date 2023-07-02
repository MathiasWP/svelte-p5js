<script>
	import { getContext, setContext } from 'svelte';

	/**
	 * @see {@link https://p5js.org/reference/#/p5/draw}
	 */

	/**
	 * Set the context to draw for child components
	 */
	const draw = getContext('draw');
	setContext('context', draw);
</script>

<slot />

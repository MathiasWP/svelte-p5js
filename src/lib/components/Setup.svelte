<script>
	import { getContext, setContext } from 'svelte';

	/**
	 * @see {@link https://p5js.org/reference/#/p5/setup}
	 */

	/**
	 * Set the context to setup for child components
	 */
	const setup = getContext('setup');
	setContext('context', setup);
</script>

<slot />

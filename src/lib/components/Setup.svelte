<script>
	import { getContext, setContext } from 'svelte';

	/**
	 * Set the context to setup for child components
	 */
	const setup = getContext('setup');
	setContext('context', setup);
</script>

<slot />

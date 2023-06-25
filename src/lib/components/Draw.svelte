<script>
	import { getContext, setContext } from 'svelte';

	/**
	 * Set the context to draw for child components
	 */
	const draw = getContext('draw');
	setContext('context', draw);
</script>

<slot />

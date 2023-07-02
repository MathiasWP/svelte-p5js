import { getContext, onDestroy } from 'svelte';

/**
 * @description Simplifies the internal setup for a component.
 * Does the following:
 * 1. Creates an id used in the context map
 * 2. Retrieves the current context map
 * 3. Removes the sketch method from the context map onDestroy (unless de-activated)
 *
 * @param {{clearOnDestroy: boolean}} options
 */
export function setupComponent(options = { clearOnDestroy: true }) {
	const id = Symbol();

	/**
	 * @type {Writable<Map<symbol, (p5: import('p5')) => void>}
	 */
	const context = getContext('context');

	let _context = null; // Internal reference to store value

	const unsubscribe = context.subscribe((ctx) => (_context = ctx));

	const clear = () => _context?.delete(id);

	onDestroy(() => {
		if (options.clearOnDestroy) {
			clear();
		}
		unsubscribe();
	});

	return {
		context,
		id,
		clear
	};
}

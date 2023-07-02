<script>
	import { setupComponent } from '$lib/utils/setup-component.js';

	/**
	 * @see {@link https://p5js.org/reference/#/p5/noErase}
	 */

	const { context, id } = setupComponent();
	$: $context.set(id, (ctx) => ctx.noErase());
</script>

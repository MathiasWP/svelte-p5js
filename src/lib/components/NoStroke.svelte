<script>
	import { setupComponent } from '$lib/utils/setup-component.js';

	/**
	 * @see {@link https://p5js.org/reference/#/p5/noStroke}
	 */

	const { context, id } = setupComponent();
	$: $context.set(id, (ctx) => ctx.noStroke());
</script>

<script>
	import P5Logo from './components/atoms/P5Logo.svelte';
	import SimulateSoftBody from './components/examples/SimulateSoftBody.svelte';
</script>

<div class="h-full w-full flex items-center justify-center">
	<div class="flex flex-col gap-6 z-10">
		<div class="flex items-end gap-6 text-8xl">svelte<P5Logo height={68} /></div>
		<p>
			a safe, fast and declarative Svelte component library for <a
				href="https://p5js.org/"
				target="_blank"
				class="underline"
				rel="noopener noreferrer">p5.js</a
			>
		</p>
	</div>
	<div class="absolute top-0 left-0 z-0">
		<SimulateSoftBody />
	</div>
</div>

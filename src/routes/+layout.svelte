<script>
	import '../app.css';
	import Navbar from './components/organisms/Navbar.svelte';
</script>

<main class=" h-screen w-screen bg-gray-800 text-white">
	<Navbar />
	<slot />
</main>

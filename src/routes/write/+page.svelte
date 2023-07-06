<script lang="ts">
	import { AuthFire } from '$lib/Firebase/Auth';
	import User from '$lib/Sveltefire/User.svelte';
	import Loading from '$lib/components/Global/Loading.svelte';
	import Writer from '$lib/components/write/Writer.svelte';
</script>

<User auth={AuthFire.auth} redirect="/signup">
	<main class="container max-w-screen-md mx-auto px-4 pb-28 lg:px-2">
		<Writer />
	</main>

	<div slot="loading">
		<Loading />
	</div>
</User>

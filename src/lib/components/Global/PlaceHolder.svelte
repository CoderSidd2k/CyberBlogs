<script lang="ts">
	export let count = 2;
	let items = Array.from({ length: count }, (_, i) => i);
</script>

<section class="space-y-5">
	{#each items as item}
		<section class="card w-full">
			<div class="p-2 flex items-center gap-2">
				<div class="placeholder-circle w-12 animate-pulse" />
				<div class="placeholder grow animate-pulse" />
			</div>
			<div class="p-4 space-y-4">
				<div class="placeholder animate-pulse" />
				<div class="grid grid-cols-3 gap-8">
					<div class="placeholder animate-pulse" />
					<div class="placeholder animate-pulse" />
					<div class="placeholder animate-pulse" />
				</div>
				<div class="grid grid-cols-4 gap-4">
					<div class="placeholder animate-pulse" />
					<div class="placeholder animate-pulse" />
					<div class="placeholder animate-pulse" />
					<div class="placeholder animate-pulse" />
				</div>
			</div>
		</section>
	{/each}
</section>

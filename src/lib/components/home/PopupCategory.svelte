<script lang="ts">
	import { Autocomplete, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import CustomInputChip from './CustomInputChip.svelte';
	import { docStore } from '$lib/Sveltefire/stores';
	import { FireStore } from '$lib/Firebase/FireStore';
	import Icon from '@iconify/svelte';
	import { callStore, searchStore } from './stores';
	let category: any = docStore(FireStore.db, 'category/category');
	$: flavorOptions = $category?.categories?.map((elem: string) => {
		return {
			label: elem.charAt(0).toUpperCase() + elem.slice(1),
			value: elem.toLowerCase()
		};
	});
	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};
	const onInputChipSelect = (e: any) => {
		if (e.detail.value) {
			keywords = [...keywords, e.detail.value];
			inputChip = '';
		}
	};

	let inputChip = '';
	export let keywords: string[] = [];
	export let showSearch: boolean;

	const handleBtnClick = () => {
		if ($callStore !== undefined) {
			$callStore();
		}
	};
</script>

<div class="w-full flex gap-2">
	{#if showSearch}
		<div class="flex gap-2 md:hidden w-full">
			<div class="input-group input-group-divider grid-cols-[1fr_auto] rounded-lg">
				<input bind:value={$searchStore} type="search" placeholder="Search..." />
				<button
					disabled={$searchStore === ''}
					on:click={handleBtnClick}
					class="variant-filled-secondary"
					><Icon icon="ic:twotone-search" class="scale-150" /></button
				>
			</div>
		</div>
	{:else}
		<div use:popup={popupSettings} class="w-full">
			<CustomInputChip
				placeholder="Add Categories"
				{popupSettings}
				bind:input={inputChip}
				bind:value={keywords}
				name="chips"
			/>
		</div>
	{/if}
	<div class="flex items-center">
		<button
			on:click={() => {
				showSearch = !showSearch;
			}}
			class="md:hidden {showSearch &&
				'rotate-180 '} duration-300 transition-all variant-ghost-tertiary rounded-full p-2"
			>{#if showSearch}
				<Icon icon="ic:round-segment" class="rotate-180" />
			{:else}
				<Icon icon="gala:search" />
			{/if}</button
		>
	</div>
</div>
<div use:popup={popupSettings} class="w-full hidden md:block">
	<CustomInputChip
		placeholder="Add Categories"
		{popupSettings}
		bind:input={inputChip}
		bind:value={keywords}
		name="chips"
	/>
</div>
<div class="card p-4 w-72 shadow-xl" data-popup="popupAutocomplete">
	<div class="card w-full hide-scrollbar max-w-sm max-h-48 p-4 overflow-y-auto py-4" tabindex="-1">
		<Autocomplete
			bind:input={inputChip}
			options={flavorOptions}
			denylist={keywords}
			on:selection={onInputChipSelect}
		/>
	</div>
</div>

<script lang="ts">
	import Icon from '@iconify/svelte';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { scale } from 'svelte/transition';
	import { Item, type customBtn } from '../types';
	export let handleBtnPress: (item: Item) => void;
	let popupState: boolean = false;
	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'right-start',
		state: (e: { state: boolean }) => {
			popupState = e.state;
		}
	};

	const btns: customBtn[] = [
		{
			content: 'Head',
			item: Item.head
		},
		{
			content: 'Para',
			item: Item.para
		},
		{
			content: 'Image',
			item: Item.img
		},
		{
			content: 'Code',
			item: Item.code
		}
	];
</script>

<div
	class="flex justify-center items-center w-min rounded-full border-2 border-surface-600 p-1 {!popupState &&
		'md:animate-bounce'}  transition-all"
>
	<button
		in:scale
		use:popup={popupClick}
		class=" transition-all btn rounded-full bg-opacity-95 bg-surface-500 p-4 md:p-2"
	>
		<Icon icon="ph:plus-bold" class="scale-125 md:scale-100" />
	</button>
</div>

<div class=" card variant-ghost-surface" data-popup="popupClick">
	<div class="flex flex-col items-center gap-1 p-2 [&>*]:px-8 [&>*]:w-full">
		{#each btns as btn, index}
			<button
				on:click={() => {
					handleBtnPress(btn.item);
				}}
				class="hover:bg-surface-500 py-2 rounded-md">{btn.content}</button
			>

			{#if !(index === btns.length - 1)}
				<hr class="w-full" />
			{/if}
		{/each}
	</div>
</div>

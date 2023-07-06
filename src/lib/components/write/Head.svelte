<script lang="ts">
	import { onMount } from 'svelte';
	import { divStore, itemStore } from './scripts/store';
	let count = 0;
	let hidden: boolean = false;
	export let id: string;
	const handleBack = (e: KeyboardEvent) => {
		if (e.key == 'Backspace' && val.replaceAll('\n', '') === '') {
			count++;
		} else {
			count = 0;
		}
		if (count > 1) {
			itemStore.update((e) => e.filter((e) => e.id !== id));
			hidden = true;
		}
	};
	const handleInput = () => {
		itemStore.update((elem) => {
			const selectedItem = elem.find((e) => e.id === id);
			selectedItem!.content = val;
			return elem;
		});
	};
	let val: string = '';
	let div: HTMLDivElement;
	onMount(() => {
		divStore.set(div);
	});
</script>

<div
	contenteditable="true"
	bind:this={div}
	on:keydown={handleBack}
	class="h3 p-3 bold focus:transition-all {val?.replaceAll('\n', '') == '' &&
		'card variant-ghost-surface'} {hidden &&
		'hidden'}   leading-7 focus:duration-300 focus:card focus:variant-ghost-surface transition-all outline-none"
	placeholder="Your para goes here"
	bind:innerText={val}
	on:input={handleInput}
/>

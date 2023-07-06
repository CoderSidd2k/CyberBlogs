<script lang="ts">
	export let id: string;
	import { CodeBlock } from '@skeletonlabs/skeleton';
	import { divStore, itemStore } from './scripts/store';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { validLanguages } from './scripts/valid';
	$: item = $itemStore.find((elem) => elem.id === id);
	let count = 0;
	const handleBack = (e: KeyboardEvent) => {
		if (e.key == 'Backspace' && value.replaceAll("\n","") === '') {
			count++;
		} else {
			count = 0;
		}
		if (count > 1) {
			itemStore.update((e) => e.filter((e) => e.id !== id));
			hidden = true;
		}
	};
	let div: any;
	let edit: boolean = true;
	let value = item?.content || '';
	let lang: string = 'html';
	let hidden = false;
	const handleLangChange = () => {
		itemStore.update((elem) => {
			const selectedItem = elem.find((e) => e.id === id);
			selectedItem!.lang = lang;
			return elem;
		});
	};
	const handleInput = () => {
		itemStore.update((elem) => {
			const selectedItem = elem.find((e) => e.id === id);
			selectedItem!.content = value;
			return elem;
		});
	};
	onMount(() => {
		divStore.set(div);
	});
	
</script>

<div class="{hidden && 'hidden'}  pb-7 md:pb-0">
	{#if edit}
		<div class="relative">
			<input
				class="input {!validLanguages.includes(lang) &&
					'border-red-700 focus:border-red-700'} px-2 autocomplete text-center absolute max-w-[9rem] rounded-none rounded-tl-md outline-none rounded-br-md p-0"
				type="text"
				name="language"
				bind:value={lang}
			/>
			<pre
				bind:this={div}
				contenteditable="true"
				bind:innerText={value}
				on:keydown={handleBack}
				class="pt-10 p-2 focus:transition-all whitespace-pre-wrap {value == '' &&
					'card variant-ghost-surface'} {hidden &&
					'hidden'} leading-7 focus:duration-300 focus:card focus:variant-ghost-surface transition-all outline-none"
			/>

			<button
				on:click={() => {
					edit = false;
					handleInput();
					handleLangChange();
				}}
				disabled={value.trim() === '' || !validLanguages.includes(lang)}
				class=" absolute p-2 b-5 right-0 bottom-[-2.5rem] md:right-[-3rem] md:bottom-2 hover:bg-green-800 transition-colors hover:scale-110 rounded-full bg-green-700"
			>
				<Icon icon="typcn:tick" />
			</button>
		</div>
	{:else}
		<div class="relative">
			<CodeBlock language={lang} code={value} />
			<button
				on:click={() => {
					edit = true;
				}}
				class="absolute right-0 bottom-[-2.5rem] md:right-[-3rem] md:bottom-2 hover:bg-orange-800 transition-colors hover:scale-110 rounded-full bg-orange-700 p-2"
			>
				<Icon icon="fluent:edit-20-filled" />
			</button>
		</div>
	{/if}
</div>

<script lang="ts">
	import FileDropzone from '../Global/FileDropzone.svelte';
	import { itemStore } from './scripts/store';
	import Icon from '@iconify/svelte';
	export let id: string;
	let files: FileList;
	$: item = $itemStore.find((e) => e.id === id);
	const handleChange = (e: Event) => {
		const file = files[0];
		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (e) => {
				if (e.target?.result && item) {
					item.file = file;
					item.content = e.target.result as string;
				}
			};
		}
	};
	const handleDelete = () => {
		hidden = true;
		itemStore.update((elem) => elem.filter((e) => e.id !== id));
	};
	let hidden: boolean = false;
</script>

<div class="{hidden && 'hidden'} pb-5 md:pb-0">
	{#if !item?.content}
		<div class="relative pb-5 md:pb-0">
			<FileDropzone accept="image/*" bind:files name="files" on:change={handleChange} />
			<button
				on:click={handleDelete}
				class="absolute bottom-[-2rem] right-0 md:right-[-3rem] hover:bg-surface-800 transition-colors hover:scale-110 md:bottom-2 rounded-full bg-surface-700 p-2"
			>
				<Icon icon="mingcute:delete-fill" />
			</button>
		</div>
	{:else}
		<div class="relative">
			<img src={item?.content} class="mx-auto" alt="" />
			<button
				on:click={handleDelete}
				class="absolute bottom-[-2.5rem] right-0 md:bottom-2 md:right-[-3rem] hover:bg-surface-800 transition-colors hover:scale-110 rounded-full bg-surface-700 p-2"
			>
				<Icon icon="mingcute:delete-fill" />
			</button>
		</div>
	{/if}
</div>

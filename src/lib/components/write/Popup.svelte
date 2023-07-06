<script lang="ts">
	import { FireStore } from '$lib/Firebase/FireStore';
	import { docStore, userStore } from '$lib/Sveltefire/stores';
	import { Autocomplete, Avatar, InputChip, modalStore, toastStore } from '@skeletonlabs/skeleton';
	import { itemStore } from './scripts/store';
	import { Item, type Blog, type User } from '../types';
	import { AuthFire } from '$lib/Firebase/Auth';
	import { FireStorage } from '$lib/Firebase/Storage';
	import { goto } from '$app/navigation';
	import FileDropzone from '../Global/FileDropzone.svelte';
	import { Timestamp } from 'firebase/firestore';
	let files: FileList;
	let src:string;
	let category: any = docStore(FireStore.db, 'category/category');
	let inputChip = '';
	let inputChipList: string[] = [];
	$: flavorOptions = $category?.categories?.map((elem: string) => {
		return {
			label: elem.charAt(0).toUpperCase() + elem.slice(1),
			value: elem.toLowerCase()
		};
	});
	const onInputChipSelect = (e: any) => {
		if (inputChipList.length <= 4 && e.detail.value) {
			inputChipList = [...inputChipList, e.detail.value];
			inputChip = '';
		}
	};
	let publishDisabled = true;
	let user = userStore(AuthFire.auth);
	let uid: string;
	let u: User = {
		name: '',
		img: '',
		email: '',
		social: {}
	};
	user.subscribe((val) => {
		uid = val?.uid || '';
		u.name = val?.displayName || '';
		(u.img = val?.photoURL || ''), (u.email = val?.email || '');
	});
	const handleChange = (e: Event) => {
		const file = files[0];
		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (e) => {
				publishDisabled = false
				if (e.target?.result ) {
					src = e.target.result as string;
				}
			};
		}
	};
	const handlePublish = async () => {
		try {
			const promises:Promise<any>[] = [];
			publishDisabled = true;
			const store = new FireStore();
			const blogId = crypto.randomUUID();
			const newItems = inputChipList.filter((elem) => !$category.categories?.includes(elem));
			if (newItems.length > 0) {
				 promises.push(store.updateCategory(newItems));
			}
			const blogCover = await new FireStorage().uploadImageToStorage(files[0],`${blogId}/${files[0].name}`)
			const imgs = $itemStore.filter((elem) => elem.item === Item.img && elem.file);
			for (const img of imgs) {
				if (img.file) {
					const imgUrl = await new FireStorage().uploadImageToStorage(
						img.file,
						`${blogId}/${img.file.name}`
					);
					img.content = imgUrl ?? '';
					delete img.file;
				}
			}
			const blogArr = $itemStore.map((elem) => {
				let val = imgs.find((e) => e.id === elem.id);
				return val ?? elem;
			});
			const realBlog: Blog = {
				uid,
				keywords: inputChipList,
				user: u,
				blogArr,
				coverImg:blogCover ?? "",
				createdAt:Timestamp.now(),
				title:blogArr[0].content.trim().toLowerCase().split(" ")
			};
			promises.push(store.uploadABlog(realBlog, blogId));
			await Promise.all(promises);
			modalStore.close();
			toastStore.trigger({
				message: 'Successfully added new Blog',
				background: 'variant-filled-success'
			});
			goto('/');
		} catch (error) {
			publishDisabled = false;
			console.log(error);
			toastStore.trigger({
				message: 'something went wrong!',
				background: 'variant-filled-warning'
			});
		}
	};
</script>

<section class="card p-5 w-modal shadow-xl space-y-4">
	<h1 class="text-3xl">Publish your blog</h1>
	<hr/>
	<h2>Add Cover photo</h2>
	{#if files?.length > 0 && src}
		<div class="flex justify-center items-center">
				<Avatar src={src} rounded="rounded-lg" width="w-44"  />
		</div>
	{:else}
		<FileDropzone on:change={handleChange} bind:files accept="image/*" name="profile" />
	{/if}
	<hr />
	<h2>Add Categories (Maximum 5)</h2>
	<div class="flex flex-col gap-2 items-center">
		<InputChip
			class="rounded-none"
			bind:input={inputChip}
			placeholder="Create or Add existing tags"
			max={5}
			bind:value={inputChipList}
			name="chips"
		/>
		<div class="card w-full max-h-48 p-4 hide-scrollbar overflow-y-auto" tabindex="-1">
			<Autocomplete
				class="w-full"
				bind:input={inputChip}
				options={flavorOptions}
				denylist={inputChipList}
				on:selection={onInputChipSelect}
			/>
		</div>
	</div>
	<div class="flex justify-end gap-5">
		<button
			on:click={() => {
				modalStore.close();
				modalStore.clear();
			}}
			class="btn variant-outline-error hover:variant-filled-error">Cancel</button
		>
		<button
			on:click={handlePublish}
			disabled={publishDisabled}
			class="btn variant-outline-primary hover:variant-filled-primary">Publish</button
		>
	</div>
</section>

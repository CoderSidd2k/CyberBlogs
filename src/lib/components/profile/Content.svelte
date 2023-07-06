<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { User } from '../types';
	import type {User as fUser} from "firebase/auth"
	export let user: User;
	export let userAuth:fUser;
	import { Avatar, toastStore } from '@skeletonlabs/skeleton';
	import FileDropzone from '../Global/FileDropzone.svelte';
	import { AuthFire } from '$lib/Firebase/Auth';
	import { FireStorage } from '$lib/Firebase/Storage';
	import { FireStore } from '$lib/Firebase/FireStore';
	import { goto } from '$app/navigation';
	let saving = false
	let files: FileList;
	let customUser: User = { ...user };
	let social: User['social'] = {
		fb: user.social?.fb || '',
		instagram: user.social?.instagram || '',
		twitter: user.social?.twitter || ''
	};
	let src = customUser.img || '';
	const handleSave =async () => {
		try {
			saving = true
		customUser.social = social;
		if (file) {
			const img = await new FireStorage().uploadImageToStorage(file,userAuth.uid) 
			if (img) {
				customUser.img = img;
			}
		}
		await new FireStore().updateProfileAndAllBlogs(customUser,userAuth.uid);
		await new AuthFire().updateUserProfile(userAuth,{
			displayName:customUser.name,
			photoURL:customUser.img
		})
		goto("/")
		} catch (error) {
			saving = false
			toastStore.trigger({
				message:"something went wrong",
				background:"variant-filled-warning"
			})
		}
	};
	let file: File;
	const handleChange = () => {
		if (files?.length > 0) {
			file = files[0];
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (e) => {
				if (e.target?.result) {
					src = e.target.result as string;
				}
			};
		}
	};
</script>

<div class="top pt-40 pl-10">
	<h3 class="h3">Profile</h3>
	<p class="p text-gray-500">Edit your profile details here</p>
</div>

<hr class="h-1 my-10" />

<div class="flex public-profile pl-10 flex-col md:flex-row justify-between">
	<div class="md:w-2/5 pb-5">
		<h4 class="h4">Public Profile</h4>
		<p class="p text-gray-500">This will be displayed on your profile</p>
	</div>
	<div class="pr-10 grow space-y-10 md:w-3/5">
		<input
			bind:value={customUser.name}
			class="input rounded-md capitalize"
			type="text"
			placeholder="My Name...."
		/>
		<p class="input rounded-md p-2 hover:cursor-not-allowed text-gray-400">{customUser.email}</p>
	</div>
</div>

<hr class="h-1 my-10" />

<div class="flex profile-pic pl-10 flex-col md:flex-row justify-between gap-26">
	<div class="md:w-2/5 pb-5">
		<h4 class="h4">Profile Picture</h4>
		<p class="p text-gray-500">Show us the best version of you</p>
	</div>
	<div class="pr-10 grow flex gap-5 md:w-3/5 justify-between items-center">
		<div>
			<Avatar
				{src}
				initials={customUser.email}
				width="w-28 md:w-32"
				class="streach"
				alt="profile"
			/>
		</div>

		<FileDropzone
			name="files"
			bind:files
			accept="image/*"
			on:change={handleChange}
			class="grow md:w-3/5"
		>
			<svelte:fragment slot="lead">
				<Icon icon="line-md:upload-loop" class="text-center w-full scale-[3]" />
			</svelte:fragment>
			<svelte:fragment slot="message">Select profile or Drop your profile</svelte:fragment>
			<svelte:fragment slot="meta">png,jpeg,webp</svelte:fragment>
		</FileDropzone>
	</div>
</div>

<hr class="h-1 my-10" />

<div class="flex social pl-10 md:flex-row flex-col justify-between mb-20">
	<div class="pb-5 md:w-2/5">
		<h4 class="h4">Social</h4>
		<p class="p text-gray-500">Add your social media</p>
	</div>
	<div class="pr-10 grow space-y-10 md:w-3/5">
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-lg">
			<div class="input-group-shim">
				<Icon icon="mdi:instagram" />
			</div>
			<input type="text" bind:value={social.instagram} placeholder="your_instagram" />
		</div>
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-lg">
			<div class="input-group-shim">
				<Icon icon="mdi:facebook" />
			</div>
			<input type="text" bind:value={social.fb} placeholder="your_facebook" />
		</div>
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-lg">
			<div class="input-group-shim">
				<Icon icon="mdi:twitter" />
			</div>
			<input type="text" bind:value={social.twitter} placeholder="your_twitter" />
		</div>
	</div>
</div>
<div class="flex justify-end gap-5 p-10 pt-0">
	<button class="btn variant-outline-warning rounded-lg hover:variant-filled-warning"
		on:click={() => {
			new AuthFire().signOut();
		}}>sign out</button
	>
	<button disabled={saving} on:click={handleSave} class="btn variant-outline-primary rounded-lg transition-colors hover:variant-filled-primary">Save</button>
</div>
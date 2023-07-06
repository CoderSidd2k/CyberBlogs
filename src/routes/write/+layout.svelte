<script lang="ts">
	import { AuthFire } from '$lib/Firebase/Auth';
	import {  userStore } from '$lib/Sveltefire/stores';
	import { itemStore } from '$lib/components/write/scripts/store';
	import { AppShell, Avatar, LightSwitch, modalStore, type ModalComponent, type ModalSettings, Modal } from '@skeletonlabs/skeleton';
	import Popup from '$lib/components/write/Popup.svelte';
	let url: string;
	let email: string;
	let name: string;
	let user = userStore(AuthFire.auth);
	user.subscribe((val) => {
		if (val) {
			url = val.photoURL ?? '';
			email = val.photoURL ?? 'cb - blogs';
			name = val.displayName ?? '';
		}
	});

	const handlePublish = () => {
		try {
			const modalComponent: ModalComponent = {
				// Pass a reference to your custom component
				ref: Popup,
				// Add the component properties as key/value pairs
				// Provide a template literal for the default component slot
				slot: '<p>Skeleton</p>'
			};

			const modal: ModalSettings = {
				type: 'component',
				// Pass the component directly:
				component: modalComponent
			};
			modalStore.trigger(modal);
		} catch (error) {
			console.log(error);
		}
	};

	
</script>


<AppShell>
	<svelte:fragment slot="pageHeader">
		<section class="max-w-screen-lg flex mx-auto items-center justify-between h-16 px-2">
			<div class="flex gap-10 items-center">
				<a href="/">
					<Avatar
						border="border-4 border-surface-300-600-token hover:!border-primary-500"
						width="w-12"
						src="/lite-logo.jpeg"
					/>
				</a>
				<p class="hidden md:block">Blog by {name || email || ''}</p>
			</div>
			<div class="flex gap-4 md:gap-10 items-center">
				<button
					on:click={handlePublish}
					disabled={!($itemStore.length > 2)}
					class="btn hover:variant-filled-secondary variant-outline-secondary h-min rounded-lg"
					>Publish</button
				>
				<LightSwitch class="hidden md:block" />
				<Avatar
					src={url}
					initials={name || email}
					width="w-[3.2rem]"
					border="border-4 border-surface-300-600-token hover:!border-primary-500"
					cursor="cursor-pointer"
				/>
			</div>
		</section>
	</svelte:fragment>
	<slot  />
</AppShell>

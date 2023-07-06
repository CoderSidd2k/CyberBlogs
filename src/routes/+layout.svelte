<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import Icon from '@iconify/svelte';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppBar, AppShell, Avatar, LightSwitch, Modal } from '@skeletonlabs/skeleton';
	//Popup

	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	//Code blocks
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	storeHighlightJs.set(hljs);

	//Toast
	import { Toast } from '@skeletonlabs/skeleton';
	//Page
	import { page } from '$app/stores';
	import { userStore } from '$lib/Sveltefire/stores';
	import { AuthFire } from '$lib/Firebase/Auth';
	import { callStore, searchStore } from '$lib/components/home/stores';
	const pages = ['/', '/about'];
	let url: string;
	let email: string;
	let user = userStore(AuthFire.auth);
	user.subscribe((val) => {
		if (val) {
			url = val.photoURL ?? '';
			email = val.photoURL ?? 'cb';
		}
	});
	const handleBtnClick = () => {
		if ($callStore !== undefined) {
			$callStore();
		}
	};
</script>

<Toast />
<AppShell>
	<Modal />

	<svelte:fragment slot="header">
		<AppBar class="py-3 {!pages.includes($page.url.pathname) && 'hidden'} ">
			<svelte:fragment slot="lead">
				<section class="flex items-center gap-3">
					<a href={$page.url.pathname === "/" ? "/about" :"/"}>
						<Avatar
							border="border-4 border-surface-300-600-token hover:!border-primary-500"
							width="w-12"
							src="/lite-logo.jpeg"
						/>
					</a>

					<div class="md:flex gap-2 hidden {!($page.url.pathname === '/') && 'md:hidden'}">
						<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-lg">
							<div class="input-group-shim">
								<Icon icon="ic:twotone-search" class="scale-150" />
							</div>
							<input bind:value={$searchStore} type="search" placeholder="Search..." />
						</div>
						<button
							disabled={$searchStore === ''}
							on:click={handleBtnClick}
							class="btn {$searchStore !== '' &&
								'hover:variant-filled-secondary'} variant-outline-secondary rounded-lg"
							>Search</button
						>
					</div>
				</section>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a href="/write"
					><button
						class="btn flex variant-outline-secondary hover:variant-filled-secondary rounded-lg"
					>
						write <Icon icon="system-uicons:write" />
					</button></a
				>
				<LightSwitch />
				<a href="/profile"
					><Avatar
						border="border-4 border-surface-300-600-token hover:!border-primary-500"
						cursor="cursor-pointer"
						src={url ?? ''}
						initials={email}
						rounded="rounded-full"
						width="w-12"
					/></a
				>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<slot />
</AppShell>

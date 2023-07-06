<script lang="ts">
	import Article from '$lib/components/home/Article.svelte';
	import PopupCategory from '$lib/components/home/PopupCategory.svelte';
	import Faq from '$lib/components/home/Faq.svelte';
	import { FireStore } from '$lib/Firebase/FireStore';
	import PlaceHolder from '$lib/components/Global/PlaceHolder.svelte';
	import { fade } from 'svelte/transition';
	import { collection, limit, query, where } from 'firebase/firestore';
	import type { Blog } from '$lib/components/types';
	import { collectionStore } from '$lib/Sveltefire/stores';
	import { searchStore, callStore } from '$lib/components/home/stores';
	let showSearch = true;
	let ref = collection(FireStore.db, 'blogs');
	let keywords: string[] = [];
	let q = query(ref, limit(10));
	let data = collectionStore<Blog>(FireStore.db, q);

	$: {
		q =
			keywords?.length > 0
				? query(ref, where('keywords', 'array-contains-any', keywords), limit(10))
				: query(ref, limit(10));
		data = collectionStore<Blog>(FireStore.db, q);
	}
	$: {
		if ($searchStore === '') {
			q =
				keywords?.length > 0
					? query(ref, where('keywords', 'array-contains-any', keywords), limit(10))
					: query(ref, limit(10));
			data = collectionStore<Blog>(FireStore.db, q);
		}
	}
	const handleBtn = () => {
		if ($searchStore) {
			const key:string[] =  $searchStore.trim().toLowerCase().split(' ')
			let qs = query(
				ref,
				where('title', 'array-contains-any',key),
				limit(10)
			);
			

			data = collectionStore<Blog>(FireStore.db, qs);
		}
	};
	callStore.set(handleBtn);
</script>

<main class="max-w-screen-lg mx-auto px-4 md:px-8 lg:px-2">
	<h1 class="h1 text-center py-5 md:py-10">CyberBlogs.</h1>

	<div class="flex flex-col-reverse md:flex-row gap-10">
		<div class="grow px-0 md:px-0 md:w-[70%] flex flex-col gap-10">
			{#if $data !== undefined}
				{#each $data as blog}
					<Article
						title={blog.blogArr[0].content}
						img={blog.coverImg}
						tags={blog.keywords}
						userName={blog.user.name || blog.user.email || ''}
						userImg={blog.user.img}
						id={blog.id || '/'}
					/>
				{/each}
			{:else}
				<div transition:fade>
					<PlaceHolder count={4} />
				</div>
			{/if}
		</div>
		<div class="mt-4 grow-0 px-10 md:px-0 md:w-[30%]">
			<PopupCategory bind:keywords bind:showSearch />
			<div class="hidden md:block">
				<Faq />
			</div>
		</div>
	</div>
</main>

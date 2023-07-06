<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	const { blogArr: blogs, user } = data.data as Blog;
	import Para from '$lib/components/blog/Para.svelte';
	import Title from '$lib/components/blog/Title.svelte';
	import Head from '$lib/components/blog/Head.svelte';
	import Code from '$lib/components/blog/Code.svelte';
	import Img from '$lib/components/blog/Img.svelte';
	import { Item, type Blog } from '$lib/components/types';
	import Profile from '$lib/components/blog/Profile.svelte';
</script>

<main class="container max-w-screen-md mx-auto px-4 pb-28 pt-10 lg:px-2 space-y-10">
	<Profile url={user.img} name={user.name || user?.email || ''} email={user?.email || user.name} />
	{#each blogs as blog}
		{#if blog.item === Item.title}
			<Title content={blog.content} />
		{:else if blog.item === Item.para}
			<Para content={blog.content} />
		{:else if blog.item === Item.head}
			<Head content={blog.content} />
		{:else if blog.item === Item.code}
			<Code content={blog.content} lang={blog.lang} />
		{:else if blog.item === Item.img}
			<Img url={blog.content} />
		{/if}
	{/each}
</main>

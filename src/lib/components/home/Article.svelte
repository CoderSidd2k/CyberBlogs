<script lang="ts">
	export let title: string;
	export let img: string;
	export let userImg: string;
	export let userName: string;
	export let id:string;
	import { Avatar } from '@skeletonlabs/skeleton';
	export let tags: string[];
</script>

<a href={`/blogs/${id}`}>
<div
	class="dark:bg-gray-300 bg-opacity-25 shadow-2xl rounded-lg h-min overflow-clip dark:bg-opacity-25"
>
	<section class="flex justify-between w-full">
		<div class="flex shrink flex-col p-2 gap-5 justify-start">
			<div class="flex items-center gap-5 overflow-hidden px-2">
				<Avatar src={userImg} initials={userName} width="w-10" />
				<p class="capitalize line-clamp-1">{userName}</p>
			</div>
			<div>
				<h2 class="h2 p-y ml-4 line-clamp-2 capitalize">{title}</h2>
			</div>
		</div>
		<div class="self-center grow max-w-[8rem] md:block p-2 rounded-lg">
			<img src={img} alt="" class="rounded-lg aspect-[8/7] md:aspect-square object-contain" />
		</div>
	</section>
	<div class="flex gap-2 p-2 overflow-clip items-center">
		{#each tags as tag}
			<span class="chip variant-ghost-primary truncate">{tag}</span>
		{/each}
	</div>
</div>
</a>

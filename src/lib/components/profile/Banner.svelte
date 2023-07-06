<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	export let name: string | null;
	export let email: string | null;
	export let imgUrl:string | null;
</script>

<section class="head relative bg-transparent">
	<img src="/banner.gif" alt="" class="lg:rounded-t-xl w-full h-48 object-cover" />
	<div class=" absolute gap-4 bottom-[-6rem]  md:bottom-[-7rem] lg:bottom-[-8rem] left-4 md:left-12 flex">
		<Avatar
			src={imgUrl ?? ""} initials={email ?? "us"}
			border="border-[5px] border-surface-300-600-token hover:!border-primary-900 transition-colors duration-300"
			cursor="cursor-pointer"
			alt="profile"
			width="lg:w-40 md:w-36 w-32"
		/>
		<div class="flex flex-col self-center pt-6">
			<h1 class="h2 capitalize">{name || email}</h1>
			<a href="mail:to">
                <p class="h6 text-gray-500 lowercase">{email}</p>
            </a>
		</div>
	</div>
</section>

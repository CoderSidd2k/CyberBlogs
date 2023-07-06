<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';

	export let url: string;
	export let name: string;
	export let email: string;
</script>

<div>

	<hr />
	<section class="flex gap-10 py-5">
		<Avatar src={url} width="w-16" />
		<div>
			<h2 class="text-2xl">{name}</h2>
			<h4 class="text-lg">{email}</h4>
		</div>
	</section>
	<hr />
</div>

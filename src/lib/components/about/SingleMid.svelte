<script lang="ts">
	export let head: string;
	export let content: string;
	export let btnContent:string;
	export let href:string;
	export let side: 'left' | 'right' | 'mid';
</script>

<div
	class="card card-hover p-5 md:p-10 text-center  bg-blue-100 w-full  rounded-md {side == 'left' &&
		'md:rounded-l-3xl md:rounded-tr-md rounded-t-3xl'} {side == 'right' &&
		'md:rounded-bl-md md:rounded-r-3xl rounded-b-3xl'}"
>
	<h3 class="h2 ">{head}</h3>
	<p class="p my-4">{content}</p>
	<a {href}>
		<button class="btn px-4 bg-secondary-700 text-white dark:text-white">{btnContent}</button>
	</a>
</div>
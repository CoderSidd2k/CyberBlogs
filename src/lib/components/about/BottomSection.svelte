<script lang="ts">
	import '@fontsource-variable/inter';
	import Icon from '@iconify/svelte';
	const hoverColor:string = "hover:bg-[#1e202c!important]";
	
</script>

<section class="pt-32 font-['Inter_Variable'] lg:px-40">
	<h2 class="text-center h6 font-bold pb-10">Made with ❤️ for passionate writers and avid readers like you!</h2>
	<!-- <p class="text-center">Follow Us</p> -->
	
<div class="logo-cloud grid-cols-1  md: md:!grid-cols-3 gap-1 [&>.logo-item]:bg-transparent [&>.logo-item]:transition-colors [&>.logo-item]:duration-300">
	<a class="logo-item {hoverColor}" href="https://youtube.com/@cybernautjuniorspace">
		<span> <Icon icon="mdi:youtube" /></span>
		<span>Youtube</span>
	</a>
	<a class="logo-item {hoverColor}" href="https://www.instagram.com/cybernautofficial/?hl=en">
		<span><Icon icon="mdi:instagram" /></span>
		<span>instagram</span>
	</a>
	<a class="logo-item {hoverColor}" href="https://www.linkedin.com/company/cybernaut/mycompany/">
		<span><Icon icon="mdi:linkedin"/></span>
		<span>Linkedin</span>
	</a>
	<!-- ... -->
</div>

</section>
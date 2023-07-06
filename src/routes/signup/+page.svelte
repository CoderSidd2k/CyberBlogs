<script lang="ts">
	import Left from "$lib/components/signup/Left.svelte";
  import Right from "$lib/components/signup/Right.svelte";
</script>

<svelte:head>
	<title>Sign up page</title>
	<meta name="description" content="login/signup page" />
</svelte:head>

<main class="flex flex-col pt-[3vh] gap-16  xl:gap-20 ">
  <div class="flex flex-col justify-center items-center">
    <h1 class="text-5xl md:text-7xl">
      <span class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone tracking-wid">CyberBlogs.</span>
    </h1>
  </div>
  <div class="flex justify-center items-center ">
    <div class=" flex  grow lg:grow-0 px-5">
      <Left/>
      <Right />
    </div>
  </div>
</main>

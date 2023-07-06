<script lang="ts">
	import { itemStore } from "./scripts/store";
</script>

<div
	bind:innerText={$itemStore[0].content}
	contenteditable="true"
	class="bold focus:transition-all {$itemStore[0].content.replaceAll("\n","") == '' && 'card variant-ghost-surface'} focus:duration-300 focus:card p-3 focus:variant-ghost-surface h1 outline-none"
>
	
</div>

<script lang="ts">
	import Para from './Para.svelte';
	import Title from './Title.svelte';
	import { fade } from 'svelte/transition';
	import { divStore, itemStore } from './scripts/store';
	import { Write } from './scripts/Write';
	import MyButton from './MyButton.svelte';
	import { Item } from '../types';

	let section: Element;
	let showButton: boolean = true;

	const handleBtnPress = (item: Item) => {
		showButton = false;
		let newPara;
		const write = new Write();
		switch (item) {
			case Item.para:
				newPara = write.createPara();
				break;
			case Item.head:
				newPara = write.createHead();
				break;
			case Item.img:
				newPara = write.createImg();
				break;
			case Item.code:
				newPara = write.createCode();
				break;
		}
		section.appendChild(newPara!);
		setTimeout(() => {
			showButton = true;
		}, 100);
		$divStore.focus();
	};
	const item = $itemStore;
</script>

<section class="py-10 content pb-10">
	<div bind:this={section} class="transition-all space-y-5 pb-10" in:fade>
		<div>
			<Title />
		</div>
		<div>
			<Para id={item[1].id} />
		</div>
	</div>
	<div class="fixed bottom-5 right-5 md:static">
		{#if showButton}
			<MyButton {handleBtnPress} />
		{/if}
	</div>
</section>

<script lang="ts">
	import type { DocumentReference, Firestore } from 'firebase/firestore';
	import { docStore, sdk } from './stores';

	interface $$Slots {
		default: { data: any; ref: DocumentReference | null };
		loading: {};
	}

	export let ref: string | DocumentReference;
	export let firestore: Firestore = $sdk?.firestore;
	export let startWith: any = undefined;

	let store = docStore(firestore, ref, startWith);
</script>

{#if $store === null}
	<slot name="loading" />
{:else}
	<slot data={$store} ref={store.ref} />
{/if}

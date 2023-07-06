<script lang="ts">
	import type { Auth, User } from 'firebase/auth';
	import { sdk, userStore } from './stores';

	import { goto } from '$app/navigation';
	export let redirect: string = '';
	interface $$Slots {
		default: { user: User };
		signedOut: {};
		loading: {};
	}

	export let auth: Auth = $sdk?.auth;

	const user = userStore(auth);
	$: {
		if ($user === null) {
			if (redirect) {
				goto(redirect);
			}
		}
	}
</script>

{#if $user}
	<slot user={$user} />
{:else if $user === undefined}
	<slot name="loading" />
{:else}
	<slot name="signedOut" />
{/if}

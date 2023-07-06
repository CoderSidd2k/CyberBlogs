<script lang="ts">
	import Loading from '$lib/components/Global/Loading.svelte';
	import PlaceHolder from '$lib/components/Global/PlaceHolder.svelte';
	import Banner from '$lib/components/profile/Banner.svelte';
	import Content from '$lib/components/profile/Content.svelte';
	import { AuthFire } from '$lib/Firebase/Auth';
	import { FireStore } from '$lib/Firebase/FireStore';
	import Doc from '$lib/Sveltefire/Doc.svelte';
	import FirebaseApp from '$lib/Sveltefire/FirebaseApp.svelte';
	import User from '$lib/Sveltefire/User.svelte';
</script>

<FirebaseApp auth={AuthFire.auth} firestore={FireStore.db}>
	<User let:user redirect="/login">
		<Doc firestore={FireStore.db} ref={`users/${user.uid}`} let:data let:ref startWith={null}>
			<main class="container max-w-screen-lg mx-auto">
				<Banner imgUrl={user.photoURL} name={user.displayName} email={user.email} />
				<Content user={data} userAuth={user} />
			</main>
			<div slot="loading">
				<div class="container max-w-screen-lg mx-auto">
					<PlaceHolder count={4} />
				</div>
			</div>
		</Doc>
		<div slot="loading">
			<Loading />
		</div>
	</User>
</FirebaseApp>

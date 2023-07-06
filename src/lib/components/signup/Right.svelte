<script lang="ts">
	import { goto } from '$app/navigation';
	import { AuthFire } from '$lib/Firebase/Auth';
	import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	let username: string = '';
	let password: string = '';
	let confPassword: string = '';
	const handleGoogle = async () => {
		try {
			const user = await new AuthFire().continueWithGoogle();
			if (user?.newUser) {
				goto('/profile');
			} else if (user) {
				goto('/');
			} else {
				const t: ToastSettings = {
					message: 'Something went wrong , please try again.',
					background: 'variant-filled-warning'
				};
				toastStore.trigger(t);
			}
		} catch (error) {
			const t: ToastSettings = {
				message: 'Something went wrong , please try again.',
				background: 'variant-filled-warning'
			};
			toastStore.trigger(t);
		}
	};
	const handleSignup = async () => {
		if (username && password && confPassword) {
			if (!username.includes('@')) {
				const t: ToastSettings = {
					message: 'Please provide a valid email',
					background: 'variant-filled-error'
				};
				toastStore.trigger(t);
				return;
			}
			if (password !== confPassword) {
				const t: ToastSettings = {
					message: "Passwords doesn't match",
					background: 'variant-filled-error'
				};
				toastStore.trigger(t);
				return;
			}
			const user = await new AuthFire().signUpWithEmail(username, password);
			if (user) {
				goto('/profile');
			} else {
				const t: ToastSettings = {
					message: 'Something went wrong , please try again.',
					background: 'variant-filled-warning'
				};
				toastStore.trigger(t);
			}
		} else {
			const t: ToastSettings = {
				message: 'Please fill all the fields',
				background: 'variant-filled-error'
			};
			toastStore.trigger(t);
		}
	};
</script>

<div
	class="bg-white shadow-2xl bg-opacity-10 w-full md:w-1/2 py-10  rounded-lg md:rounded-l-none p-4 grid place-items-center"
>
	<div class="flex flex-col justify-center items-center gap-2">
		<img
			src="https://cybernaut.co.in/wp-content/uploads/2023/03/Logo-White-768x768.png"
			alt="Logo"
			class="rounded-full w-[50px] h-[50px]"
		/>
		<h1 class="h1 mb-4">
			<span class="">Welcome.</span>
		</h1>
		<button
			on:click={handleGoogle}
			class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center mt-4 w-64 justify-center"
		>
			<img
				src="https://banner2.cleanpng.com/20180326/gte/kisspng-google-logo-g-suite-google-guava-google-plus-5ab8b5b15fd9f4.0166567715220545773927.jpg"
				alt="Google Logo"
				class="mr-2 h-5 w-5"
			/>
			Sign up with Google
		</button>
		<div class="my-6 flex items-end w-full justify-center">
			<hr class="h-2 grow" />
			<p class="dark:text-white text-black font-semibold">Or sign up with e-mail</p>
			<hr class="h-2 grow" />
		</div>
		<input
			class="input-lg variant-form-material mb-4 w-64"
			title="Username"
			type="email"
			bind:value={username}
			placeholder="Email"
		/>
		<input
			class="input-lg variant-form-material mb-4 rounded-lg w-64"
			title="Password"
			type="password"
			bind:value={password}
			placeholder="Create Password"
		/>
		<input
			class="input-lg variant-form-material mb-4 w-64"
			title="Confirm password"
			type="password"
			bind:value={confPassword}
			placeholder="Confirm Password"
		/>

		<div class="flex flex-col items-center mt-auto">
			<button type="submit" on:click={handleSignup} class="btn variant-filled w-64 rounded-sm">Sign in</button>
		</div>
		<a href="/login"
			><p class="p mt-6 text-center">
				Already have an account ? <span class="anchor">login.</span>
			</p></a
		>
	</div>
</div>

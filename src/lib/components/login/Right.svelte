<script lang="ts">
	import { goto } from "$app/navigation";
	import { AuthFire } from "$lib/Firebase/Auth";
	import { toastStore, type ToastSettings } from "@skeletonlabs/skeleton";

  let username:string = "";
  let password:string = "";
  const handleSignIn = async() => {
		if (username && password ) {
      if (!username.includes("@")) {
        const t: ToastSettings = {
					message: "Please provide a valid email",
					background: 'variant-filled-error'
				};
        toastStore.trigger(t);
        return;
      }
     const user =  await new AuthFire().signInWithEmail(username,password);
     if(user){
        goto("/");
     }else{
        const t:ToastSettings = {
          message: 'Something went wrong , please try again.',
          background:"variant-filled-warning"
        }
        toastStore.trigger(t)
     }
		} else {
			const t: ToastSettings = {
				message: 'Please fill all the fields',
				background: 'variant-filled-error'
			};
			toastStore.trigger(t);
		}
	};
  const handleGoogle = async () => {
    try {
      const user = await new AuthFire().continueWithGoogle();
      if (user?.newUser) {
        goto('/profile')
      }else if(user){
        goto('/')
      }else{
        const t:ToastSettings = {
            message: 'Something went wrong , please try again.',
            background:"variant-filled-warning"
          }
          toastStore.trigger(t)
      }
    } catch (error) {
      const t:ToastSettings = {
          message: 'Something went wrong , please try again.',
          background:"variant-filled-warning"
        }
        toastStore.trigger(t)
    }
  }
</script>

<div class="bg-white  bg-opacity-10 w-full py-16 md:py-4 md:w-1/2 rounded-lg md:rounded-l-none md:rounded-r-lg p-4 grid place-items-center shadow-2xl">
  <div class="flex flex-col justify-center items-center">
    
    <img src="https://cybernaut.co.in/wp-content/uploads/2023/03/Logo-White-768x768.png" alt="Logo" class="rounded-full w-[50px] h-[50px]">

    
    <h1 class="dark:text-white text-3xl mb-2 text-black">Get started!</h1>

    
    <button on:click={handleGoogle} class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center mt-4 w-64 justify-center">
      <img src="https://banner2.cleanpng.com/20180326/gte/kisspng-google-logo-g-suite-google-guava-google-plus-5ab8b5b15fd9f4.0166567715220545773927.jpg" alt="Google Logo" class="mr-2 h-5 w-5">
      Log in with Google
    </button>

    
    <div class="my-6 flex items-end w-full justify-center">
      <hr class="h-2 grow">
      <p class="dark:text-white text-black font-semibold">Or sign in with e-mail</p>
      <hr class="h-2 grow">
    </div>
      <input
        class="input-lg variant-form-material mb-6 mt-6 w-64"
        title="Username"
        type="email"
        bind:value={username}
        placeholder="email"
      />
      <input
        class="input-lg variant-form-material mb-4 w-64"
        title="Password"
        type="password"
        bind:value={password}
        placeholder="Password"
      />
      <button type="submit" on:click={handleSignIn} class="btn variant-filled my-4 w-64 rounded-sm">Log in</button>

      <div class="flex flex-col items-center mt-auto">
        <div class="h-0.5 w-1/2 bg-gray-300 my-2"></div>
        
        
      </div>
      
      <a href="/signup"
			><p class="p  text-center">
				Haven't registered Yet ? <span class="anchor">Signup.</span>
			</p></a
		>
    </div>
  </div>
<script lang="ts">
  import { goto } from "$app/navigation";
  import HeaderMenu from "$lib/components/HeaderMenu.svelte";
  
  const goMain = () => {
    goto("/");
  };
</script>

<header class="flex items-center justify-between border-b px-4 py-3 sm:px-6 sm:py-4">
  <div class="text-lg sm:text-xl font-bold cursor-pointer">
    <button on:click={goMain}>Logo</button>
  </div>
  
  <nav class="min-w-fit flex space-x-4 mx-4 md:space-x-8">
    <HeaderMenu menu="Applications" />
    <HeaderMenu menu="Protocols" />
    <HeaderMenu menu="Domains" />
  </nav>
  
  <button
    class="hover:bg-gray-600 bg-black text-white text-xs sm:text-sm font-bold px-2 py-1 sm:py-2 rounded transition"
    on:click={() => goto('/login')}>
    Login
  </button>
</header>

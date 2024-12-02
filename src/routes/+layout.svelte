<script lang="ts">
  import "../app.css";
  import Header from '$lib/components/Header.svelte';
</script>

<div class="min-w-[620px] min-h-screen h-screen flex flex-col">
  <Header />
  <div class="flex-1 overflow-auto ">
    <slot />
  </div>
</div>

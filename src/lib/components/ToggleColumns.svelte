<script>
  import DropdownLabel from '$lib/components/DropdownLabel.svelte';
  
  let dropdownOpen = false;
  
  const toggleDropdown = () => {
    dropdownOpen = !dropdownOpen;
  };
</script>

<div class="relative">
  <button
    class="px-3 py-1 text-gray-600 text-sm font-bold bg-gray-100 rounded-lg
    hover:bg-gray-200 transition"
    on:click={toggleDropdown}
  >
    View
  </button>
  
  {#if dropdownOpen}
    <ul class="absolute right-0 mt-2 py-2 w-36 bg-white border border-gray-300 rounded-lg shadow-lg text-sm">
    <DropdownLabel value='Name' />
    <DropdownLabel value='Category' />
    <DropdownLabel value='Description' />
    <DropdownLabel value='Tag' />
    <DropdownLabel value='Created_at' />
    <DropdownLabel value='Updated_at' />
    </ul>
  {/if}
</div>

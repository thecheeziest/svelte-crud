<script>
  import {showCategory, showDescription, showTag, showLabel, showCreatedAt, showUpdatedAt} from '$lib/stores/tableStore';
  
  export let value = '';
</script>

<li class="px-4 py-2 flex items-center">
  <label class="relative flex items-center space-x-2 cursor-pointer select-none">
    {#if value === 'Name'}
      <input
        type="checkbox"
        bind:checked={$showLabel}
        class="sr-only peer"
      />
    {:else if value === 'Category'}
      <input
        type="checkbox"
        bind:checked={$showCategory}
        class="sr-only peer"
      />
    {:else if value === 'Description'}
      <input
        type="checkbox"
        bind:checked={$showDescription}
        class="sr-only peer"
      />
    {:else if value === 'Tag'}
      <input
        type="checkbox"
        bind:checked={$showTag}
        class="sr-only peer"
      />
    {:else if value === 'Created_at'}
      <input
        type="checkbox"
        bind:checked={$showCreatedAt}
        class="sr-only peer"
      />
    {:else if value === 'Updated_at'}
      <input
        type="checkbox"
        bind:checked={$showUpdatedAt}
        class="sr-only peer"
      />
    {/if}
    
    <!-- 커스텀 체크박스 -->
    <span
      class="w-4 h-4 border border-gray-300 rounded-sm
             peer-checked:border-black
             flex items-center justify-center transition-all duration-200 ease-in-out
             after:content-[''] after:w-2.5 after:h-2.5 after:scale-0 peer-checked:after:scale-100
             after:bg-black after:rounded-sm after:transition-transform after:duration-200"
    ></span>

    <span class="text-gray-700">{value}</span>
  </label>
</li>

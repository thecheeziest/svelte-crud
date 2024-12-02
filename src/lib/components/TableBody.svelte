<script lang="ts">
  import {showCategory, showCreatedAt, showDescription, showEndpoint, showLabel, showTag, showType, showUpdatedAt, tasks} from '$lib/stores/tableStore.js';
  import Checkbox from '$lib/components/Checkbox.svelte';
  
  export let dataType = '';
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    
    const year = date.getFullYear().toString().slice(2); // 연도 마지막 2자리
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  
  let isExpend = false;
  let onId = 0;
  
  const viewDetail = async (id: number) => {
    // 열린 상태에서 다른 행 눌렀을 경우
    if (isExpend && onId !== id) {
      isExpend = true;
    } else {
      isExpend = !isExpend;
    }
    onId = id;
  }
  
  $: appStyle = dataType === 'applications' && 'grid-cols-[1fr_50px]';
</script>

<tbody class="bg-white divide-y divide-gray-200 text-center border-b">
{#if $tasks.status === 401}
  <tr>
    <td colspan="8" class="text-center text-gray-500">검색 결과가 존재하지 않습니다.</td>
  </tr>
{:else if $tasks && $tasks.data}
  {#each $tasks.data as row}
    <tr class={`hover:bg-gray-50 cursor-pointer`} on:click={() => viewDetail(row.id)}>
      <td>
        <Checkbox value={row.id} type="table" />
      </td>
      
      {#if $showLabel}
        <td class={`truncate text-center h-full grid justify-center items-center ${appStyle}`}>
          <span class="tooltip" title={row.label}>{row.label}</span>
          {#if row.metadata && row.metadata.icon}
            <img src={row.metadata.icon} alt="Icon" class="w-6" />
          {/if}
        </td>
      {/if}
      
      {#if $showCategory}
        <td class="truncate">
          {#each row.categories as category, index (category)}
            <span class="tooltip" title={category.label}>
              {category.label}{index < row.categories.length - 1 ? ', ' : ''}
            </span>
          {/each}
        </td>
      {/if}
      
      {#if dataType === 'domains'}
        {#if $showType}
          <td class="truncate">
            <span class="tooltip" title={row.type}>{row.type}</span>
          </td>
        {/if}
        
        {#if $showEndpoint}
          <td class="truncate">
            <span class="tooltip" title={row.endpoint}>{row.endpoint}</span>
          </td>
        {/if}
      {/if}
      
      {#if $showDescription}
        <td class={`transition-all duration-100 text-center ${row.id === onId && isExpend ? 'py-1' : 'whitespace-nowrap overflow-hidden text-ellipsis'}`}>
          <span class="tooltip" title={row.description}>{row.description}</span>
        </td>
      {/if}
      
      {#if $showTag}
        <td class="truncate">
          <span class="tooltip" title={row.tag}>{row.tag}</span>
        </td>
      {/if}
      
      {#if $showCreatedAt}
        <td class="truncate">
          <span class="tooltip" title={row.created_at}>{formatDate(row.created_at)}</span>
        </td>
      {/if}
      
      {#if $showUpdatedAt}
        <td class="truncate">
          <span class="tooltip" title={row.updated_at}>{formatDate(row.updated_at)}</span>
        </td>
      {/if}
    </tr>
  {/each}
{/if}
</tbody>
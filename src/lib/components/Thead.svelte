<script lang="ts">
  import {sortStates, tasks} from "$lib/stores/tableStore";
  
  export let type = '';
  
  const lowerType = type.toLowerCase();

  const sortData = () => {
    sortStates[lowerType].ascending = !sortStates[lowerType].ascending;
    // 정렬 방향 토글
    tasks.sorted(lowerType);
    // tasks 데이터 정렬 호출
    tasks.paginated();
    // 현재 페이지 task 데이터 호출
    console.log($tasks)
  }
  
  $: columnStyle = type === 'Name' || type === 'Category' ? 'w-[30%]' : type === 'Description' ? 'w-[100%]' : type === 'Link' ? 'w-[10%]' : type === 'Hashtag' ? 'w-[50%]' : '';
</script>


<th class={columnStyle}>
  {type}
  {#if type !== 'Link' && type !== 'Hashtag'}
    <button class="w-7 text-gray-400 cursor-pointer rounded-md hover:bg-gray-100 hover:text-gray-500"
            on:click={sortData}>
      {sortStates[lowerType].ascending ? '↑' : '↓'}
    </button>
  {/if}
</th>

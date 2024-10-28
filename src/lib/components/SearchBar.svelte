<script>
  import {itemsPerPage, searchQuery, tasks, totalPages} from '$lib/stores/tableStore';
  
  const search = () => {
    // 검색 필터 호출
    tasks.search();
    $totalPages = Math.ceil($tasks.task.length / itemsPerPage);
  };
</script>

<input
  type="text"
  class="w-1/2 p-2 border border-gray-300 rounded-lg"
  placeholder="검색어를 입력하세요."
  bind:value={$searchQuery}
  on:input={search}
/>
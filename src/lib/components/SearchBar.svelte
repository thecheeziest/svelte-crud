<script>
  import {searchQuery, tasks} from '$lib/stores/tableStore';
  
  export let dataType = '';
  
  const search = async () => {
    // 검색 필터 호출
    try {
      await tasks.filtered(dataType);
    } finally {
      if ($tasks.status === 200) {
        console.log($tasks);
      } else if ($tasks.status === 400) {
        alert("검색 결과가 없습니다.");
      }
    }
  };
</script>

<input
  type="text"
  class="w-1/2 min-w-60 p-2 border border-gray-300 rounded-lg"
  placeholder="검색어를 입력하세요."
  bind:value={$searchQuery}
  on:input={search}
/>
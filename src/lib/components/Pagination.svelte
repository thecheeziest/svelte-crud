<script lang="ts">
  import { currentPage, totalPages, tasks } from '$lib/stores/tableStore';
  
  const goToPage = (page: number) => {
    if (page >= 1 && page <= $totalPages) {
      $currentPage = page;
    }
    // 현재 페이지에 맞는 데이터 호출
    tasks.paginated();
  };
</script>

<div class="flex justify-end items-center space-x-2 my-5">
  <button
    class="px-2 py-1 bg-white text-gray-800 border border-gray-300 rounded-lg
           hover:bg-black hover:text-white transition
           disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed"
    on:click={() => goToPage($currentPage - 1)}
    disabled={$currentPage === 1}
  >
    ＜
  </button>
  
  <span class="text-sm">Page {$currentPage} of {$totalPages}</span>
  
  <button
    class="px-2 py-1 bg-white text-gray-800 border border-gray-300 rounded-lg
           hover:bg-black hover:text-white transition
           disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed"
    on:click={() => goToPage($currentPage + 1)}
    disabled={$currentPage === $totalPages}
  >
    ＞
  </button>
</div>

<script lang="ts">
  import {cateCurrentPage, categories, categoryTag, currentPage, isModalCategory, isTheadCategory, modalData, tasks} from '$lib/stores/tableStore';
  
  export let dataType = '';
  export let type: string;
  
  // 이전, 다음 버튼 클릭 시
  const goToPage = async (button: string) => {
    // Thead 카테고리 페이징
    if (type === 'category') {
      // 이전 페이지, 다음 페이지 값 설정
      const page = button === 'prev' ? $cateCurrentPage - 1 : $cateCurrentPage + 1;
      
      if (page >= 1 && page <= $categories.totalPages) {
        // 다음 페이지 있을 경우 할당
        $cateCurrentPage = page;
      }
      
      // 현재 페이지에 맞는 데이터 호출
      await categories.getCategories(dataType.slice(0, -1));
      
      // 데이터 테이블 페이징
    } else {
      // 이전 페이지, 다음 페이지 값 설정
      const page = button === 'prev' ? $currentPage - 1 : $currentPage + 1;
      
      if (page >= 1 && page <= $tasks.totalPages) {
        // 다음 페이지 있을 경우 할당
        $currentPage = page;
      }
      
      // 현재 페이지에 맞는 데이터 호출
      await tasks.getDatas(dataType);
    }
  };
  
  // 카테고리 리셋 버튼 클릭 시
  const reset = async () => {
    if (type === 'thead') {
      await tasks.resetCategory(dataType); // 카테고리 정렬 리셋 호출
      $isTheadCategory = ''; // 선택된 카테고리 이름 초기화
    } else if (type === 'modal') {
      $isModalCategory = ''; // 모달 카테고리 이름 초기화
      $modalData.category = ''; // 모달 카테고리 데이터 초기화
    }
    $categoryTag = ''; // 선택된 카테고리 태그 초기화
  }
  
  $: prevDisabled = type === 'thead' || type === 'modal' ? $cateCurrentPage === 1 : $currentPage === 1;
  $: nextDisabled = type === 'thead' || type === 'modal' ? $cateCurrentPage === $categories.totalPages : $currentPage === $tasks.totalPages;
  $: divStyle = type === 'thead' || type === 'modal' ? 'justify-between mt-2' : 'justify-end space-x-2 my-5';
  $: buttonStyle = type === 'thead' || type === 'modal' ? 'px-3 py-1 text-gray-600 hover:bg-gray-100' : 'px-2 py-1 text-gray-800 border-gray-300 hover:bg-black hover:text-white'
</script>

<div class={`flex items-center ${divStyle}`}>
  <button
    class={`bg-white border rounded-md text-sm transition ${buttonStyle}
           disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed`}
    on:click={() => goToPage('prev')}
    disabled={prevDisabled}
  >
    {type === 'thead' || type === 'modal' ? '＜' : 'Prev'}
  </button>
  
  {#if type === 'thead' || type === 'modal'}
    <button
      class='rounded-md px-3 py-1 text-sm text-gray-500 transition hover:text-black'
      on:click={reset}>
      ↻
    </button>
  {:else}
    <span class="text-sm">Page {$currentPage} of {$tasks.totalPages}</span>
  {/if}
  
  <button
    class={`bg-white border rounded-md text-sm transition ${buttonStyle}
           disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed`}
    on:click={() => goToPage('next')}
    disabled={nextDisabled}
  >
    {type === 'thead' || type === 'modal' ? '＞' : 'Next'}
  </button>
</div>
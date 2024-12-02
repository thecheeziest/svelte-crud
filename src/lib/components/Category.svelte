<script lang="ts">
  import {onMount} from "svelte";
  import {cateCurrentPage, categories, categoryTag, isModalCategory, isModalSelectOpen, isSelectOpen, isTheadCategory, modalData, selected, tasks} from '$lib/stores/tableStore.js';
  import CategoryButtons from "$lib/components/CategoryButtons.svelte";
  import Checkbox from "$lib/components/Checkbox.svelte";
  import Pagination from "$lib/components/Pagination.svelte";
  
  export let type: string = '';
  export let dataType = '';
  
  // 선택된 모달 카테고리 - 모달 카테고리 데이터 있을 경우 할당
  $isModalCategory = $modalData.category && $tasks.dataItem[0].categories[0] && $tasks.dataItem[0].categories[0].label;
  
  onMount(() => {
    // 타 영역 클릭 시 셀렉트 닫기
    const clickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.select')) {
        $isSelectOpen = false; // 카테고리 셀렉트 닫기
        $isModalSelectOpen = false; // 모달 카테고리 셀렉트 닫기
      }
    };
    // 윈도우 클릭 이벤트 설정
    window.addEventListener('mousedown', clickOutside);
  });
  
  // 카테고리 셀렉트 열림/닫힘
  const onSelectOpen = async () => {
    selected.resetChecked('table'); // 테이블 체크박스 초기화
    // Thead 카테고리일 경우
    if (type === "thead") {
      $isSelectOpen = !$isSelectOpen; // 카테고리 토글
      // 모달 카테고리일 경우
    } else if (type === "modal") {
      $isModalSelectOpen = !$isModalSelectOpen; // 모달 카테고리 토글
    }
    
    // 카테고리 데이터 호출
    await categories.getCategories(dataType.slice(0, -1));
  }
  
  // 카테고리 선택 시
  const onSelectCategory = async (label: string, tag: string) => {
    $categoryTag = tag; // 선택된 카테고리 태그
    $cateCurrentPage = 1; // 카테고리 페이지 초기화
    
    // Thead 카테고리일 경우
    if (type === "thead") {
      $isTheadCategory = label; // Thead 카테고리 데이터 입력
      $isSelectOpen = false; // Thead 카테고리 닫기
      await tasks.filtered(dataType); // 카테고리 필터링 기능 호출
      
      // 모달 카테고리일 경우
    } else if (type === "modal") {
      $isModalCategory = label; // 모달 카테고리 데이터 입력
      $isModalSelectOpen = false; // 모달 카테고리 닫기
      $modalData.category = tag; // 모달 카테고리 데이터 입력
    }
  }
  
  $: {
    // 카테고리 셀렉트 닫힐 경우
    if ($isSelectOpen) {
      $cateCurrentPage = 1; // 카테고리 페이지 초기화
      selected.resetChecked('category'); // 카테고리 체크박스 초기화
    }
  }
  
  $: typeStyle = type === "thead" ? "text-[13px] hover:bg-gray-100 border-transparent select-none" : "w-full h-10 border border-gray-300 text-gray-400 pl-2 mt-2 flex items-center select-none hover:bg-gray-100";
  $: typeStyle2 = type === "modal" && " w-full";
  $: selectStyle = type === "thead" && $isSelectOpen ? 'scale-100' : type === "modal" && $isModalSelectOpen ? "scale-100" : "scale-0";
</script>

<button
  class={`select px-2 py-1 relative rounded-md transition-all cursor-pointer ${typeStyle}`}
  on:click={onSelectOpen}>
  {#if type === 'thead' && $isTheadCategory !== ''}
    {$isTheadCategory}
  {:else if type === 'modal' && $isModalCategory !== ''}
    {$isModalCategory}
  {:else}
    Category
  {/if}
</button>

<div class={`select absolute mt-2 min-w-48 pb-6 cursor-auto transition ${selectStyle} ${typeStyle2}`}>
  <div class={`bg-white border border-gray-300 rounded-md shadow-lg w-full p-2`}>
    {#if dataType === 'domains'}
      <CategoryButtons />
    {/if}
    
    <ul>
      {#each $categories.data as category}
        <li class="flex">
          {#if dataType === 'domains'}
            <Checkbox value={category.id} type="category" />
          {/if}
          <button class="w-full pt-1 pb-2 text-sm text-gray-600 font-medium border-b hover:bg-gray-200 rounded"
                  on:click={() => onSelectCategory(category.label, category.tag)}>
            {category.label}
          </button>
        </li>
      {/each}
    </ul>
    
    <Pagination dataType={dataType} type={type} />
  </div>
</div>
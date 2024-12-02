<script lang="ts">
  import { onMount } from "svelte";
  import {isModal, tasks, selected, modalMode, modalData, orderIcon,} from "$lib/stores/tableStore";
  import Pagination from './Pagination.svelte';
  import ToggleColumns from './ToggleColumns.svelte';
  import SearchBar from "$lib/components/SearchBar.svelte";
  import DataModal from "$lib/components/TableModal.svelte";
  import TableHeaders from "$lib/components/TableHeaders.svelte";
  import TableBody from "$lib/components/TableBody.svelte";
  import ButtonItem from "$lib/components/ButtonItem.svelte";
  import CategoryModal from "$lib/components/CategoryModal.svelte";
  
  export let dataType: 'applications' | 'domains' | 'protocols';
  
  onMount(async () => {
    await tasks.getDatas(dataType);  // 현재 페이지에 맞는 데이터 호출
    // 정렬 아이콘 초기화
    $orderIcon = {
      Label: '↕',
      Tag: '↕',
      Created_at: '↕',
      Updated_at: '↕',
    };
  });
  
  // 모달 창 열림/닫힘
  const toggleModal = async (type?: string) => {
    // 수정 버튼일 경우
    if (type === 'edit') {
      $modalMode = 'edit'; // 모달 수정 모드 설정
      try {
        // 수정할 데이터 호출
        if ($selected.tableItem !== null) {
          await tasks.getData(dataType, $selected.tableItem);
        }
        const data = $tasks.dataItem[0];
        
        // 수정 데이터 모달 데이터에 할당
        modalData.update(currentData => ({
          ...currentData,
          label: data.label,
          type: data.type,
          endpoint: data.endpoint,
          category: data.categories[0].tag,
          tag: data.tag,
          description: data.description,
        }));
      } finally {
        if ($tasks.status === 200) {
          $isModal = !$isModal; // 모달 토글
        } else if ($tasks.status === 404) {
          alert("선택된 데이터에 오류가 발생했습니다. 다시 시도해 주세요.");
        }
      }
      
      // 추가 버튼일 경우
    } else {
      $modalMode = 'add'; // 모달 추가 모드 설정
      $isModal = !$isModal;
    }
  }
</script>

<div class="h-full flex flex-col max-w-fit">
  <DataModal dataType={dataType} toggleModal={toggleModal} />
  <CategoryModal dataType={dataType} />
  <div class="flex justify-between items-center mb-4">
    <div class="w-1/2 flex">
      <SearchBar dataType={dataType} />
      {#if dataType === 'domains'}
        <ButtonItem button="추가" type="table" toggleModal={toggleModal}/>
        <ButtonItem button="수정" type="table" toggleModal={toggleModal} />
        <ButtonItem button="삭제" type="table" dataType={dataType} toggleModal={toggleModal} />
      {/if}
    </div>
    <ToggleColumns />
  </div>
  
  <div class="flex-1 flex flex-col rounded-xl border border-gray-300 shadow-md px-3 overflow-x-auto min-w-[750px]">
    <table class="min-w-full w-full h-full table-fixed">
      <TableHeaders dataType={dataType} />
      <TableBody dataType={dataType} />
    </table>
    
    <div class="m-3">
      <Pagination dataType={dataType} type="table" />
    </div>
  </div>
</div>

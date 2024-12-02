<script lang="ts">
  import {cateCurrentPage, categoryTag, isModal, modalData, selected, selfLabel, selfTag} from "$lib/stores/tableStore";
  import Category from "$lib/components/Category.svelte";
  import ModalInputItem from "$lib/components/ModalInputText.svelte";
  import DataModalTypeItem from "$lib/components/ModalInputRadio.svelte";
  import ModalButtons from "$lib/components/ModalButtons.svelte";
  
  // 모달 창 열림/닫힘 상태 관리
  export let toggleModal: () => void;
  export let dataType = 'domains';
  
  // 타입별 endpoint placeholder 동적 설정
  $: endpointPlaceholder =
    $modalData.type === "dom"
      ? "Enter domain (ex. google.com)"
      : $modalData.type === "net"
        ? "Enter IP address (ex. 192.168.1.1)"
        : $modalData.type === "rxp"
          ? "Enter regex pattern (ex. .+\\.abc.com)"
          : "Please select a type";
  
  $: {
    // 모달 닫을 경우 데이터 초기화
    if (!$isModal) {
      modalData.update(currentData => ({
        ...currentData,
        label: "",
        type: "",
        endpoint: "",
        category: "",
        tag: "",
        description: ""
      }));
      
      $categoryTag = ''; // 선택된 카테고리 태그
      $cateCurrentPage = 1; // 카테고리 페이지 초기화
      
      $selfLabel = false; // Label 자동 입력 여부
      $selfTag = false; // Tag 자동 입력 여부
      
      selected.resetChecked('all'); // 체크박스 데이터 초기화
    }
  }
</script>

{#if $isModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 z-10" on:click={toggleModal}></div>
  
  <div class="flex justify-center z-10">
    <div class="fixed bg-white rounded-lg shadow-lg p-6 max-w-lg w-full space-y-10 max-h-[85vh] overflow-y-auto">
      <div class="space-y-6 text-sm select-none">
        <ModalInputItem label="Label" placeholder="Enter name" />
        
        <div>
          Type
          <div class="flex my-2 justify-around mb-8">
            <DataModalTypeItem value="dom" />
            <DataModalTypeItem value="net" />
            <DataModalTypeItem value="rxp" />
          </div>
        </div>
        
        <ModalInputItem label="Endpoint" placeholder={endpointPlaceholder} />
        
        <div class="relative">
          Category
          <Category dataType={dataType} type="modal" />
        </div>
        
        <ModalInputItem label="Tag" placeholder="Enter name" />
        
        <ModalInputItem label="Description" placeholder="Enter description" />
        
        <ModalButtons dataType={dataType} toggleModal={toggleModal} type="table" />
      </div>
    </div>
  </div>
{/if}
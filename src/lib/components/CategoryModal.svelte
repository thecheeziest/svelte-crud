<script lang="ts">
  import {cateCurrentPage, categoryTag, isCategoryModal, modalData, selected, selfLabel, selfTag} from "$lib/stores/tableStore";
  import ModalInputText from "$lib/components/ModalInputText.svelte";
  import ModalButtons from "$lib/components/ModalButtons.svelte";
  import ModalInputRadio from "$lib/components/ModalInputRadio.svelte";
  
  export let dataType = '';
  
  const toggleModal = () => {
  $isCategoryModal = !$isCategoryModal;
  };
  
  $: {
    // 모달 닫을 경우 데이터 초기화
    if (!$isCategoryModal) {
      modalData.update(currentData => ({
        ...currentData,
        label: "",
        tag: "",
        active: false,
        vendor: "",
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

{#if $isCategoryModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 z-10" on:click={toggleModal}></div>
  
  <div class="flex justify-center z-10">
    <div class="fixed bg-white rounded-lg shadow-lg p-6 max-w-lg w-full space-y-10 max-h-[85vh] overflow-y-auto">
      <div class="space-y-6 text-sm select-none">
        <ModalInputText label="Label" placeholder="Enter name" type="category" />
        
        <ModalInputText label="Tag" placeholder="Enter tag" type="category" />
        
        <div>
          Active
          <div class="flex my-2 justify-around mb-8">
            <ModalInputRadio value={true} />
            <ModalInputRadio value={false} />
          </div>
        </div>
        
        <ModalInputText label="Vendor" placeholder="Enter vendor" type="category" />
        
        <ModalInputText label="Description" placeholder="Enter description" type="category" />
        
        <ModalButtons dataType={dataType} toggleModal={toggleModal} type="category" />
      </div>
    </div>
  </div>
{/if}
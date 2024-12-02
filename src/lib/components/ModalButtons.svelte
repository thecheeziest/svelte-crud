<script lang="ts">
  import {categories, isCategoryModal, isModal, modalData, modalMode, selected, tasks} from '$lib/stores/tableStore.js';
  
  export let toggleModal: () => void;
  export let dataType: string = '';
  export let type: string = '';
  
  // 모달 데이터 업데이트
  const updateData = async () => {
    // 테이블 모달일 경우
    if (type === 'table') {
      if ($modalData.label.trim() === "" || $modalData.type.trim() === "" ||
        $modalData.endpoint.trim() === "" || $modalData.category.trim() === "" ||
        $modalData.tag.trim() === "" || $modalData.description.trim() === "") {
        alert("누락된 값이 존재합니다. 확인 후 다시 시도해 주세요.");
        return;
      }
      
      // 카테고리 모달일 경우
    } else if (type === 'category') {
      if ($modalData.label.trim() === "" || $modalData.tag.trim() === "" ||
        $modalData.vendor.trim() === "" || $modalData.description.trim() === "") {
        alert("누락된 값이 존재합니다. 확인 후 다시 시도해 주세요.");
        return;
      }
    }
    
    // FormData 변환
    const formData = new FormData();
    Object.entries($modalData).forEach(([key, value]) => {
      formData.append(key, typeof value === 'boolean' ? String(value) : value);
    });
    
    try {
      if ($modalMode === 'add') { // 추가 모드
        if (type === 'table') { // 테이블 데이터 추가
          await tasks.postData(formData);
        } else if (type === 'category') { // 카테고리 데이터 추가
          await categories.postCategory(formData);
        }
      } else if ($modalMode === 'edit') { // 수정 모드
        if (type === 'table' && $selected.tableItem !== null) { // 테이블 데이터 수정
          await tasks.updateData($selected.tableItem, formData);
        } else if (type === 'category' && $selected.categoryItem !== null) { // 카테고리 데이터 수정
          await categories.updateCategory($selected.categoryItem, formData);
        };
      }
    } finally {
      // 데이터 업데이트 성공 시
      if ((type === 'category' && $categories.status === 200) || (type === 'table' && $tasks.status === 200)) {
        try {
          await tasks.getDatas(dataType); // 변경 데이터 호출
        } finally {
          if ($modalMode === 'add') {
            alert("데이터가 추가되었습니다.");
          } else if ($modalMode === 'edit') {
            alert("데이터가 수정되었습니다.");
          }
          $isModal = false; // 모달 닫기
          $isCategoryModal = false; // 카테고리 모달 닫기
        }
      }
    }
  }
</script>

<div class="flex justify-end space-x-4">
  <button
    class="border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg transition hover:bg-gray-200 hover:text-gray-500"
    on:click={toggleModal}>
    취소
  </button>
  <button
    class="bg-black text-white transition font-bold py-2 px-4 rounded-lg hover:bg-gray-200 hover:text-gray-500 mx-3"
    on:click={updateData}>
    {$modalMode === 'edit' ? '수정' : $modalMode === 'add' ? '추가' : ''}
  </button>
</div>
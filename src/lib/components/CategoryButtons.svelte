<script lang="ts">
  import {categories, isCategoryModal, isSelectOpen, modalData, modalMode, selected} from "$lib/stores/tableStore";
  import ButtonItem from '$lib/components/ButtonItem.svelte';
  
  const toggleModal = async (type?: string) => {
    if (type === 'edit') {
      $modalMode = 'edit'; // 모달 수정 모드 설정
      console.log('수정 모드', $selected)
      try {
        // 수정할 데이터 호출
        if ($selected.categoryItem !== null) {
          await categories.getCategory($selected.categoryItem);
        }
        const data = $categories.dataItem[0];
        // 수정 데이터 모달 데이터에 할당
        modalData.update(currentData => ({
          ...currentData,
          label: data.label,
          tag: data.tag,
          active: data.active,
          vendor: data.vendor,
          description: data.description,
        }));
      } finally {
        if ($categories.status === 200) {
          $isCategoryModal = !$isCategoryModal; // 카테고리 모달 토글
          $isSelectOpen = false; // 카테고리 셀렉트 닫기
        } else if ($categories.status === 404) {
          alert("선택된 데이터에 오류가 발생했습니다. 다시 시도해 주세요.");
        }
      }
    } else {
      $modalMode = 'add'; // 모달 추가 모드 설정
      $isCategoryModal = !$isCategoryModal; // 카테고리 모달 토글
      $isSelectOpen = false; // 카테고리 셀렉트 닫기
    }
  }
</script>

<div class="flex justify-between border-b pb-2">
  <ButtonItem button="edit" type="category" toggleModal={toggleModal} />
  <div>
    <ButtonItem button="＋" type="category" toggleModal={toggleModal} />
    <ButtonItem button="－" type="category" toggleModal={toggleModal} />
  </div>
</div>
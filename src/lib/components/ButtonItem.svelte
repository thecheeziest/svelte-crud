<script lang="ts">
  import {categories, isSelectOpen, selected, tasks} from "$lib/stores/tableStore";
  
  // 모달 창 열림/닫힘 상태 관리
  export let toggleModal: (type: string) => void;
  export let dataType = '';
  export let button = '';
  export let type = '';
  
  // 버튼별 이벤트 연동
  const onClick = () => {
    if (button === "추가" || button === "＋") {
      selected.resetChecked('all'); // 체크박스 초기화
      toggleModal('add');
      
    } else if (button === "수정" || button === "edit") {
      if ($selected.tableItems.length === 0 && $selected.categoryItems.length === 0) {
        alert("수정할 항목을 선택해 주세요.");
        return;
      } else if ($selected.tableItems.length > 1 || $selected.categoryItems.length > 1) {
        alert("수정할 항목을 1개만 선택해 주세요.");
        return;
      }
      toggleModal('edit');
      
    } else if (button === "삭제" || button === "－") {
      if ($selected.tableItems.length === 0 && $selected.categoryItems.length === 0) {
        alert("선택된 항목이 없습니다.");
        return;
      } else if ($selected.tableItems.length > 1 || $selected.categoryItems.length > 1) {
        alert("삭제할 항목을 1개만 선택해 주세요.");
        return;
      }
      onDelete();
    }
  }
  
  // 삭제 버튼 클릭 시
  const onDelete = async () => {
    // 테이블 데이터 삭제
    if (type === 'table') {
      try {
        if ($selected.tableItem !== null) {
          await tasks.deleteData($selected.tableItem); // 삭제 API 호출
        }
        await tasks.getDatas(dataType);  // 삭제 후 데이터 호출
      } finally {
        if ($tasks.status === 200) {
          alert("삭제되었습니다.");
          selected.resetChecked(type); // 체크박스 데이터 초기화
        } else if ($tasks.status === 404) {
          alert("선택된 데이터에 오류가 발생했습니다. 다시 시도해 주세요.");
        }
      }
      
      // 카테고리 데이터 삭제
    } else if (type === 'category') {
      try {
        if ($selected.categoryItem !== null) {
          await categories.deleteCategory($selected.categoryItem) // 삭제 API 호출
        }
      } finally {
        if ($categories.status === 200) {
          alert("삭제되었습니다.");
          selected.resetChecked(type); // 체크박스 데이터 초기화
          $isSelectOpen = false; // 카테고리 셀렉트 닫기
        } else if ($tasks.status === 404) {
          alert("선택된 데이터에 오류가 발생했습니다. 다시 시도해 주세요.");
        }
      }
    }
  }
  
  $: buttonStyle = button === "추가" ? "bg-black text-white" : button === "수정" ? "text-gray-400 ml-10" : button === "삭제" ? "text-gray-400" : "";
  $: typeStyle = type === "category" ? "px-1" : "w-20 min-w-14 border-gray-300 mx-2"
</script>

<button
  class={`rounded-lg border text-sm font-bold transition hover:bg-gray-200 hover:text-gray-500 ${buttonStyle} ${typeStyle}`}
  on:click={onClick}>
  {button}
</button>
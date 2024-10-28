<script lang="ts">
  import {selected, tasks} from '$lib/stores/tableStore';
  
  export let value = 0; // 현재 체크박스의 id
  let checked = false;
  
  const handleChange = () => {
    if (value === 0) {
      // 전체 선택일 경우
      if (checkValue) {
        // 선택 시
        selected.allChecked(paginatedIds);
      } else {
        // 해제 시
        selected.resetChecked();
      }
    } else {
      // 개별 선택일 경우
      selected.checked(value);
    }
  };
  
  // 전체 선택 체크박스 상태
  $: checked = paginatedIds.every((id) =>
    $selected.some(item => item.id === id)
  );
  
  // 개별 체크박스 상태
  $: checkValue = (value === 0 && paginatedIds.length !== 0) ? checked : $selected.some(item => item.id === value);
  
  // 현재 페이지 id 목록
  $: paginatedIds = ($tasks && $tasks.paginated) ? $tasks.paginated.map(item => item.id) : [];
</script>

<input
  type="checkbox"
  class="h-4 w-4 m-2 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
  bind:checked={checkValue}
  on:change={handleChange}
/>

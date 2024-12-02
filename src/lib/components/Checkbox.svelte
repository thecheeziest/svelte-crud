<script lang="ts">
  import {categories, selected, tasks} from '$lib/stores/tableStore';
  
  export let value: string | number; // 현재 체크박스의 id
  export let type: string; // 현재 체크박스의 id
  
  const handleChange = () => {
    // 전체 체크박스
    if (value === 'all') {
      if (checked) { // 선택 시
        const pageIds = type === 'table' ? $tasks.data.map(task => ({ id: task.id })) : $categories.data.map(category => ({ id: category.id }));
        selected.allChecked(pageIds, type);
      } else { // 해제 시
        selected.resetChecked(type); // 체크박스 데이터 초기화
      }
      // 개별 체크박스
    } else if (typeof value === 'number') {
      selected.checked(value, type);
    }
  };
  
  // 체크박스 상태 - 타입별 아이템에 현재 value 존재 여부
  $: checked = type === 'table' ? $selected.tableItems.some(item => item.id === value) : $selected.categoryItems.some(item => item.id === value)
</script>

<input
  type="checkbox"
  class="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
  bind:checked={checked}
  on:change={handleChange}
/>

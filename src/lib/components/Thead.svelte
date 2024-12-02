<script lang='ts'>
  import {orderIcon, tasks} from '$lib/stores/tableStore';
  
  export let type: 'Label' | 'Type' | 'Endpoint' | 'Description' | 'Tag' | 'Created_at' | 'Updated_at';
  export let dataType = '';
  export let sortBy = '';
  
  // 데이터 정렬
  const sortData = async () => {
    orderIcon.update((current) => {
      const newIconState = {
        Label: '↕',
        Tag: '↕',
        Created_at: '↕',
        Updated_at: '↕',
      };
      
      // type이 orderIcon의 키 중 하나인지 확인
      if (type === 'Label' || type === 'Tag' || type === 'Created_at' || type === 'Updated_at') {
        // 아이콘 상태 업데이트
        newIconState[type] = current[type] === '↕' ? '↑' : current[type] === '↑' ? '↓' : '↑';
      }
      
      return newIconState;
    });
    
    // 아이콘 방향 설정
    const orderBy = $orderIcon[type as 'Label' | 'Tag' | 'Created_at' | 'Updated_at'] === '↑' ? 'asc' :
      $orderIcon[type as 'Label' | 'Tag' | 'Created_at' | 'Updated_at'] === '↓' ? 'desc' : '';
    
    // 정렬된 데이터 호출
    await tasks.sorted(dataType, sortBy, orderBy);
  };
  
  $: columnStyle = type === 'Label' ? 'w-[20%]' : type === 'Type' ? 'w-[15%]' : type === 'Endpoint' ? 'w-[30%]' : type === 'Description' ? 'w-[65%]' : type === 'Tag' ? 'w-[20%]' : 'w-[20%]';
</script>

<th class={`text-[13px] text-center select-none ${columnStyle}`}>
  {type}
  {#if !(type === 'Description' || type === 'Type' || type === 'Endpoint')}
    <button class='w-7 text-gray-400 cursor-pointer rounded-md hover:bg-gray-100 hover:text-gray-500'
            on:click={sortData}>
      {$orderIcon[type]}
    </button>
  {/if}
</th>
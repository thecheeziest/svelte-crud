<script lang="ts">
  import {goto} from "$app/navigation";
  import {page} from "$app/stores";
  import {currentPage, selected} from "$lib/stores/tableStore";
  
  export let menu: string;
  
  const goMenu = () => {
    selected.resetChecked(); // 선택된 데이터 초기화
    $currentPage = 1; // 페이지 초기화
    goto(menu.toLowerCase());
  }
  
  $: clickedStyle = $page.url.pathname.slice(1) === menu.toLowerCase() ? "text-gray-500 bg-gray-100" : "text-gray-400";
</script>

<button class={`text-sm font-bold px-3 py-3 rounded hover:bg-gray-100 hover:text-gray-500 transition ${clickedStyle}`}
        on:click={goMenu}>
  {menu}
</button>
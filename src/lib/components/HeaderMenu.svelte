<script lang="ts">
  import {goto} from "$app/navigation";
  import {page} from "$app/stores";
  import {currentPage} from "$lib/stores/tableStore";
  
  export let menu: string;
  
  const goMenu = () => {
    $currentPage = 1; // 페이지 초기화
    goto(menu.toLowerCase());
  }
  
  $: clickedStyle = $page.url.pathname.slice(1) === menu.toLowerCase() ? "text-gray-500 bg-gray-100" : "text-gray-400";
</script>

<button class={`sm:text-sm sm:p-3 text-[12px] p-1 font-bold rounded hover:bg-gray-100 hover:text-gray-500 transition ${clickedStyle}`}
        on:click={goMenu}>
  {menu}
</button>
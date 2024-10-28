<script lang="ts">
  import { onMount } from "svelte";
  import Checkbox from './Checkbox.svelte';
  import Pagination from './Pagination.svelte';
  import ToggleColumns from './ToggleColumns.svelte';
  import Thead from "$lib/components/Thead.svelte";
  import SearchBar from "$lib/components/SearchBar.svelte";
  import {
    itemsPerPage,
    showCategory,
    showDescription,
    showHashtag,
    showLink,
    showName,
    isModal,
    tasks,
    totalPages, selected
  } from "$lib/stores/tableStore";
  import Modal from "$lib/components/Modal.svelte";
  
  export let dataType = '';
  
  const toggleModal = () => {
    $isModal = !$isModal;
  }
  
  const onDelete = async () => {
    const ids = $selected.map(item => item.id);
    await tasks.deleteData(ids); // 삭제 API 호출
    alert("삭제되었습니다.");
    await tasks.getData(dataType);  // 삭제 후 데이터 호출
    $totalPages = Math.ceil($tasks.task.length / itemsPerPage);  // 전체 페이지 수 계산
  }
  
  onMount(async () => {
    await tasks.getData(dataType);  // 현재 페이지에 맞는 데이터 호출
    $totalPages = Math.ceil($tasks.task.length / itemsPerPage);  // 전체 페이지 수 계산
  });
</script>

<div class="h-full flex flex-col max-w-fit">
  <Modal toggleModal={toggleModal} />
  <div class="flex justify-between items-center mb-4">
    <div class="w-1/2 flex">
      <SearchBar />
      {#if dataType === 'domain'}
        <button
          class="w-20 rounded-lg border border-gray-300 bg-black text-sm font-bold text-white transition
        hover:bg-gray-200 hover:text-gray-500 mx-3"
          on:click={toggleModal}
        >
          추가
        </button>
        <button
          class="w-20 rounded-lg border border-gray-300 text-sm font-bold text-gray-400 transition
        hover:bg-gray-200 hover:text-gray-500"
          on:click={onDelete}
        >
          삭제
        </button>
      {/if}
    </div>
    <ToggleColumns />
  </div>
  
  <div class="flex-1 flex flex-col rounded-xl border border-gray-300 shadow-md px-3 overflow-x-auto">
    <table class="min-w-full w-full h-full table-fixed">
      <thead class="bg-white border-b">
      <tr class="h-12">
        <th>
          <Checkbox />
        </th>
        {#if $showName}
          <Thead type="Name" />
        {/if}
        {#if $showCategory}
          <Thead type="Category" />
        {/if}
        {#if $showDescription}
          <Thead type="Description" />
        {/if}
        {#if $showLink}
          <Thead type="Link" />
        {/if}
        {#if $showHashtag}
          <Thead type="Hashtag" />
        {/if}
      </tr>
      </thead>
      
      <tbody class="bg-white divide-y divide-gray-200 text-center border-b">
      {#if $tasks && $tasks.paginated}
        {#each $tasks.paginated as row}
          <tr class="hover:bg-gray-50">  <!-- 행 호버 시 배경 색 변화 -->
            <td>
              <Checkbox value={row.id} />
            </td>
            {#if $showName}
              <td class="truncate">
                <span class="tooltip" title={row.name}>{row.name}</span>
              </td>
            {/if}
            {#if $showCategory}
              <td class="truncate">
                <span class="tooltip" title={row.category}>{row.category}</span>
              </td>
            {/if}
            {#if $showDescription}
              <td class="truncate">
                <span class="tooltip" title={row.description}>{row.description}</span>
              </td>
            {/if}
            {#if $showLink}
              <td class="text-center">
                <a href={row.link} class="text-blue-500 hover:underline">🔗</a>
              </td>
            {/if}
            {#if $showHashtag}
              <td class="truncate">
                {#each row.hashtags as hashtag, index (hashtag)}
                  <span class="tooltip" title={hashtag}>
                  {hashtag}{index < row.hashtags.length - 1 ? ', ' : ''}
                  </span>
                {/each}
              </td>
            {/if}
          </tr>
        {/each}
      {/if}
      </tbody>
    </table>
    
    <div class="m-3">
      <Pagination />
    </div>
  </div>
</div>

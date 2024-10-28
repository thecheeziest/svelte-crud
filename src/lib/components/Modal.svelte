<script lang="ts">
  import { writable } from "svelte/store";
  import {currentPage, isModal, tasks} from "$lib/stores/tableStore";
  
  export let toggleModal = false;
  
  let name = "";
  let category = "";
  let description = "";
  let link = "";
  let hashtag = "";
  const hashtags = writable<string[]>([]);  // 해시태그 저장
  
  const addHashtag = () => {
    if (hashtag.trim() !== "") {
      hashtags.update((tags) => [...tags, hashtag.trim()]);
      hashtag = "";
    }
  }
  
  const removeHashtag = (index: number) => {
    hashtags.update((tags) => tags.filter((_, i) => i !== index));
  }
  
  const editModal = async () => {
    if (name.trim() === "" || category.trim() === "" || description.trim() === "" || link.trim() === "") {
      alert("누락된 값이 존재합니다. 확인 후 다시 시도해 주세요.");
      return;
    }
    
    let data = {
      name,
      category,
      description,
      link,
      hashtags: $hashtags,
    };
    
    // POST API 호출
    await tasks.postData(data);
    alert("추가되었습니다.");
    // 모달 닫기
    $isModal = false;
    // 추가된 데이터 호출
    await tasks.getData('domain');
    // 입력 데이터 초기화
    name = ""; category = ""; description = ""; link = ""; hashtags.set([]);
    // 현재 페이지 지정
    $currentPage = 1;
  }
  
  $: if (!$isModal) {
    // 모달이 닫히면 초기화
    hashtags.set([]);
  }
</script>

{#if $isModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 z-10" on:click={toggleModal}></div>
  
  <div class="flex justify-center z-20">
    <div class="fixed bg-white rounded-lg shadow-lg p-6 max-w-lg w-full space-y-12 max-h-[80vh] overflow-y-auto">
      <div class="space-y-4">
        <div>
          <label class="text-sm font-medium">Name</label>
          <input
            type="text"
            bind:value={name}
            class="w-full border border-gray-300 rounded-lg p-2 my-2 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter name"
          />
        </div>
        
        <div>
          <label class="text-sm font-medium">Category</label>
          <select
            bind:value={category}
            class="w-full border border-gray-300 rounded-lg p-2 my-2 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="" disabled selected>Select category</option>
            <option value="Category 1">Category 1</option>
            <option value="Category 2">Category 2</option>
            <option value="Category 3">Category 3</option>
          </select>
        </div>
        
        <div>
          <label class="text-sm font-medium">Description</label>
          <textarea
            bind:value={description}
            class="w-full border border-gray-300 rounded-lg p-2 my-2 focus:outline-none focus:ring-2 focus:ring-black"
            rows="3"
            placeholder="Enter description"
          ></textarea>
        </div>
        
        <div>
          <label class="text-sm font-medium">Link</label>
          <input
            type="url"
            bind:value={link}
            class="w-full border border-gray-300 rounded-lg p-2 my-2 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter link"
          />
        </div>
        
        <div>
          <label class="text-sm font-medium">Hashtag</label>
          <div class="flex justify-between items-center">
            <input
              type="text"
              bind:value={hashtag}
              class="w-4/5 border border-gray-300 rounded-lg p-2 my-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter hashtag"
            />
            <button
              on:click={addHashtag}
              class="bg-black text-white px-4 h-12 rounded-lg transition hover:bg-gray-200 hover:text-gray-500"
            >
              추가
            </button>
          </div>
          <div class="flex flex-wrap mt-2 gap-2 break-words">
            {#each $hashtags as tag, index}
              <div
                class="bg-gray-200 px-3 py-1 rounded-lg flex items-center space-x-2 break-all overflow-hidden"
              >
                <span>{tag}</span>
                <button
                  on:click={() => removeHashtag(index)}
                  class="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            {/each}
          </div>
        </div>
      </div>
      
      <div class="flex justify-end space-x-4">
        <button
          on:click={toggleModal}
          class="border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg transition hover:bg-gray-200 hover:text-gray-500"
        >
          취소
        </button>
        <button
          class="bg-black text-white transition font-bold py-2 px-4 rounded-lg hover:bg-gray-200 hover:text-gray-500 mx-3"
          on:click={editModal}
        >
          저장
        </button>
      </div>
    </div>
  </div>
{/if}
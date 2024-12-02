<script lang="ts">
  import type {ModalDataType} from "$lib/data/tasks";
  import {modalData, selfLabel} from "$lib/stores/tableStore";
  import {selfTag} from "$lib/stores/tableStore";
  
  export let label: string = '';
  export let type: string = '';
  export let placeholder = '';
  
  const value = label.toLowerCase() as keyof ModalDataType;
  
  // Label, Tag 자동 입력 여부
  const selfFill = () => {
    if (label === "Label") {
      $selfLabel = true;
    } else if (label === "Tag") {
      $selfTag = true;
    }
  }
  
  // Endpoint 입력 시 Label, Tag 자동 입력
  const autoFill = () => {
    if ($modalData.endpoint != null) {
      if (!$selfLabel && $modalData.endpoint !== $modalData.label) {
        $modalData.label = $modalData.endpoint;
      }
      if (!$selfTag && $modalData.endpoint !== $modalData.tag) {
        $modalData.tag = $modalData.endpoint;
      }
    }
  }
  
  // input 이벤트 발생 시
  const onInput = () => {
    if (type === 'category') return;
    
    if (label === "Endpoint") {
      autoFill();
    } else if (label === "Label" || label === "Tag") {
      selfFill();
    }
  }
</script>

<label class="block">
  {label}
  <input
    type="text"
    bind:value={$modalData[value]}
    on:input={onInput}
    class="w-full p-2 my-2 border border-gray-300 rounded-lg focus:outline-none"
    placeholder={placeholder}
  />
</label>
<script lang="ts">
  import {modalData} from "$lib/stores/tableStore";
  
  export let value: string | boolean = '';
  
  const label = value === "dom" ? "도메인" : value === "net" ? "네트워크 주소" : value === "rxp" ? "정규식" : value === true ? "On" : value === false ? "Off" : "Unknown";
</script>

{#if value === 'dom' || value === 'net' || value === 'rxp'}
  <label>
    <input
      class="w-4 h-4 align-middle mr-2"
      type="radio"
      name="type"
      value={value}
      bind:group={$modalData.type}
    />
    {label}
  </label>
  {:else}
<label>
  <input
    class="w-4 h-4 align-middle mr-2"
    type="radio"
    name="type"
    value={value}
    bind:group={$modalData.active}
  />
  {label}
</label>
{/if}

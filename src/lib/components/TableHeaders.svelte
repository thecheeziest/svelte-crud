<script lang="ts">
  import {showCategory, showCreatedAt, showDescription, showEndpoint, showLabel, showTag, showType, showUpdatedAt,} from '$lib/stores/tableStore.js';
  import Checkbox from '$lib/components/Checkbox.svelte';
  import Thead from '$lib/components/Thead.svelte';
  import Category from "$lib/components/Category.svelte";
  
  export let dataType = '';
</script>

<thead class="bg-white border-b">
<tr class="h-12">
  <th class="w-[5%]">
    <Checkbox value="all" type="table" />
  </th>
  {#if $showLabel}
    <Thead dataType={dataType} sortBy="label" type="Label" />
  {/if}
  {#if $showCategory}
    <th class="w-[20%]">
      <Category dataType={dataType} type="thead" />
    </th>
  {/if}
  {#if dataType === 'domains'}
    {#if $showType}
      <Thead dataType={dataType} sortBy="type" type="Type" />
    {/if}
    {#if $showEndpoint}
      <Thead dataType={dataType} sortBy="endpoint" type="Endpoint" />
    {/if}
  {/if}
  {#if $showDescription}
    <Thead dataType={dataType} type="Description" />
  {/if}
  {#if $showTag}
    <Thead dataType={dataType} sortBy="tag" type="Tag" />
  {/if}
  {#if $showCreatedAt}
    <Thead dataType={dataType} sortBy="created_at" type="Created_at" />
  {/if}
  {#if $showUpdatedAt}
    <Thead dataType={dataType} sortBy="updated_at" type="Updated_at" />
  {/if}
</tr>
</thead>
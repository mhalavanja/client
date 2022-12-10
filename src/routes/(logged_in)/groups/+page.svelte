<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

{#if data.success}
  <h1>Groups</h1>
  <h3>{data.groups}</h3>
  <a href="/groups/new">Add new group</a>
{:else}
  <h1>Ne radi</h1>
{/if}

<style>
</style>

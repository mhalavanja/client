<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

{#if data.group}
  <h1>{data.group.id}</h1>
  <h1>{data.group.groupName}</h1>
  <h1>{data.group.owner}</h1>
{/if}

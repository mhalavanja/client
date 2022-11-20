<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

{#if data.success}
  <h1>{data.groups}</h1>
{:else}
  <h1>Ne radi</h1>
{/if}

<style>
</style>

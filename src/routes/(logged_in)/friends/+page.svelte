<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

{#if data.success}
  <h1>{data.friends}</h1>
{:else}
  <h1>Ne radi</h1>
{/if}

<style>
</style>

<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

{#if data.success}
  <h1>Friends</h1>
  <h3>{data.friends}</h3>
  <a href="/friends/new">Add a new friend</a>
{:else}
  <h1>Ne radi</h1>
{/if}

<style>
</style>

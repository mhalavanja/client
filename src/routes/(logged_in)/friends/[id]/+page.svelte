<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

{#if data.friend}
  <h1>{data.friend.id}</h1>
  <h1>{data.friend.username}</h1>
  <h1>{data.friend.email}</h1>
{/if}

<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

{#if data.friend}
  <h1>Username: {data.friend.username}</h1>
  <h1>Email: {data.friend.email}</h1>

  <form method="post" action="?/delete">
    <input name="friendId" type="hidden" value={data.friend.id} />
    <button>Delete</button>
  </form>
{/if}

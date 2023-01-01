<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

{#if data.group}
  <h1>{data.group.name}</h1>
  <h1>{data.group.owner}</h1>

  <form action="?/getMembers">
    <input name="groupId" type="hidden" value={data.group.id} />
    <button>Members</button>
  </form>

  <form action="?/leaveGroup">
    <input name="groupId" type="hidden" value={data.group.id} />
    <button>Leave</button>
  </form>

  {#if data.isOwner}
    <form method="post" action="?/deleteGroup">
      <input name="groupId" type="hidden" value={data.group.id} />
      <button>Delete group</button>
    </form>

    <form method="post" action="?/addMember">
      <label for="username">Username: </label>
      <input id="username" name="username" type="text" required placeholder="Username" />
      <input name="groupId" type="hidden" value={data.group.id} />
      <button>Add</button>
    </form>

    <form method="post" action="?/deleteMember">
      <label for="username">Username: </label>
      <input id="username" name="username" type="text" required placeholder="Username" />
      <input name="groupId" type="hidden" value={data.group.id} />
      <button>Remove member</button>
    </form>
  {/if}
{/if}

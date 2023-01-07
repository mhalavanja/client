<script lang="ts">
  import { Button, Modal } from "flowbite-svelte";
  import type { User } from "src/types";
  import type { PageData } from "./$types";

  export let data: PageData;
  let showModal = false;
  let title = data.isOwner ? "Manage group" : "Show members";
  let members: User[] = [];
  const groupId = data.group?.id;
  async function showMembers() {
    const response = await fetch(groupId + "/members", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await response.json();
    members = data.members;
    showModal = true;
  }
</script>

{#if data.group}
  <Button type="submit" on:click={showMembers}>{title}</Button>

  <Modal {title} bind:open={showModal}>
    {#each members as member}
      <div>{member.username}</div>
    {/each}
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
    <svelte:fragment slot="footer">
      <Button color="red">Close</Button>
    </svelte:fragment>
  </Modal>

  <h1>{data.group.name}</h1>
  <h1>{data.group.owner}</h1>
{/if}

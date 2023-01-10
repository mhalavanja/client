<script lang="ts">
  export const ssr = false;
  import { Button, Modal } from "flowbite-svelte";
  import type { User } from "src/types";
  import type { PageData } from "./$types";

  export let data: PageData;

  let showModal = false;
  const isOwner = data.username == data.group?.owner;
  let title = isOwner ? "Manage" : "Members";
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

  async function removeUser(userId: number) {
    fetch(groupId + "/members", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userId),
    });
  }
</script>

{#if data.group}
  <Button type="submit" on:click={showMembers}>{title}</Button>

  <Modal {title} bind:open={showModal}>
    {#if isOwner}
      <form method="post" action="?/addMember">
        <label for="username">Username: </label>
        <input id="username" name="username" type="text" required placeholder="Username" />
        <input name="groupId" type="hidden" value={data.group.id} />
        <Button>Add</Button>
      </form>
    {/if}

    {#each members as member}
      <div>
        {member.username},
        {member.email}
        {#if data.username !== member.username && isOwner}
          <Button on:click={() => removeUser(member.id)} color="red">Remove</Button>
        {/if}
      </div>
    {/each}
    <svelte:fragment slot="footer">
      {#if isOwner}
        <Button color="red">Delete</Button>
      {/if}
      <Button color="red">Leave</Button>
      <Button on:click={() => (showModal = false)} color="alternative">Close</Button>
    </svelte:fragment>
  </Modal>

  <h1>Group: {data.group.name}</h1>
  <h1>Owner: {data.group.owner}</h1>
{/if}

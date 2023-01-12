<script lang="ts">
  import { enhance } from "$app/forms";
  import { Alert, Button, Modal } from "flowbite-svelte";
  import type { User } from "src/types";
  import type { PageData } from "./$types";

  export let data: PageData;

  let showModal = false;
  let addUsername = "";
  const isOwner = data.username == data.group?.owner;
  let title = isOwner ? "Manage" : "Members";
  let members: User[] = [];
  const groupId = data.group?.id;
  let error = "";

  async function getMembers() {
    const response = await fetch(groupId + "/members", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await response.json();
    return data.members;
  }

  async function showMembers() {
    members = await getMembers();
    showModal = true;
  }

  async function addUser(username: string) {
    if (username.trim() === "") return;
    const response: Response = await fetch(groupId + "/members", {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify(username),
    });

    const data = await response.json();

    if (data.success) {
      addUsername = "";
      error = "";
      members = await getMembers();
    } else {
      error = data.error;
    }
  }

  async function removeUser(userId: number) {
    const response: Response = await fetch(groupId + "/members", {
      method: "DELETE",
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify(userId),
    });

    const data = await response.json();

    if (data.success) {
      error = "";
      members = await getMembers();
    } else {
      error = data.error;
    }
  }
</script>

{#if data.group}
  <Button type="submit" on:click={showMembers}>{title}</Button>

  <Modal {title} bind:open={showModal}>
    {#if error}
      <Alert dismissable={true}>{error}</Alert>
    {/if}
    {#if isOwner}
      <input
        bind:value={addUsername}
        id="username"
        name="username"
        type="text"
        required
        placeholder="Username"
      />
      <Button on:click={async () => addUser(addUsername)}>Add</Button>
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
        <form use:enhance method="post" action="?/deleteGroup">
          <Button type="submit" color="red">Delete</Button>
        </form>
      {:else}
        <form use:enhance method="post" action="?/leaveGroup">
          <Button type="submit" color="red">Leave</Button>
        </form>
      {/if}
      <Button on:click={() => (showModal = false)} color="alternative">Close</Button>
    </svelte:fragment>
  </Modal>

  <h1>Group: {data.group.name}</h1>
  <h1>Owner: {data.group.owner}</h1>
{/if}

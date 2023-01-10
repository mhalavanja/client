<script lang="ts">
  import { enhance } from "$app/forms";
  import { Alert, Button, Modal } from "flowbite-svelte";
  import type { User } from "src/types";
  import type { ActionData, PageData } from "./$types";

  export let data: PageData;
  export let form: ActionData;

  let showModal = false;
  let addUsername = "";
  const isOwner = data.username == data.group?.owner;
  let title = isOwner ? "Manage" : "Members";
  let members: User[] = [];
  const groupId = data.group?.id;

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
    fetch(groupId + "/members", {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify(username),
    });

    addUsername = "";
    members = await getMembers();
  }

  async function removeUser(userId: number) {
    fetch(groupId + "/members", {
      method: "DELETE",
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify(userId),
    });

    members = await getMembers();
  }
</script>

{#if data.group}
  <Button type="submit" on:click={showMembers}>{title}</Button>

  <Modal {title} bind:open={showModal}>
    {#if form && !form.success && form.error}
      <Alert dismissable={true}>{form.error}</Alert>
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
        <Button color="red">Delete</Button>
      {:else}
        <Button color="red">Leave</Button>
      {/if}
      <Button on:click={() => (showModal = false)} color="alternative">Close</Button>
    </svelte:fragment>
  </Modal>

  <h1>Group: {data.group.name}</h1>
  <h1>Owner: {data.group.owner}</h1>
{/if}

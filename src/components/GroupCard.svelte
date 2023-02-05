<script lang="ts">
  import { goto } from "$app/navigation";
  import {
    Alert,
    Button,
    ButtonGroup,
    Card,
    Dropdown,
    DropdownItem,
    Input,
    Li,
    List,
    Modal,
    ToolbarButton,
  } from "flowbite-svelte";
  import type { Group, User } from "@types";

  export let group: Group;
  export let username: string;

  let showModal = false;
  const isOwner = username === group.owner;
  let title = isOwner ? "Manage" : "Members";
  let members: User[] = [];
  let addUsername = "";
  let error = "";

  async function showMembers() {
    const response = await fetch("/groups/" + group.id + "/members", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await response.json();

    members = data.members;
    showModal = true;
  }

  async function addUser(username: string) {
    if (username.trim() === "") return;
    const response: Response = await fetch("/groups/" + group.id + "/members", {
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
      showMembers();
    } else {
      error = data.error;
    }
  }

  async function removeUser(userId: number) {
    const response: Response = await fetch("/groups/" + group.id + "/members", {
      method: "DELETE",
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify(userId),
    });

    const data = await response.json();

    if (data.success) {
      error = "";
      showMembers();
    } else {
      error = data.error;
    }
  }

  async function deleteGroup() {
    const res: Response = await fetch("/groups/" + group.id + "/delete", {
      method: "DELETE",
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify(group.id),
    });

    console.log(res);
  }

  async function leaveGroup() {
    const res: Response = await fetch("/groups/" + group.id + "/leave", {
      method: "DELETE",
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify(group.id),
    });

    console.log(res);
  }
</script>

<Card size="sm" class="relative basis-1/6">
  <ToolbarButton
    class="z-10 absolute right-2 top-2 dots-menu text-gray-900 bg-white dark:text-white dark:bg-gray-800"
  >
    <svg fill="none" viewBox="0 0 22 22" stroke-width="2" stroke="currentColor" class="w-5 h-5"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
      /></svg
    >
  </ToolbarButton>

  <Dropdown triggeredBy=".dots-menu">
    <DropdownItem on:click={showMembers}>
      <p class="text-lg">{title}</p>
    </DropdownItem>
    {#if isOwner}
      <DropdownItem on:click={deleteGroup}>
        <p class="text-lg text-red-600">Delete</p>
      </DropdownItem>
    {:else}
      <DropdownItem on:click={leaveGroup}>
        <p class="text-lg text-red-600">Leave</p>
      </DropdownItem>
    {/if}
  </Dropdown>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="absolute inset-0"
    on:click={() => {
      goto("/groups/" + group.id);
    }}
  />
  <p class="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
    {group.name}
  </p>
  <p class="font-normal text-xl text-gray-700 dark:text-gray-400 leading-tight">
    {group.owner}
  </p>
</Card>

<Modal {title} bind:open={showModal}>
  {#if error}
    <Alert dismissable={true}>{error}</Alert>
  {/if}
  {#if isOwner}
    <ButtonGroup class="w-full">
      <Input type="text" bind:value={addUsername} placeholder="Username" />
      <Button on:click={async () => addUser(addUsername)} color="blue">Add</Button>
    </ButtonGroup>
  {/if}

  <List tag="ul" class="divide-y divide-gray-200 dark:divide-gray-700">
    {#each members as member}
      <Li class="pb-3 sm:pb-4" icon>
        <div class="flex items-center space-x-4">
          <div class="flex-shrink-0" />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
              {member.username}
            </p>
            <p class="text-sm text-gray-500 truncate dark:text-gray-400">{member.email}</p>
          </div>
          {#if username !== member.username && isOwner}
            <Button
              on:click={() => removeUser(member.id)}
              class="relative bottom-0 left-96"
              color="red">Remove</Button
            >
          {/if}
        </div>
      </Li>
    {/each}
  </List>
</Modal>

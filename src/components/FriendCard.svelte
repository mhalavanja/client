<script lang="ts">
  import { goto } from "$app/navigation";
  import { Button, Card, Dropdown, DropdownItem, Modal, ToolbarButton } from "flowbite-svelte";
  import type { User } from "../types";
  export let friend: User;
  let showModal = false;

  async function removeFriend() {
    await fetch("/friends/" + friend.id, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    goto("/friends", { invalidateAll: true });
  }
</script>

<Card size="sm" class="relative basis-1/6">
  <ToolbarButton
    class="absolute right-2 top-2 dots-menu text-gray-900 bg-white dark:text-white dark:bg-gray-800"
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
    <DropdownItem>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <p on:click={removeFriend} class="text-lg text-red-600">Remove</p>
    </DropdownItem>
  </Dropdown>

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class=""
    on:click={() => {
      showModal = true;
    }}
  />

  <p class="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
    {friend.username}
  </p>
  <p class="font-normal text-xl text-gray-700 dark:text-gray-400 leading-tight">
    {friend.email}
  </p>
</Card>

<Modal title={"Details"} bind:open={showModal}>
  <div>
    <p class="text-xl dark:text-white">Username: {friend.username}</p>
    <p class="text-xl dark:text-white">Email: {friend.email}</p>
  </div>
  <Button on:click={removeFriend} class="absolute bottom-8 right-6" color="red">
    <p class="text-lg dark:text-white">Remove</p>
  </Button>
</Modal>

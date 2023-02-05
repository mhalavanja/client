<script lang="ts">
  import Alert from "@components/Alert.svelte";
  import AddForm, { AddFormType } from "@components/AddForm.svelte";
  import FriendCard from "@components/FriendCard.svelte";
  import type { ActionData, PageData } from "./$types";
  import PlusCard from "@components/PlusCard.svelte";
  import { Modal } from "flowbite-svelte";

  export let data: PageData;
  export let form: ActionData;
  let showModal = false;
</script>

{#if form && !form.success}
  <Alert message={form.error} />
{/if}
<div class="flex min-h-full gap-x-2 gap-y-2 relative top-2">
  {#if data.friends !== undefined}
    {#each data.friends as friend}
      <FriendCard {friend} />
    {/each}
  {/if}
  <PlusCard onClick={() => (showModal = true)} />
</div>

<Modal title="Add friend" bind:open={showModal}>
  <AddForm buttonText="Add" formType={AddFormType.NewFriend} action="/friends" />
</Modal>

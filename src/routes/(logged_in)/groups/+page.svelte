<script lang="ts">
  import { Modal, Input } from "flowbite-svelte";
  import Alert from "@components/Alert.svelte";
  import AddForm, { AddFormType } from "@components/AddForm.svelte";
  import GroupCard from "@components/GroupCard.svelte";
  import type { ActionData, PageData } from "./$types";
  import PlusCard from "@components/PlusCard.svelte";

  export let data: PageData;
  export let form: ActionData;
  let showModal = false;
</script>

{#if form && !form.success}
  <Alert message={form.error} />
{/if}

<div class="flex min-h-full gap-x-2 gap-y-2 relative top-2">
  {#each data.groups as group}
    <GroupCard {group} username={data.username ?? ""} />
  {/each}
  <PlusCard
    onClick={() => {
      showModal = true;
    }}
  />
</div>

<Modal title="Create new group" bind:open={showModal}>
  <AddForm buttonText="Create" formType={AddFormType.NewGroup} action="/groups" />
</Modal>

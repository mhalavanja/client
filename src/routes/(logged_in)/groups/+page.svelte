<script lang="ts">
  import { Modal } from "flowbite-svelte";
  import AddForm, { AddFormType } from "@components/AddForm.svelte";
  import GroupCard from "@components/GroupCard.svelte";
  import type { PageData } from "./$types";
  import PlusCard from "@components/PlusCard.svelte";

  export let data: PageData;
  let showModal = false;
  let groups = data.groups;

  async function deleteGroup(groupId: number) {
    console.log(groupId);
    const res: Response = await fetch("/groups/" + groupId + "/delete", {
      method: "DELETE",
      headers: new Headers({
        "content-type": "application/json",
      }),
      // body: JSON.stringify(group.id),
    });
    if (res.ok) {
      groups = groups.filter((g, _) => g.id != groupId);
    }
  }
</script>

<div class="flex min-h-full gap-x-2 gap-y-2 relative top-2">
  {#each groups as group (group.id)}
    <GroupCard
      {group}
      username={data.username}
      on:click={({ detail }) => {
        deleteGroup(detail.groupId);
      }}
    />
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

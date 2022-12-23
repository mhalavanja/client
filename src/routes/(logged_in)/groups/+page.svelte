<script lang="ts">
  import GenericForm, { GenericFormType } from "../../../components/GenericForm.svelte";
  import GroupCard from "../../../components/GroupCard.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="grid grid-cols-3 grid-flow-row gap-x-0">
  {#each data.groups as group}
    <GroupCard {group} />
  {/each}
</div>

<GenericForm
  buttonText="Create"
  formType={GenericFormType.NewGroup}
  title="Create new group"
  action="/groups/new"
/>

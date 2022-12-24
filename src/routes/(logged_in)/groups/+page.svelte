<script lang="ts">
  import Alert from "../../../components/Alert.svelte";
  import GenericForm, { GenericFormType } from "../../../components/GenericForm.svelte";
  import GroupCard from "../../../components/GroupCard.svelte";
  import type { ActionData, PageData } from "./$types";

  export let data: PageData;
  export let form: ActionData;
</script>

{#if form && !form.success}
  <Alert message={form.error} />
{/if}

<div class="grid grid-cols-3 grid-flow-row gap-x-0">
  {#each data.groups as group}
    <GroupCard {group} />
  {/each}
</div>

<GenericForm
  buttonText="Create"
  formType={GenericFormType.NewGroup}
  title="Create new group"
  action="/groups"
/>

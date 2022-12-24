<script lang="ts">
  import Alert from "../../../components/Alert.svelte";
  import GenericForm, { GenericFormType } from "../../../components/GenericForm.svelte";
  import FriendCard from "../../../components/FriendCard.svelte";
  import type { ActionData, PageData } from "./$types";

  export let data: PageData;
  export let form: ActionData;
</script>

{#if form && !form.success}
  <Alert message={form.error} />
{/if}

<div class="grid grid-cols-3 grid-flow-row gap-x-0">
  {#each data.friends as friend}
    <FriendCard {friend} />
  {/each}
</div>

<GenericForm
  buttonText="Add"
  formType={GenericFormType.NewFriend}
  title="Add new friend"
  action="/friends"
/>

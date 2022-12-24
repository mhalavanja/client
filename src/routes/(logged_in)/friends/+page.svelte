<script lang="ts">
  import GenericForm, { GenericFormType } from "../../../components/GenericForm.svelte";
  import FriendCard from "../../../components/FriendCard.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

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

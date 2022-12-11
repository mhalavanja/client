<script lang="ts">
  import FriendCard from "../../../components/FriendCard.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<h1>Friends</h1>
{#each data.friends as friend}
  <FriendCard {friend} />
{/each}
<a href="/friends/new">Add a new friend</a>

<style>
</style>

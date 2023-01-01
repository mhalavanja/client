<script lang="ts">
  import { goto } from "$app/navigation";
  import type { User } from "../types";
  export let friend: User;

  function onClick() {
    goto("/friends/" + friend.id);
  }
</script>

<div class="bg-gray-200 font-sans h-auto">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="card w-auto mx-auto bg-white shadow-xl hover:shadow" on:click={onClick}>
    <div class="text-center mt-2 text-3xl font-medium">{friend.username}</div>
    <div class="text-center mt-2 font-light text-sm">{friend.email}</div>
  </div>
</div>

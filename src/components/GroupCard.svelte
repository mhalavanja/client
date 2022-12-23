<script lang="ts">
  import { goto } from "$app/navigation";
  import type { Group } from "../types";

  export let group: Group;

  function onClick() {
    goto("/groups/" + group.id);
  }
</script>

<div class="bg-gray-200 font-sans h-auto">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="card w-auto mx-auto bg-white shadow-xl hover:shadow" on:click={onClick}>
    <div class="mt-2 p-4 text-center text-3xl font-medium">{group.name}</div>
  </div>
</div>

<script lang="ts">
  import { Card } from "flowbite-svelte";

  export let onClick: () => void;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<Card size="sm" class="relative basis-1/6">
  <div class="absolute inset-0" on:click={onClick} />

  <svg width="128" height="128" viewBox="2 2 12 12" fill="currentColor" class="block m-auto">
    <path
      d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
    />
  </svg>
</Card>

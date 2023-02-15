<script lang="ts">
  import type { Message } from "@types"
  export let msg: Message
  export let username: string
</script>
{#if username === msg.username}
<div class="mr-2 py-3 px-4 bg-blue-600 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white my-3 text-right w-fit ml-auto">
  {msg.text}
</div>
{:else}
<div class="ml-2 py-3 px-4 bg-gray-600 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white my-3 w-fit mr-auto" >
  <p class="text-xl">{msg.username}</p>{msg.text}
</div>
{/if}

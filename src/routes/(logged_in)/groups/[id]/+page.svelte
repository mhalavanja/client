<script lang="ts">
  import { Button, Input, Span } from "flowbite-svelte";
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import { REST_API_WS } from "@consts";
  import { Message } from "@types"
  import MessageComponent from "@components/Message.svelte"
  
  export let data: PageData;

  const groupId = data.group?.id;
  // let log: HTMLDivElement;
  let conn: WebSocket;
  let input: HTMLInputElement;
  let sendMsgBtn: HTMLButtonElement;
  let messages: Message[] = []
  
  onMount(async () => {
    // function appendLog(item: HTMLDivElement) {
    //   let doScroll = log.scrollTop > log.scrollHeight - log.clientHeight - 1;
    //   log.appendChild(item);
    //   if (doScroll) {
    //     log.scrollTop = log.scrollHeight - log.clientHeight;
    //   }
    // }

    conn = new WebSocket(REST_API_WS + "/ws/groups/" + groupId);
    conn.onclose = function (_) {
      input.value = "Connection closed";
      input.disabled = true;
      sendMsgBtn.disabled = true;
    };
    conn.onmessage = function (evt) {
      const data = evt.data;
      const username = data.substring(0, data.indexOf(" "));
      const text = data.substring(data.indexOf(" ") + 1);
      const msg = new Message({username, text})
      messages.push(msg)
      messages = messages
      // let item = document.createElement("div");
      // item.innerText = usr + ": " + msg;
      // appendLog(item);
    };
  });

  async function sendMessage(message: string) {
    conn.send(data.username + " " + message);
    input.value = "";
  }
</script>

{#if data.group && data.username}
  <div class="flex-1 min-w-0">
    <div>
      <Span class="text-sm font-medium text-gray-900 truncate dark:text-white">Group:</Span>
      <Span class="text-sm text-gray-500 truncate dark:text-gray-400">{data.group.name}</Span>
    </div>
    <div>
      <Span class="text-sm font-medium text-gray-900 truncate dark:text-white">Owner:</Span>
      <Span class="text-sm text-gray-500 truncate dark:text-gray-400">{data.group.owner}</Span>
    </div>
    <!-- <Button type="submit" on:click={showMembers} color="alternative">{title}</Button> -->
  </div>

  <!-- <div bind:this={log} id="log" class="relative top-5"/> -->
  <div class="relative top-5">
    {#each messages as msg (msg) }
      <MessageComponent username={data.username} {msg} />
    {/each}
  </div>
  <Input let:props class="absolute bottom-4">
    <input bind:this={input} type="text" {...props} placeholder="Type a message" />
  </Input>
  <Button on:click={() => sendMessage(input.value)} color="blue" class="absolute bottom-4 right-0">
    Send
    <button bind:this={sendMsgBtn} />
  </Button>
{/if}

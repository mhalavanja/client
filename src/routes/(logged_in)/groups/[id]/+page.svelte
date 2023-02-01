<script lang="ts">
  import { enhance } from "$app/forms";
  import { Alert, Button, Input, Modal } from "flowbite-svelte";
  import type { User } from "src/types";
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import { REST_API_WS } from "../../../../consts";

  export let data: PageData;

  let showModal = false;
  let addUsername = "";
  const isOwner = data.username == data.group?.owner;
  let title = isOwner ? "Manage" : "Members";
  let members: User[] = [];
  const groupId = data.group?.id;
  let error = "";
  let log: HTMLDivElement;
  let conn: WebSocket;
  let input: HTMLInputElement;
  let sendMsgBtn: HTMLButtonElement;

  onMount(async () => {
    function appendLog(item: HTMLDivElement) {
      let doScroll = log.scrollTop > log.scrollHeight - log.clientHeight - 1;
      log.appendChild(item);
      if (doScroll) {
        log.scrollTop = log.scrollHeight - log.clientHeight;
      }
    }

    conn = new WebSocket(REST_API_WS + "/ws/groups/" + groupId);
    conn.onclose = function (_) {
      input.value = "Connection closed";
      input.disabled = true;
      sendMsgBtn.disabled = true;
    };
    conn.onmessage = function (evt) {
      const data = evt.data;
      console.log(data);
      const usr = data.substring(0, data.indexOf(" "));
      const msg = data.substring(data.indexOf(" ") + 1);
      let item = document.createElement("div");
      item.innerText = usr + ": " + msg;
      appendLog(item);
    };
  });

  async function getMembers() {
    const response = await fetch(groupId + "/members", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await response.json();
    return data.members;
  }

  async function showMembers() {
    members = await getMembers();
    showModal = true;
  }

  async function addUser(username: string) {
    if (username.trim() === "") return;
    const response: Response = await fetch(groupId + "/members", {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify(username),
    });

    const data = await response.json();

    if (data.success) {
      addUsername = "";
      error = "";
      members = await getMembers();
    } else {
      error = data.error;
    }
  }

  async function removeUser(userId: number) {
    const response: Response = await fetch(groupId + "/members", {
      method: "DELETE",
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify(userId),
    });

    const data = await response.json();

    if (data.success) {
      error = "";
      members = await getMembers();
    } else {
      error = data.error;
    }
  }

  async function sendMessage(message: string) {
    conn.send(data.username + " " + message);
    input.value = "";
  }
</script>

{#if data.group}
  <Button type="submit" on:click={showMembers}>{title}</Button>

  <Modal {title} bind:open={showModal}>
    {#if error}
      <Alert dismissable={true}>{error}</Alert>
    {/if}
    {#if isOwner}
      <input
        bind:value={addUsername}
        id="username"
        name="username"
        type="text"
        required
        placeholder="Username"
      />
      <Button on:click={async () => addUser(addUsername)}>Add</Button>
    {/if}

    {#each members as member}
      <div>
        {member.username},
        {member.email}
        {#if data.username !== member.username && isOwner}
          <Button on:click={() => removeUser(member.id)} color="red">Remove</Button>
        {/if}
      </div>
    {/each}
    {#if isOwner}
      <form use:enhance method="post" action="?/deleteGroup">
        <Button type="submit" color="red">Delete</Button>
      </form>
    {:else}
      <form use:enhance method="post" action="?/leaveGroup">
        <Button type="submit" color="red">Leave</Button>
      </form>
    {/if}
    <Button on:click={() => (showModal = false)} color="alternative">Close</Button>
  </Modal>

  <h1>Group: {data.group.name}</h1>
  <h1>Owner: {data.group.owner}</h1>

  <div bind:this={log} id="log" />
  <Input let:props class="absolute bottom-4 ">
    <input bind:this={input} type="text" {...props} placeholder="Type a message" />
  </Input>
  <Button
    on:click={() => sendMessage(input.value)}
    color="alternative"
    class="absolute bottom-4 right-0"
  >
    Send
    <button bind:this={sendMsgBtn} />
  </Button>
{/if}

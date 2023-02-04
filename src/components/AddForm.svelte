<script context="module" lang="ts">
  enum AddFormType {
    NewFriend = "NEW_FRIEND",
    NewGroup = "NEW_GROUP",
  }

  export { AddFormType };
</script>

<script lang="ts">
  import { Button, ButtonGroup, Input, Label } from "flowbite-svelte";

  export let buttonText: string;
  export let formType: string;
  export let action: string = "";
  export let userInputRef: Input | undefined = undefined;
  export let groupInputRef: Input | undefined = undefined;
</script>

<div class="flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8">
  <div class="w-full max-w-md space-y-8">
    <form class="space-y-2" {action} method="POST">
      {#if formType === AddFormType.NewFriend}
        <Label class="block" for="username">Username</Label>

        <ButtonGroup class="w-full">
          <Input
            size="sm"
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            required
            bind:this={userInputRef}
          />
          <Button type="submit" color="blue">
            {buttonText}
          </Button>
        </ButtonGroup>
      {/if}
      {#if formType === AddFormType.NewGroup}
        <Label class="block" for="groupName">Group name</Label>

        <ButtonGroup class="w-full">
          <Input
            size="sm"
            id="groupName"
            name="groupName"
            type="text"
            placeholder="Group name"
            required
            bind:this={groupInputRef}
          />
          <Button type="submit" color="blue">
            {buttonText}
          </Button>
        </ButtonGroup>
      {/if}
    </form>
  </div>
</div>

<script lang="ts">
  import { Button, Input, Label } from "flowbite-svelte";

  import type { User } from "@types";

  export let user: User | undefined = undefined;
  export let title: string | undefined = undefined;
  export let buttonText: string;
  export let action: string = "";
</script>

<div class="flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8">
  <div class="w-full max-w-md space-y-8">
    {#if title}
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        {title}
      </h2>
    {/if}
    <form class="space-y-2" {action} method="POST">
      <div>
        <Label class="block" for="email">Email address</Label>
        <Input
          size="sm"
          id="email"
          name="email"
          type="email"
          required
          placeholder="Email address"
          value={user !== undefined ? user.email : ""}
        />
      </div>
      <div>
        <Label class="block" for="username">Username</Label>
        <Input
          size="sm"
          id="username"
          name="username"
          required
          placeholder="Username"
          value={user !== undefined ? user.username : ""}
        />
      </div>
      <div>
        <Label class="block" for="password">Old password</Label>
        <Input size="sm" id="password" name="password" type="password" placeholder="Old password" />
      </div>
      <div>
        <Label class="block" for="password">New password</Label>
        <Input size="sm" id="password" name="password" type="password" placeholder="New password" />
      </div>

      <Button type="submit" color="blue">
        {buttonText}
      </Button>
    </form>
  </div>
</div>

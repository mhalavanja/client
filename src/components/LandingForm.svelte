<script lang="ts">
  import { enhance } from "$app/forms";
  import { Button, Input, Label } from "flowbite-svelte";
  export let register: boolean = false;
</script>

<div class="flex h-full justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div>
    <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
      {#if register}
        Register new account
      {:else}
        Sign in to your account
      {/if}
    </h2>
    <div class="flex justify-center">
      <p class="mt-2 text-center text-lg text-gray">
        Or
        {#if register}
          <a href="/" class="font-medium text-blue-600 hover:text-blue-500">Login</a>
        {:else}
          <a href="/register" class="font-medium text-blue-600 hover:text-blue-500">Register</a>
        {/if}
      </p>
    </div>
    <form use:enhance class="mt-8 space-y-6" action="#" method="POST">
      {#if register}
        <div>
          <Label for="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            placeholder="Email address"
          />
        </div>
      {/if}
      <div>
        <Label for="username">Username</Label>
        <Input
          id="username"
          name="username"
          autocomplete="username"
          required
          placeholder="Username"
        />
      </div>
      <div>
        <Label for="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autocomplete="current-password"
          required
          placeholder="Password"
        />
      </div>

      <div>
        <Button type="submit" color="blue">
          <svg
            class="h-5 w-5 text-blue-500 group-hover:text-blue-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
              clip-rule="evenodd"
            />
          </svg>
          Sign in
        </Button>
      </div>
    </form>
  </div>
</div>

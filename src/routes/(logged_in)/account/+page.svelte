<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";
  interface User {
    password: string;
    email: string;
    username: string;
  }
  export let data: PageData;
  let user: User = data.user;
</script>

{#if data.success}
  <form method="POST" use:enhance>
    <label for="username">Username: </label>
    <input name="username" value={user.username} />
    <label for="email">Email: </label>
    <input name="email" value={user.email} />
    <label for="password">Password: </label>
    <input name="password" />
    <button type="submit">Save</button>
  </form>
{:else}
  <h1>Ne radi</h1>
{/if}

<style>
</style>

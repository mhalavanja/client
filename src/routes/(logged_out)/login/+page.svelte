<script>
  import { enhance } from "$app/forms";
</script>

<form method="post" use:enhance>
  <label for="username">Username: </label>
  <input name="username" type="text" />
  <label for="password">Password: </label>
  <input name="password" type="password" />

  <button>Log in!</button>
</form>

<style>
</style>

<script lang="ts">
  import { enhance } from "$app/forms";
</script>

<h1>New group</h1>
<form method="post" use:enhance>
  <label for="name">Group name: </label>
  <input name="name" type="text" />
  <button type="submit">Create</button>
</form>

<style>
</style>

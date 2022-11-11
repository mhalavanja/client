<script>
  import Login from "./login/+page.svelte";
  import Register from "./register/+page.svelte";
  let loggedIn = false;
  let formType = "login";
</script>

<nav>
  <a href="/login">Login form</a>
  <a href="/register">Register form</a>
</nav>

{#if loggedIn}
  <h1>LOGGED IN!</h1>
{:else}
  <h1>not logged in</h1>
{/if}

<style>
</style>

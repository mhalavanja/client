<script>
  import { enhance } from "$app/forms";

  async function logout() {
    console.log("AAAAAAAAA");
    const res = await fetch("/logout", {
      method: "POST",
      body: "",
      headers: {
        "content-type": "application/json",
      },
    });
  }
</script>

<nav>
  <a href="/friends">Friends</a>
  <a href="/groups">Groups</a>
  <a href="/account">Account</a>
  <button on:click={logout}>Log out</button>
</nav>

<slot />

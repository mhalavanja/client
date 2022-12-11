<script lang="ts">
  import { enhance } from "$app/forms";
  import { GenericFormType } from "../classes/GenericFormType";
  interface User {
    password: string;
    email: string;
    username: string;
  }

  export let user: User | null = null;
  export let title: string;
  export let buttonText: string;
  export let formType: string;
</script>

<div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="w-full max-w-md space-y-8">
    <div>
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        {title}
      </h2>
    </div>
    <form use:enhance class="mt-8 space-y-6" action="#" method="POST">
      <div class="-space-y-px rounded-md shadow-sm">
        {#if formType === GenericFormType.Account}
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Email address"
              value={user !== null ? user.email : ""}
            />
          </div>
        {/if}
        {#if formType === GenericFormType.Account || formType === GenericFormType.NewFriend}
          <div>
            <label for="username" class="sr-only">Username</label>
            <input
              id="username"
              name="username"
              type="username"
              required
              class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Username"
              value={user !== null ? user.username : ""}
            />
          </div>
        {/if}
        {#if formType === GenericFormType.Account}
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
              value={user !== null ? user.password : ""}
            />
          </div>
        {/if}
        {#if formType === GenericFormType.NewGroup}
          <div>
            <label for="groupName" class="sr-only">Group name</label>
            <input
              id="groupName"
              name="groupName"
              type="text"
              required
              class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Group name"
            />
          </div>
        {/if}
      </div>

      <div>
        <button
          type="submit"
          class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {buttonText}
        </button>
      </div>
    </form>
  </div>
</div>

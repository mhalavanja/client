<script lang="ts">
  import LandingForm from "@components/LandingForm.svelte";
  import Alert from "@components/Alert.svelte";

  import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

{#if form && !form.success}
  <Alert message={form.error} />
{/if}

<LandingForm />

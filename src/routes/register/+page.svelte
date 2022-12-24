<script lang="ts">
  import LandingForm from "../../components/LandingForm.svelte";
  import type { ActionData } from "./$types";
  import Alert from "../../components/Alert.svelte";

  export const prerender = true;
  export let form: ActionData;
</script>

{#if form && !form.success}
  <Alert message={form.error} />
{/if}

<LandingForm register={true} />

<script lang="ts">
  import GenericForm, { GenericFormType } from "../../../components/GenericForm.svelte";
  import type { PageData, ActionData } from "./$types";

  export let data: PageData;
  export let form: ActionData;
</script>

<GenericForm
  user={form !== null && form !== undefined ? form.user : data.user}
  title="Update account information"
  buttonText="Save"
  formType={GenericFormType.Account}
/>

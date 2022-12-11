<script lang="ts">
  import GenericForm from "../../../components/GenericForm.svelte";
  import { GenericFormType } from "../../../classes/GenericFormType";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<GenericForm
  user={data.user}
  title="Update account information"
  buttonText="Save"
  formType={GenericFormType.Account}
/>

<template>
  <div>
    <Modal
      width="540"
      v-model="create_outcome_dialog"
      title="Criar Perfil de Saída"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <outcome-form :formData="formData" :creating="true"></outcome-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "CreateOutcome",

  data() {
    return {
      formData: {
        id: "",
        name: "",
        description: "",
        type: ""
      }
    };
  },

  computed: {
    create_outcome_dialog: {
      get() {
        return this.$store.state.outcomes.create_outcome_dialog;
      },
      set(val) {
        this.$store.commit("outcomes/create_outcome_dialog", val);
      }
    }
  },

  components: {
    OutcomeForm: () => import("@/components/backend/forms/OutcomeForm")
  }
};
</script>

<style lang="scss" scoped></style>

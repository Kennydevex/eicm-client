<template>
  <div>
    <Modal
      width="540"
      v-model="update_outcome_dialog"
      title="Editar Perfil de Saída"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <outcome-form :formData="formData" :creating="false"></outcome-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "UpdateOutcome",
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
  created() {
    if (process.client) {
      window.getApp.$on("APP_ON_UPDATE_OUTCOME", outcome => {
        if (outcome) this.setOutcomeUpdateForm(outcome);
      });
    }
  },

  computed: {
    update_outcome_dialog: {
      get() {
        return this.$store.state.outcomes.update_outcome_dialog;
      },
      set(val) {
        this.$store.commit("outcomes/update_outcome_dialog", val);
      }
    }
  },

  methods: {
    async setOutcomeUpdateForm(outcome) {
      this.formData = outcome;
    }
  },

  components: {
    OutcomeForm: () => import("@/components/backend/forms/OutcomeForm")
  }
};
</script>

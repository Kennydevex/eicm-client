<template>
  <div>
    <Modal
      width="740"
      v-model="list_outcome_dialog"
      title="Gerir Perfis de Saída"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <list-outcomes></list-outcomes>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "OutcomesIndex",

  components: {
    ListOutcomes: () => import("@/components/backend/outcomes/ListOutcomes")
  },

  computed: {
    list_outcome_dialog: {
      get() {
        return this.$store.state.outcomes.list_outcome_dialog;
      },
      set(val) {
        this.$store.commit("outcomes/list_outcome_dialog", val);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>

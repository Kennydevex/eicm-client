<template>
  <div>
    <Modal
      width="740"
      v-model="list_charge_dialog"
      title="Gerir cargos dos colaboradores"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <list-charges></list-charges>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "ChargesIndex",

  components: {
    ListCharges: () => import("@/components/backend/charges/ListCharges")
  },

  computed: {
    list_charge_dialog: {
      get() {
        return this.$store.state.charges.list_charge_dialog;
      },
      set(val) {
        this.$store.commit("charges/list_charge_dialog", val);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>

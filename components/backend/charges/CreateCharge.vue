<template>
  <div>
    <Modal
      width="540"
      v-model="create_charge_dialog"
      title="Criar Cargo"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <charge-form :formData="formData" :creating="true"></charge-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "CreateCharge",

  data() {
    return {
      formData: {
        id: "",
        name: "",
        description: "",
        section: ""
      }
    };
  },

  computed: {
    create_charge_dialog: {
      get() {
        return this.$store.state.charges.create_charge_dialog;
      },
      set(val) {
        this.$store.commit("charges/create_charge_dialog", val);
      }
    }
  },

  components: {
    ChargeForm: () => import("@/components/backend/forms/ChargeForm")
  }
};
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <Modal
      width="540"
      v-model="update_charge_dialog"
      title="Editar Cargo"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <charge-form :formData="formData" :creating="false"></charge-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "UpdateCharge",
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
  created() {
    if (process.client) {
      window.getApp.$on("APP_ON_UPDATE_CHARGE", charge => {
        if (charge) this.setChargeUpdateForm(charge);
      });
    }
  },

  computed: {
    update_charge_dialog: {
      get() {
        return this.$store.state.charges.update_charge_dialog;
      },
      set(val) {
        this.$store.commit("charges/update_charge_dialog", val);
      }
    }
  },

  methods: {
    async setChargeUpdateForm(charge) {
      this.formData = charge;
    }
  },

  components: {
    ChargeForm: () => import("@/components/backend/forms/ChargeForm")
  }
};
</script>

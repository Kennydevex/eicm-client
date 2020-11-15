<template>
  <div>
    <Modal
      width="640"
      v-model="update_partner_dialog"
      title="Editar Parceiro"
      footer-hide
      scrollable
      :mask-closable="false"
      class-name="vertical-center-modal"
    >
      <partner-form :formData="formData" :creating="false"></partner-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "UpdatePartner",
  data() {
    return {
      formData: {
        id: "",
        name: "",
        type: "",
        logo: null,
        link: '',
        status: false,
        description: ""
      }
    };
  },
  created() {
    if (process.client) {
      window.getApp.$on("APP_ON_UPDATE_PARTNER", partner => {
        if (partner) this.setPartnerUpdateForm(partner);
      });
    }
  },

  computed: {
    update_partner_dialog: {
      get() {
        return this.$store.state.partners.update_partner_dialog;
      },
      set(val) {
        this.$store.commit("partners/update_partner_dialog", val);
      }
    }
  },

  methods: {
    async setPartnerUpdateForm(partner) {
      this.formData = partner;
    }
  },

  components: {
    PartnerForm: () => import("@/components/backend/forms/PartnerForm")
  }
};
</script>

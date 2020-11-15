<template>
  <div>
    <Modal
      width="640"
      v-model="create_partner_dialog"
      title="Criar Parceiro"
      footer-hide
      scrollable
      :mask-closable="false"
      class-name="vertical-center-modal"
      :styles="{ top: '20px' }"
    >
      <partner-form :formData="formData" :creating="true"></partner-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "CreatePartner",

  data() {
    return {
      formData: {
        id: "",
        name: "",
        type: "",
        logo: null,
        status: false,
        description: ""
      }
    };
  },

  computed: {
    create_partner_dialog: {
      get() {
        return this.$store.state.partners.create_partner_dialog;
      },
      set(val) {
        this.$store.commit("partners/create_partner_dialog", val);
      }
    }
  },

  components: {
    PartnerForm: () => import("@/components/backend/forms/PartnerForm")
  }
};
</script>

<style lang="scss" scoped></style>

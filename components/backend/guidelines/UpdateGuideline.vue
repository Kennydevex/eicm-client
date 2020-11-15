<template>
  <div>
    <Modal
      width="640"
      v-model="update_guideline_dialog"
      title="Editar Diretriz"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <guideline-form :formData="formData" :creating="false"></guideline-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "UpdateGuideline",
  data() {
    return {
      formData: {
        id: "",
        name: "",
        description: "",
        icon: ""
      }
    };
  },
  created() {
    if (process.client) {
      window.getApp.$on("APP_ON_UPDATE_GUIDELINE", guideline => {
        if (guideline) this.setGuidelineUpdateForm(guideline);
      });
    }
  },

  computed: {
    update_guideline_dialog: {
      get() {
        return this.$store.state.guidelines.update_guideline_dialog;
      },
      set(val) {
        this.$store.commit("guidelines/update_guideline_dialog", val);
      }
    }
  },

  methods: {
    async setGuidelineUpdateForm(guideline) {
      this.formData = guideline;
    }
  },

  components: {
    GuidelineForm: () => import("@/components/backend/forms/GuidelineForm")
  }
};
</script>

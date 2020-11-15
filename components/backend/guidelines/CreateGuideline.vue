<template>
  <div>
    <Modal
      width="640"
      v-model="create_guideline_dialog"
      title="Criar Diretriz"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <guideline-form :formData="formData" :creating="true"></guideline-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "CreateGuideline",

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

  computed: {
    create_guideline_dialog: {
      get() {
        return this.$store.state.guidelines.create_guideline_dialog;
      },
      set(val) {
        this.$store.commit("guidelines/create_guideline_dialog", val);
      }
    }
  },

  components: {
    GuidelineForm: () => import("@/components/backend/forms/GuidelineForm")
  }
};
</script>

<style lang="scss" scoped></style>

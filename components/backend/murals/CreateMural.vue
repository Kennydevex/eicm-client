<template>
  <div>
    <Modal
      width="640"
      v-model="create_mural_dialog"
      title="Criar Mural"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <mural-form :formData="formData" :creating="true"></mural-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "CreateMural",

  data() {
    return {
      formData: {
        id: "",
        designation: "",
        description: "",
        icon: ""
      }
    };
  },

  computed: {
    create_mural_dialog: {
      get() {
        return this.$store.state.murals.create_mural_dialog;
      },
      set(val) {
        this.$store.commit("murals/create_mural_dialog", val);
      }
    }
  },

  components: {
    MuralForm: () => import("@/components/backend/forms/MuralForm")
  }
};
</script>

<style lang="scss" scoped></style>

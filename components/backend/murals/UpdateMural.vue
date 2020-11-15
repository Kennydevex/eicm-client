<template>
  <div>
    <Modal
      width="640"
      v-model="update_mural_dialog"
      title="Editar Mural"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <mural-form :formData="formData" :creating="false"></mural-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "UpdateMural",
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
  created() {
    if (process.client) {
      window.getApp.$on("APP_ON_UPDATE_MURAL", mural => {
        if (mural) this.setMuralUpdateForm(mural);
      });
    }
  },

  computed: {
    update_mural_dialog: {
      get() {
        return this.$store.state.murals.update_mural_dialog;
      },
      set(val) {
        this.$store.commit("murals/update_mural_dialog", val);
      }
    }
  },

  methods: {
    async setMuralUpdateForm(mural) {
      this.formData = mural;
    }
  },

  components: {
    MuralForm: () => import("@/components/backend/forms/MuralForm")
  }
};
</script>

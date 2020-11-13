<template>
  <div>
    <Modal
      width="540"
      v-model="update_family_dialog"
      title="Editar Familia do Curso"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <family-form :formData="formData" :creating="false"></family-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "UpdateFamily",
  data() {
    return {
      formData: {
        id: "",
        name: "",
        description: "",
      }
    };
  },
  created() {
    if (process.client) {
      window.getApp.$on("APP_ON_UPDATE_FAMILY", family => {
        if (family) this.setFamilyUpdateForm(family);
      });
    }
  },

  computed: {
    update_family_dialog: {
      get() {
        return this.$store.state.families.update_family_dialog;
      },
      set(val) {
        this.$store.commit("families/update_family_dialog", val);
      }
    }
  },

  methods: {
    async setFamilyUpdateForm(family) {
      this.formData = family;
    }
  },

  components: {
    FamilyForm: () => import("@/components/backend/forms/FamilyForm")
  }
};
</script>

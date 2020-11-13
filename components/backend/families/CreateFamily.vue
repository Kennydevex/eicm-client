<template>
  <div>
    <Modal
      width="540"
      v-model="create_family_dialog"
      title="Criar Familia do Curso"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <family-form :formData="formData" :creating="true"></family-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "CreateFamily",

  data() {
    return {
      formData: {
        id: "",
        name: "",
        description: "",
      }
    };
  },

  computed: {
    create_family_dialog: {
      get() {
        return this.$store.state.families.create_family_dialog;
      },
      set(val) {
        this.$store.commit("families/create_family_dialog", val);
      }
    }
  },

  components: {
    FamilyForm: () => import("@/components/backend/forms/FamilyForm")
  }
};
</script>

<style lang="scss" scoped></style>

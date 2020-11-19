<template>
  <div>
    <Modal
      width="540"
      v-model="create_category_dialog"
      title="Criar Categoria dos Artigos"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <category-form :formData="formData" :creating="true"></category-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "CreateCategory",

  data() {
    return {
      formData: {
        id: "",
        name: "",
        description: "",
        color: "",
        display: "",
      }
    };
  },

  computed: {
    create_category_dialog: {
      get() {
        return this.$store.state.categories.create_category_dialog;
      },
      set(val) {
        this.$store.commit("categories/create_category_dialog", val);
      }
    }
  },

  components: {
    CategoryForm: () => import("@/components/backend/forms/CategoryForm")
  }
};
</script>

<style lang="scss" scoped></style>

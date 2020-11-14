<template>
  <div>
    <Modal
      width="540"
      v-model="update_category_dialog"
      title="Editar Categoria"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <category-form :formData="formData" :creating="false"></category-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "UpdateCategory",
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
      window.getApp.$on("APP_ON_UPDATE_CATEGORY", category => {
        if (category) this.setCategoryUpdateForm(category);
      });
    }
  },

  computed: {
    update_category_dialog: {
      get() {
        return this.$store.state.categories.update_category_dialog;
      },
      set(val) {
        this.$store.commit("categories/update_category_dialog", val);
      }
    }
  },

  methods: {
    async setCategoryUpdateForm(category) {
      this.formData = category;
    }
  },

  components: {
    CategoryForm: () => import("@/components/backend/forms/CategoryForm")
  }
};
</script>

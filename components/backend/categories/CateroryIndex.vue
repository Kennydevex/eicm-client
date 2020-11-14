<template>
  <div>
    <Modal
      width="740"
      v-model="list_category_dialog"
      title="Gerir Categorias"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <list-categories></list-categories>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "CategoriesIndex",

  components: {
    ListCategories: () => import("@/components/backend/categories/ListCategories")
  },

  computed: {
    list_category_dialog: {
      get() {
        return this.$store.state.categories.list_category_dialog;
      },
      set(val) {
        this.$store.commit("categories/list_category_dialog", val);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>

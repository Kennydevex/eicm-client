<template>
  <div>
    <Modal
      width="740"
      v-model="list_family_dialog"
      title="Gerir Familias dos Cursos"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <list-families></list-families>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "FamiliesIndex",

  components: {
    ListFamilies: () => import("@/components/backend/families/ListFamilies")
  },

  computed: {
    list_family_dialog: {
      get() {
        return this.$store.state.families.list_family_dialog;
      },
      set(val) {
        this.$store.commit("families/list_family_dialog", val);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>

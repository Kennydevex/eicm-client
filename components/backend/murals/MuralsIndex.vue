<template>
  <div>
    <Modal
      width="740"
      v-model="list_mural_dialog"
      title="Gerir Marcadores"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <list-murals></list-murals>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "muralsIndex",

  components: {
    ListMurals: () => import("@/components/backend/murals/ListMurals")
  },

  computed: {
    list_mural_dialog: {
      get() {
        return this.$store.state.murals.list_mural_dialog;
      },
      set(val) {
        this.$store.commit("murals/list_mural_dialog", val);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>

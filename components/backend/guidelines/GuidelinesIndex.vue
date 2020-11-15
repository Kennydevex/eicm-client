<template>
  <div>
    <Modal
      width="740"
      v-model="list_guideline_dialog"
      title="Gerir Marcadores"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <list-guidelines></list-guidelines>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "guidelinesIndex",

  components: {
    ListGuidelines: () => import("@/components/backend/guidelines/ListGuidelines")
  },

  computed: {
    list_guideline_dialog: {
      get() {
        return this.$store.state.guidelines.list_guideline_dialog;
      },
      set(val) {
        this.$store.commit("guidelines/list_guideline_dialog", val);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>

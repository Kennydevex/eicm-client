<template>
  <div>
    <Modal
      width="740"
      v-model="list_mark_dialog"
      title="Gerir Marcadores"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <list-marks></list-marks>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "marksIndex",

  components: {
    ListMarks: () => import("@/components/backend/marks/ListMarks")
  },

  computed: {
    list_mark_dialog: {
      get() {
        return this.$store.state.marks.list_mark_dialog;
      },
      set(val) {
        this.$store.commit("marks/list_mark_dialog", val);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>

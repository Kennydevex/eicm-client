<template>
  <div>
    <Modal
      width="740"
      v-model="list_discipline_dialog"
      title="Gerir Disciplinas"
      footer-hide
      scrollable
      :mask-closable="false"
    >
      <list-disciplines></list-disciplines>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "DisciplinesIndex",

  components: {
    ListDisciplines: () => import("@/components/backend/disciplines/ListDisciplines")
  },

  computed: {
    list_discipline_dialog: {
      get() {
        return this.$store.state.disciplines.list_discipline_dialog;
      },
      set(val) {
        this.$store.commit("disciplines/list_discipline_dialog", val);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

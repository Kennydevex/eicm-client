<template>
  <div>
    <Modal
      width="740"
      v-model="list_departament_dialog"
      title="Gerir Departamentos"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <list-departaments></list-departaments>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "departamentsIndex",

  components: {
    ListDepartaments: () => import("@/components/backend/departaments/ListDepartaments")
  },

  computed: {
    list_departament_dialog: {
      get() {
        return this.$store.state.departaments.list_departament_dialog;
      },
      set(val) {
        this.$store.commit("departaments/list_departament_dialog", val);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>

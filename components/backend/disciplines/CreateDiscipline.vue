<template>
  <div>
    <Modal
      width="540"
      v-model="create_discipline_dialog"
      title="Registar Disciplina"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <discipline-form :formData="formData" :creating="true"></discipline-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "CreateDiscipline",

  data() {
    return {
      formData: {
        id: "",
        name: "",
        description: "",
        type: ""
      }
    };
  },

  computed: {
    create_discipline_dialog: {
      get() {
        return this.$store.state.disciplines.create_discipline_dialog;
      },
      set(val) {
        this.$store.commit("disciplines/create_discipline_dialog", val);
      }
    }
  },

  components: {
    DisciplineForm: () => import("@/components/backend/forms/DisciplineForm")
  }
};
</script>

<style lang="scss" scoped></style>

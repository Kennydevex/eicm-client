<template>
  <div>
    <Modal
      width="540"
      v-model="update_discipline_dialog"
      title="Editar Disciplina"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <discipline-form :formData="formData" :creating="false"></discipline-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "UpdateDiscipline",
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
  created() {
    if (process.client) {
      window.getApp.$on("APP_ON_UPDATE_DISCIPLINE", discipline => {
        if (discipline) this.setDisciplineUpdateForm(discipline);
      });
    }
  },

  computed: {
    update_discipline_dialog: {
      get() {
        return this.$store.state.disciplines.update_discipline_dialog;
      },
      set(val) {
        this.$store.commit("disciplines/update_discipline_dialog", val);
      }
    }
  },

  methods: {
    async setDisciplineUpdateForm(discipline) {
      this.formData = discipline;
    }
  },

  components: {
    DisciplineForm: () => import("@/components/backend/forms/DisciplineForm")
  }
};
</script>

<template>
  <div>
    <Modal
      width="540"
      v-model="update_departament_dialog"
      title="Editar Departamento"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <departament-form :formData="formData" :creating="false"></departament-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "UpdateDepartament",
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
      window.getApp.$on("APP_ON_UPDATE_DEPARTAMENT", departament => {
        if (departament) this.setDepartamentUpdateForm(departament);
      });
    }
  },

  computed: {
    update_departament_dialog: {
      get() {
        return this.$store.state.departaments.update_departament_dialog;
      },
      set(val) {
        this.$store.commit("departaments/update_departament_dialog", val);
      }
    }
  },

  methods: {
    async setDepartamentUpdateForm(departament) {
      this.formData = departament;
    }
  },

  components: {
    DepartamentForm: () => import("@/components/backend/forms/DepartamentForm")
  }
};
</script>

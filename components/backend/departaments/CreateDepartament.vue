<template>
  <div>
    <Modal
      width="540"
      v-model="create_departament_dialog"
      title="Criar Departamento"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <departament-form :formData="formData" :creating="true"></departament-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "CreateDepartament",

  data() {
    return {
      formData: {
        id: "",
        name: "",
        description: "",
      }
    };
  },

  computed: {
    create_departament_dialog: {
      get() {
        return this.$store.state.departaments.create_departament_dialog;
      },
      set(val) {
        this.$store.commit("departaments/create_departament_dialog", val);
      }
    }
  },

  components: {
    DepartamentForm: () => import("@/components/backend/forms/DepartamentForm")
  }
};
</script>

<style lang="scss" scoped></style>

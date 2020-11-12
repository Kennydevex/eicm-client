<template>
  <div>
    <Modal
      width="940"
      v-model="create_employee_dialog"
      title="Criar Colaborador"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{top: '20px'}"
    >
      <employee-form :formData="formData" :creating="true"></employee-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "CreateEmployee",

  data() {
    return {
      formData: {
        id: "",
        ic: "",
        email: "",
        active: "",
        avatar: "default.svg",
        team: "",
        sync_user_account: false,
        is_teacher: false,
        sync_email: false,
        default_password: false,
        person: {
          id: "",
          name: "",
          gender: "m",
          birthday: "",
          phone: "",
          person_id: "",
          school_id: "",
          user: {
            id: "",
            name: "",
            email: "",
            password: ""
          }
        },
        charges: [
          {
            encumbrance: {
              charge_id: "",
              activity_begin: "",
              activity_end: ""
            }
          }
        ]
      }
    };
  },

  computed: {
    create_employee_dialog: {
      get() {
        return this.$store.state.employees.create_employee_dialog;
      },
      set(val) {
        this.$store.commit("employees/create_employee_dialog", val);
      }
    }
  },

  components: {
    EmployeeForm: () => import("@/components/backend/forms/EmployeeForm")
  }
};
</script>

<style lang="scss" scoped></style>

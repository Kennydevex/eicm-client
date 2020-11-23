<template>
  <div>
    <Modal
      width="940"
      v-model="update_employee_dialog"
      title="Editar Colaborador"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <employee-form :formData="formData" :creating="false"></employee-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "UpdateEmployee",
  data() {
    return {
      formData: {
        id: "",
        ic: "",
        email: "",
        facebook: "",
        twitter: "",
        linkedin: "",
        active: "",
        avatar: "",
        team: false,
        active: false,
        sync_user_account: false,
        is_teacher: false,
        sync_email: false,
        default_password: false,
        person: {
          id: "",
          name: "",
          gender: "",
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
  created() {
    if (process.client) {
      window.getApp.$on("APP_ON_UPDATE_EMPLOYEE", employee => {
        if (employee) this.setEmployeeUpdateForm(employee);
      });
    }
  },

  computed: {
    update_employee_dialog: {
      get() {
        return this.$store.state.employees.update_employee_dialog;
      },
      set(val) {
        this.$store.commit("employees/update_employee_dialog", val);
      }
    }
  },

  methods: {
    async setEmployeeUpdateForm(employee) {
      this.formData = employee;
    }
  },

  components: {
    EmployeeForm: () => import("@/components/backend/forms/EmployeeForm")
  }
};
</script>

<template>
  <div>
    <Modal
      width="640"
      v-model="create_user_dialog"
      title="Criar utilizador"
      footer-hide
      scrollable
      :mask-closable="false"
      class-name="vertical-center-modal"
    >
      <user-form :formData="formData" :creating="true"></user-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "CreateUser",
  data() {
    return {
      formData: {
        id: "",
        name: "",
        email: "",
        password: "",
        avatar: "",
        status: "",
        person: {
          id: "",
          name: "",
          gender: "m",
          birthday: "",
          phone: ""
        },
        roles: [],
        permissions: [],
        user_roles: [],
        user_permissions: []
      }
    };
  },

  computed: {
    create_user_dialog: {
      get() {
        return this.$store.state.users.create_user_dialog;
      },
      set(val) {
        this.$store.commit("users/create_user_dialog", val);
      }
    }
  },

  methods: {
    AddUserData() {
      process.client ? window.getApp.$emit("APP_CREATE_USER") : "";
    }
  },

  components: {
    UserForm: () => import("@/components/backend/forms/UserForm")
  }
};
</script>

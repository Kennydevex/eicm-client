<template>
  <div>
    <Modal
      width="640"
      v-model="update_user_dialog"
      title="Editar utilizador"
      footer-hide
      scrollable
      :mask-closable="false"
      class-name="vertical-center-modal"
    >
      <user-form :formData="formData" :creating="false"></user-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "UpdateUser",
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
          gender: "",
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
  created() {
    if (process.client) {
      window.getApp.$on("APP_ON_UPDATE_USER", user => {
        if (user) this.setUserUpdateForm(user);
      });
    }
  },

  computed: {
    update_user_dialog: {
      get() {
        return this.$store.state.users.update_user_dialog;
      },
      set(val) {
        this.$store.commit("users/update_user_dialog", val);
      }
    }
  },

  methods: {
    async setUserUpdateForm(user) {
      console.log("yes");
      console.log(user);
      this.formData = user;
    }
  },

  components: {
    UserForm: () => import("@/components/backend/forms/UserForm"),
    UserFor: () => import("@/components/backend/forms/UserFor")
  }
};
</script>

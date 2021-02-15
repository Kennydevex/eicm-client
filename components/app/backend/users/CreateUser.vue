<template>
  <div>
    <el-button type="text" @click="handleModal('users/toggleCreateUserDialog')"
      >Abrir</el-button
    >
    <el-dialog
      class="w-full"
      title="Criar Utilizador"
      :visible.sync="create_user_dialog"
    >
      Aqui valo
      <el-button
        type="text"
        @click="handleModal('users/toggleCreateUserDialog')"
        >Cancelar</el-button
      >
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "CreateUser",
  data() {
    return {
      dialogVisible: false,

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
  }

  //   methods: {
  //     AddUserData() {
  //       process.client ? window.getApp.$emit("APP_CREATE_USER") : "";
  //     }
  //   },

  //   components: {
  //     UserForm: () => import("@/components/backend/forms/UserForm")
  //   }
};
</script>

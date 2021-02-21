<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button size="medium" type="primary" @click.stop="onCreateUser()"
          >Registar Novo Utilizador</el-button
        >
        <appBackendCommonRegisterDialog
          @save-data="onSaveUser()"
          @update-data="onUpdateUser()"
          @cancel-data="cancelUserForm()"
          :dialogVisible="create_user_dialog"
          :dialogTitle="user_dialog_title"
          :dialogWidth="400"
          :creatingRecord="creatingUser"
        >
          <appBackendFormsUser
            :creating="creatingUser"
            :formData="formData"
            ref="userForm"
          ></appBackendFormsUser>
        </appBackendCommonRegisterDialog>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24">
        <appBackendCommonDataTable
          :deleteEntity="'users'"
          :updateEntity="'APP_UPDATE_USERS_DATA'"
          :tableFields="tableFields"
          :searchParams="[
            { name: 'Nome', key: 'name' },
            { name: 'Email', key: 'email' }
          ]"
          :sendingData="sending"
          :dataSourse="users"
          @handleEdit="onEditUser($event)"
          @handleDelete="onDeleteUser($event)"
        >
        </appBackendCommonDataTable>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { handleActivations, deleteDatas } from "@/mixins/appRequest";
import { mapGetters } from "vuex";

export default {
  name: "UsersIndex",
  mixins: [handleActivations, deleteDatas],

  async fetch({ store }) {
    await store.dispatch("users/getUsers", 1);
  },

  data() {
    return {
      creatingUser: "",
      selected: [],
      tableFields: [
        { label: "Nome", name: "person.name" },
        { label: "Email", name: "email" }
      ],
      sending: {},
      singleUser: {},
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
          gender: "0",
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
    ...mapGetters({
      users: "users/users",
      pagination: "users/pagination"
    }),
    create_user_dialog: {
      get() {
        return this.$store.state.users.create_user_dialog;
      },
      set(val) {
        this.$store.commit("users/create_user_dialog", val);
      }
    },
    user_dialog_title() {
      return this.creatingUser ? "Registar Utilizador" : "Editar Utilizador";
    }
  },

  async created() {
    await this.$store.dispatch("permissions/getPermissions");
    await this.$store.dispatch("permissions/getRoles");
    if (process.client) {
      window.getApp.$on("APP_UPDATE_USERS_DATA", () => {
        this.getUsers(1);
      });
    }
  },

  methods: {
    async cancelUserForm() {
      this.$refs.userForm.cancelUserForm();
    },
    async onSaveUser() {
      this.$refs.userForm.addUser();
    },
    async onUpdateUser() {
      this.$refs.userForm.updateUser();
    },
    async onCreateUser() {
      this.resetFormData();
      this.creatingUser = true;
      await this.handleModal("users/toggleCreateUserDialog");
    },

    async onEditUser(ev) {
      this.creatingUser = false;
      try {
        this.$set(this.sending, ev[1].id, true);
        await this.$axios.$get(`users/${ev[1].id}`).then(res => {
          this.singleUser = res.data;
          this.formData = this.singleUser;
          this.handleModal("users/toggleCreateUserDialog");
          this.$set(this.sending, ev[1].id, false);
        });
        this.$refs.userForm.initFilesUploaded();
      } catch (error) {
        this.actionMsg("Algo correu mal", "error");
      }
    },

    onDeleteUser(ev) {
      this.onDelete("users", ev[1].id, "APP_UPDATE_USERS_DATA");
    },

    resetFormData() {
      this.formData = {
        id: "",
        name: "",
        email: "",
        password: "",
        avatar: "",
        status: "",
        person: {
          id: "",
          name: "",
          gender: "0",
          birthday: "",
          phone: ""
        },
        roles: [],
        permissions: [],
        user_roles: [],
        user_permissions: []
      };
    },

    async getUsers(page) {
      await this.$store.dispatch("users/getUsers", page);
    }
  }
};
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button size="medium" type="primary" @click.stop="onCreateRole()"
          >Registar novo papel</el-button
        >
        <appBackendCommonRegisterDialog
          @save-data="onSaveRole()"
          @update-data="onUpdateRole()"
          @cancel-data="cancelRoleForm()"
          :dialogVisible="create_role_dialog"
          :dialogTitle="role_dialog_title"
          :dialogWidth="400"
          :creatingRecord="creatingRole"
        >
          <appBackendFormsRole
            :creating="creatingRole"
            :formData="formData"
            ref="roleForm"
          ></appBackendFormsRole>
        </appBackendCommonRegisterDialog>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24">
        <appBackendCommonDataTable
          :tableFields="tableFields"
          :searchParams="[{ name: 'Nome', key: 'name' }]"
          :sendingData="sending"
          :dataSourse="roles"
          @handleEdit="onEditRole($event)"
          @handleDelete="onDeleteRole($event)"
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
  name: "RolesIndex",
  mixins: [handleActivations, deleteDatas],

  async fetch({ store }) {
    await store.dispatch("permissions/getRoles", 1);
  },

  data() {
    return {
      creatingRole: "",
      selected: [],
      tableFields: [{ label: "Nome", name: "name" }],
      sending: {},
      singleRole: {},
      formData: {
        id: "",
        name: "",
        permissions: []
      }
    };
  },

  computed: {
    ...mapGetters({
      roles: "permissions/roles"
      //   pagination: "roles/pagination"
    }),
    create_role_dialog: {
      get() {
        return this.$store.state.permissions.create_role_dialog;
      },
      set(val) {
        this.$store.commit("permissions/create_role_dialog", val);
      }
    },
    role_dialog_title() {
      return this.creatingRole ? "Registar Papel" : "Editar Papel";
    }
  },

  async created() {
    await this.$store.dispatch("permissions/getPermissions");
    if (process.client) {
      window.getApp.$on("APP_UPDATE_ROLES_DATA", () => {
        this.getRoles(1);
      });
    }
  },

  methods: {
    async cancelRoleForm() {
      this.$refs.roleForm.cancelRoleForm();
    },
    async onSaveRole() {
      this.$refs.roleForm.addRole();
    },
    async onUpdateRole() {
      this.$refs.roleForm.updateRole();
    },
    async onCreateRole() {
      this.resetFormData();
      this.creatingRole = true;
      await this.handleModal("permissions/toggleCreateRoleDialog");
    },

    async onEditRole(ev) {
      this.creatingRole = false;
      try {
        this.$set(this.sending, ev[1].id, true);
        await this.$axios.$get(`roles/${ev[1].id}`).then(res => {
          this.singleRole = res.data;
          this.formData = this.singleRole;
          this.handleModal("permissions/toggleCreateRoleDialog");
          this.$set(this.sending, ev[1].id, false);
        });
      } catch (error) {
        this.actionMsg("Algo correu mal", "error");
      }
    },

    onDeleteRole(ev) {
      this.onDelete("roles", ev[1].id, "APP_UPDATE_ROLES_DATA");
    },

    resetFormData() {
      this.formData = {
        id: "",
        name: "",
        permissions: []
      };
    },

    async getRoles(page) {
      await this.$store.dispatch("permissions/getRoles", page);
    }
  }
};
</script>

<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button
          size="medium"
          type="primary"
          @click.stop="onCreatePermission()"
          >Registar nova permissão</el-button
        >
        <appBackendCommonRegisterDialog
          @save-data="onSavePermission()"
          @update-data="onUpdatePermission()"
          @cancel-data="cancelPermissionForm()"
          :dialogVisible="create_permission_dialog"
          :dialogTitle="permission_dialog_title"
          :dialogWidth="400"
          :creatingRecord="creatingPermission"
        >
          <appBackendFormsPermission
            :creating="creatingPermission"
            :formData="formData"
            ref="permissionForm"
          ></appBackendFormsPermission>
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
          :dataSourse="permissions"
          @handleEdit="onEditPermission($event)"
          @handleDelete="onDeletePermission($event)"
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
  name: "PermissionsIndex",
  mixins: [handleActivations, deleteDatas],

  async fetch({ store }) {
    await store.dispatch("permissions/getPermissions", 1);
  },

  data() {
    return {
      creatingPermission: "",
      selected: [],
      tableFields: [{ label: "Nome", name: "name" }],
      sending: {},
      singlePermission: {},
      formData: {
        id: "",
        name: "",
        roles: []
      }
    };
  },

  computed: {
    ...mapGetters({
      permissions: "permissions/permissions"
      //   pagination: "permissions/pagination"
    }),
    create_permission_dialog: {
      get() {
        return this.$store.state.permissions.create_permission_dialog;
      },
      set(val) {
        this.$store.commit("permissions/create_permission_dialog", val);
      }
    },
    permission_dialog_title() {
      return this.creatingPermission
        ? "Registar Permissão"
        : "Editar Permissão";
    }
  },

  async created() {
    await this.$store.dispatch("permissions/getRoles");
    if (process.client) {
      window.getApp.$on("APP_UPDATE_PERMISSIONS_DATA", () => {
        this.getPermissions(1);
      });
    }
  },

  methods: {
    async cancelPermissionForm() {
      this.$refs.permissionForm.cancelPermissionForm();
    },
    async onSavePermission() {
      this.$refs.permissionForm.addPermission();
    },
    async onUpdatePermission() {
      this.$refs.permissionForm.updatePermission();
    },
    async onCreatePermission() {
      this.resetFormData();
      this.creatingPermission = true;
      await this.handleModal("permissions/toggleCreatePermissionDialog");
    },

    async onEditPermission(ev) {
      this.creatingPermission = false;
      try {
        this.$set(this.sending, ev[1].id, true);
        await this.$axios.$get(`permissions/${ev[1].id}`).then(res => {
          this.singlePermission = res.data;
          this.formData = this.singlePermission;
          this.handleModal("permissions/toggleCreatePermissionDialog");
          this.$set(this.sending, ev[1].id, false);
        });
      } catch (error) {
        this.actionMsg("Algo correu mal", "error");
      }
    },

    onDeletePermission(ev) {
      this.onDelete("permissions", ev[1].id, "APP_UPDATE_PERMISSIONS_DATA");
    },

    resetFormData() {
      this.formData = {
        id: "",
        name: "",
        roles: []
      };
    },

    async getPermissions(page) {
      await this.$store.dispatch("permissions/getPermissions", page);
    }
  }
};
</script>

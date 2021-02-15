<template>
  <el-form
    ref="roleForm"
    :model="formData"
    :rules="permissionFormValidation"
    label-position="left"
    label-width="80"
  >
    <el-form-item
      prop="name"
      label="Designação"
      :error="showFormErrors('name')"
    >
      <el-input
        placeholder="Designação do papel"
        v-model="formData.name"
      ></el-input>
    </el-form-item>

    <el-form-item prop="permissions" label="Permissções">
      <el-transfer
        filterable
        :filter-method="filterMethod"
        filter-placeholder="Filtrar permissões"
        :props="{
          key: 'id',
          label: 'name'
        }"
        v-model="formData.permissions"
        :data="permissions"
        :titles="['Permissões', 'Selecionados']"
      >
      </el-transfer>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from "vuex";
import { requests } from "@/mixins/appRequest";
import { permission_validation } from "@/mixins/fieldsValidation";
export default {
  name: "RoleForm",

  mixins: [requests, permission_validation],
  props: {
    creating: {
      type: Boolean,
      default: true,
      required: false
    },
    formData: {
      type: Object,
      default: () => {
        return {};
      },
      required: true
    }
  },

  computed: {
    ...mapGetters({
      permissions: "permissions/permissions"
    })
  },

  methods: {
    filterMethod(query, item) {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    },

    async addRole() {
      await this.addData(
        "roleForm",
        "roles",
        "Papelo Registado",
        "APP_UPDATE_ROLES_DATA",
        "permissions/toggleCreateRoleDialog"
      );
    },

    updateRole() {
      this.updateData(
        "roleForm",
        "roles",
        "Papel Atualizado",
        "APP_UPDATE_ROLES_DATA",
        "permissions/toggleCreateRoleDialog"
      );
    },

    cancelRoleForm() {
      this.resetFormFields("roleForm");
      this.handleModal("permissions/toggleCreateRoleDialog");
    }
  }
};
</script>

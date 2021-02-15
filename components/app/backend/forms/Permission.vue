<template>
  <el-form
    ref="permissionForm"
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
        placeholder="Designação da permissão"
        v-model="formData.name"
      ></el-input>
    </el-form-item>

    <el-form-item prop="roles" label="Papeis da pemissão">
      <el-transfer
        filterable
        :filter-method="filterMethod"
        filter-placeholder="Filtrar Papeis"
        v-model="formData.roles"
        :props="{
          key: 'id',
          label: 'name'
        }"
        :data="roles"
        :titles="['Papeis', 'Selecionados']"
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
  name: "PermissionForm",

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
      roles: "permissions/roles"
    })
  },

  methods: {
    filterMethod(query, item) {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    },

    async addPermission() {
      await this.addData(
        "permissionForm",
        "permissions",
        "Permissão Registada",
        "APP_UPDATE_PERMISSIONS_DATA",
        "permissions/toggleCreatePermissionDialog"
      );
    },

    updatePermission() {
      this.updateData(
        "permissionForm",
        "permissions",
        "Permissão Atualizada",
        "APP_UPDATE_PERMISSIONS_DATA",
        "permissions/toggleCreatePermissionDialog"
      );
    },

    cancelPermissionForm() {
      this.resetFormFields("permissionForm");
      this.handleModal("permissions/toggleCreatePermissionDialog");
    }
  }
};
</script>

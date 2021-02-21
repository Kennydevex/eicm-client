<template>
  <el-form
    ref="departamentForm"
    :model="formData"
    :rules="departamentFormValidation"
    label-width="120px"
    :label-position="device == 'mobile' ? 'top' : 'left'"
  >
    <el-form-item
      prop="name"
      label="Nome"
      :error="showFormErrors('name')"
    >
      <el-input
        placeholder="Nome do Departamento"
        v-model="formData.name"
      ></el-input>
    </el-form-item>

    <el-form-item label="Descrião">
      <el-input
        :autosize="{ minRows: 3, maxRows: 6 }"
        type="textarea"
        v-model="formData.description"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { requests } from "@/mixins/appRequest";
import { departament_validation } from "@/mixins/fieldsValidation";
export default {
  name: "DepartamentForm",
  mixins: [requests, departament_validation],
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
    device() {
      return this.$store.state.app.device;
    }
  },
  methods: {
    async addDepartament() {
      await this.addData(
        "departamentForm",
        "departaments",
        "Departamento Registado",
        "APP_UPDATE_DEPARTAMENTS_DATA",
        "departaments/toggleCreateDepartamentDialog"
      );
    },

    updateDepartament() {
      this.updateData(
        "departamentForm",
        "departaments",
        "Departamento Atualizado",
        "APP_UPDATE_DEPARTAMENTS_DATA",
        "departaments/toggleCreateDepartamentDialog"
      );
    },

    cancelDepartamentForm() {
      this.resetFormFields("departamentForm");
      this.handleModal("departaments/toggleCreateDepartamentDialog");
    }
  }
};
</script>

<template>
  <el-form
    ref="familyForm"
    :model="formData"
    :rules="familyFormValidation"
    label-width="120px"
    :label-position="device == 'mobile' ? 'top' : 'left'"
  >
    <el-form-item
      prop="name"
      label="Nome"
      :error="showFormErrors('name')"
    >
      <el-input
        placeholder="Nome da Família"
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
import { family_validation } from "@/mixins/fieldsValidation";
export default {
  name: "FamilyForm",
  mixins: [requests, family_validation],
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
    async addFamily() {
      await this.addData(
        "familyForm",
        "families",
        "Família Registada",
        "APP_UPDATE_FAMILIES_DATA",
        "families/toggleCreateFamilyDialog"
      );
    },

    updateFamily() {
      this.updateData(
        "familyForm",
        "families",
        "Família Atualizada",
        "APP_UPDATE_FAMILIES_DATA",
        "families/toggleCreateFamilyDialog"
      );
    },

    cancelFamilyForm() {
      this.resetFormFields("familyForm");
      this.handleModal("families/toggleCreateFamilyDialog");
    }
  }
};
</script>

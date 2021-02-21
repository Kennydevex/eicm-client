<template>
  <el-form
    ref="categoryForm"
    :model="formData"
    :rules="categoryFormValidation"
    label-width="120px"
    :label-position="device == 'mobile' ? 'top' : 'left'"
  >
    <el-form-item
      prop="name"
      label="Nome"
      :error="showFormErrors('name')"
    >
      <el-input
        placeholder="Nome da Categoria"
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
import { category_validation } from "@/mixins/fieldsValidation";
export default {
  name: "CategoryForm",
  mixins: [requests, category_validation],
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
    async addCategory() {
      await this.addData(
        "categoryForm",
        "categories",
        "Categoria Registada",
        "APP_UPDATE_CATEGORIES_DATA",
        "categories/toggleCreateCategoryDialog"
      );
    },

    updateCategory() {
      this.updateData(
        "categoryForm",
        "categories",
        "Categoria Atualizada",
        "APP_UPDATE_CATEGORIES_DATA",
        "categories/toggleCreateCategoryDialog"
      );
    },

    cancelCategoryForm() {
      this.resetFormFields("categoryForm");
      this.handleModal("categories/toggleCreateCategoryDialog");
    }
  }
};
</script>

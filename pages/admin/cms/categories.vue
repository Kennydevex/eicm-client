<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button size="medium" type="primary" @click.stop="onCreateCategory()"
          >Registar Nova Categoria</el-button
        >
        <appBackendCommonRegisterDialog
          @save-data="onSaveCategory()"
          @update-data="onUpdateCategory()"
          @cancel-data="cancelCategoryForm()"
          :dialogVisible="create_category_dialog"
          :dialogTitle="category_dialog_title"
          :dialogWidth="400"
          :creatingRecord="creatingCategory"
        >
          <appBackendFormsCategory
            :creating="creatingCategory"
            :formData="formData"
            ref="categoryForm"
          ></appBackendFormsCategory>
        </appBackendCommonRegisterDialog>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24">
        <appBackendCommonDataTable
        :deleteEntity="'categories'"
          :updateEntity="'APP_UPDATE_CATEGORIES_DATA'"
          :tableFields="tableFields"
          :searchParams="[{ name: 'Nome', key: 'name' }]"
          :sendingData="sending"
          :dataSourse="categories"
          @handleEdit="onEditCategory($event)"
          @handleDelete="onDeleteCategory($event)"
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
  name: "CategoriesIndex",
  mixins: [handleActivations, deleteDatas],

  async fetch({ store }) {
    await store.dispatch("categories/getCategories", 1);
  },

  data() {
    return {
      creatingCategory: "",
      selected: [],
      tableFields: [
        { label: "Nome", name: "name" },
        { label: "Descrição", name: "description" }
      ],
      sending: {},
      singleCategory: {},
      formData: {
        id: "",
        name: "",
        description: "",
      }
    };
  },

  computed: {
    ...mapGetters({
      categories: "categories/categories"
      //   pagination: "categories/pagination"
    }),
    create_category_dialog: {
      get() {
        return this.$store.state.categories.create_category_dialog;
      },
      set(val) {
        this.$store.commit("categories/create_category_dialog", val);
      }
    },
    category_dialog_title() {
      return this.creatingCategory ? "Registar Categoria" : "Editar Categoria";
    }
  },

  async created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_CATEGORIES_DATA", () => {
        this.getCategories(1);
      });
    }
  },

  methods: {
    async cancelCategoryForm() {
      this.$refs.categoryForm.cancelCategoryForm();
    },
    async onSaveCategory() {
      this.$refs.categoryForm.addCategory();
    },
    async onUpdateCategory() {
      this.$refs.categoryForm.updateCategory();
    },
    async onCreateCategory() {
      this.resetFormData();
      this.creatingCategory = true;
      await this.handleModal("categories/toggleCreateCategoryDialog");
    },

    async onEditCategory(ev) {
      this.creatingCategory = false;
      try {
        this.$set(this.sending, ev[1].id, true);
        await this.$axios.$get(`categories/${ev[1].id}`).then(res => {
          this.singleCategory = res.data;
          this.formData = this.singleCategory;
          this.handleModal("categories/toggleCreateCategoryDialog");
          this.$set(this.sending, ev[1].id, false);
        });
      } catch (error) {
        this.actionMsg("Algo correu mal", "error");
      }
    },

    onDeleteCategory(ev) {
      this.onDelete("categories", ev[1].id, "APP_UPDATE_CATEGORIES_DATA");
    },

    resetFormData() {
      this.formData = {
        id: "",
        name: "",
        description: "",
      };
    },

    async getCategories(page) {
      await this.$store.dispatch("categories/getCategories", page);
    }
  }
};
</script>

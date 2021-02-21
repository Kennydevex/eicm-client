<template>
  <div>
    <el-row>
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="antialiased text-gray-700 "
              >Registar um novo artigo</span
            >
          </div>

          <div>
            <appBackendFormsArticle
              :creating="creatingArticle"
              :formData="formData"
              ref="articleForm"
            ></appBackendFormsArticle>
          </div>

          <el-divider></el-divider>

          <div class="flex items-end justify-end">
            <el-button @click.stop="cancelArticleForm()">Cancelar</el-button>
            <el-button type="primary" @click.stop="onSaveArticle()"
              >Guardar Artigo</el-button
            >
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "CreateArticle",
  layout: "admin",

  async fetch({ store }) {
    await store.dispatch("tags/getTags");
    await store.dispatch("categories/getCategories");
  },

  data() {
    return {
      creatingArticle: true,

      formData: {
        id: "",
        title: "",
        summary: "",
        content: "",
        type: "",
        status: false,
        featured: false,
        publish_start_date: "",
        publish_start_end: "",
        cover: null,
        category_id: "",
        article_tags: []
      }
    };
  },

  methods: {
    async onSaveArticle() {
      await this.$refs.articleForm.addArticle();
    },

    async cancelArticleForm() {
      this.$refs.articleForm.cancelArticleForm();
      this.redirectToPageByName("articles");
    }
  }
};
</script>

<style lang="scss" scoped></style>

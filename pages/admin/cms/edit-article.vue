<template>
  <div>
    <el-row>
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="antialiased text-gray-700 "
              >Editar Artigo "<span class="italic text-gray-500">{{
                formData.title
              }}</span
              >"</span
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
            <el-button type="primary" @click.stop="onUpdateArticle()"
              >Guardar Arterações</el-button
            >
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "EditArticle",
  layout: "admin",

  async asyncData({ $axios, params }) {
    const { data } = await $axios.$get(`/articles/${params.slug}`);
    return { formData: data };
  },

  async fetch({ store }) {
    await store.dispatch("tags/getTags");
    await store.dispatch("categories/getCategories");
  },
  data() {
    return {
      creatingArticle: false,
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
  mounted() {
    this.$refs.articleForm.initFilesUploaded();
  },

  methods: {
    async onUpdateArticle() {
      this.$refs.articleForm.updateArticle();
    },

    async cancelArticleForm() {
      this.$refs.articleForm.cancelArticleForm();
      this.redirectToPageByName("articles");
    }
  }
};
</script>

<style lang="scss" scoped></style>

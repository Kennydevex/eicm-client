<template>
  <div>
    <Modal
      width="640"
      v-model="update_article_dialog"
      title="Editar Publicação"
      footer-hide
      scrollable
      :mask-closable="false"
      class-name="vertical-center-modal"
    >
      <article-form :formData="formData" :creating="false"></article-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "UpdateArticle",
  data() {
    return {
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
        category_id: ""
      }
    };
  },
  created() {
    if (process.client) {
      window.getApp.$on("APP_ON_UPDATE_ARTICLE", article => {
        if (article) this.setArticleUpdateForm(article);
      });
    }
  },

  computed: {
    update_article_dialog: {
      get() {
        return this.$store.state.articles.update_article_dialog;
      },
      set(val) {
        this.$store.commit("articles/update_article_dialog", val);
      }
    }
  },

  methods: {
    async setArticleUpdateForm(article) {
      this.formData = article;
    }
  },

  components: {
    ArticleForm: () => import("@/components/backend/forms/ArticleForm")
  }
};
</script>

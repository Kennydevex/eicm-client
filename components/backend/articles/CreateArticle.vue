<template>
  <div>
    <Modal
      width="940"
      v-model="create_article_dialog"
      title="Criar Publicação"
      footer-hide
      scrollable
      :mask-closable="false"
      class-name="vertical-center-modal"
      :styles="{ top: '20px' }"
    >
      <article-form :formData="formData" :creating="true"></article-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "CreateArticle",

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

  computed: {
    create_article_dialog: {
      get() {
        return this.$store.state.articles.create_article_dialog;
      },
      set(val) {
        this.$store.commit("articles/create_article_dialog", val);
      }
    }
  },

  components: {
    ArticleForm: () => import("@/components/backend/forms/ArticleForm")
  }
};
</script>

<style lang="scss" scoped></style>

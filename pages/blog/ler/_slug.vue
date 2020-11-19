<template>
  <div class="container m-auto px-3">
    <div class="my-8 bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="shadow-lg">
        <BlogInfoHeader :article="article" />
      </div>
      <div class="p-5">
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import networks from "@/api/networks";
import { mapGetters } from "vuex";
import BlogInfoHeader from "@/components/frontend/sections/BlogInfoHeader";

export default {
  name: "ReadArticle",
  layout: "landing",
  async fetch({ store, params }) {
    await store.dispatch("articles/getArticle", params.slug);
  },

  head() {
    return {
      title: this.article.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: this.article.summary
        },
        { hid: "og:title", name: "og:title", content: this.article.title },
        {
          hid: "og:description",
          name: "og:description",
          content: this.article.summary
        },
        {
          hid: "og:image",
          name: "og:image",
          content: `${process.env.PUBLIC_URL}/uploads/articles/couvers/${this.article.cover}`
        },
        { hid: "og:type", name: "og:type", content: "article" },
        {
          hide: "twitter:card",
          name: "twitter:card",
          content: this.article.cover ? "summary_large_image" : "summary"
        }
      ].filter(x => x.content)
    };
  },

  data() {
    return {
      networks: networks
    };
  },

  computed: {
    ...mapGetters({
      article: "articles/article"
    })
  },

  components: {
    BlogInfoHeader
  }
};
</script>

<style lang="scss" scoped></style>

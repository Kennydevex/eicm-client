<template>
  <div class="container px-3 m-auto">
    <div class="my-8 overflow-hidden bg-white rounded-lg shadow-lg">
      <div class="shadow-lg">
        <BlogInfoHeader :article="article" />
      </div>
      <div class="p-8">
        <Row>
          <Col span="18">
            <div class="pb-3 my-3 border-b-2">
              <h2
                class="text-lg font-semibold leading-relaxed tracking-wide text-primary"
              >
                {{ article.summary }}
              </h2>
            </div>

            <div v-html="article.content" class="mt-5 "></div>
          </Col>

          <Col span="6"> Aside</Col>
        </Row>
        <Divider />
        <Row>
          <Col span="24">
            <div>
              <h2 class="font-semibold tracking-wide text-gray-600">
                Partilhar com os amigos
              </h2>
            </div>
            <div class="py-5">
              <social-network
                :title="article.title"
                :description="article.summary"
                :hashtags="article.category"
              ></social-network>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BlogInfoHeader from "@/components/frontend/sections/BlogInfoHeader";
import SocialNetwork from "@/components/frontend/sections/SocialNetwork";

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

  computed: {
    ...mapGetters({
      article: "articles/article"
    })
  },

  components: {
    BlogInfoHeader,
    SocialNetwork
  }
};
</script>

<style lang="scss" scoped></style>

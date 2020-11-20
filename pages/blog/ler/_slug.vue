<template>
  <div class="container m-auto px-3">
    <div class="my-8 bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="shadow-lg">
        <BlogInfoHeader :article="article" />
      </div>
      <div class="p-8">
        <Row>
          <Col span="18">
            <div class="my-3 pb-3 border-b-2">
              <h2
                class="text-xl font-bold text-gray-700 tracking-wide leading-relaxed"
              >
                {{ article.summary }}
              </h2>
            </div>
            <div
              class="mt-5 text-lg tracking-wide leading-loose text-justify"
            >
              <p class="text-gray-700">{{ article.content }}</p>
            </div>
          </Col>

          <Col span="6"> Aside</Col>
        </Row>
        <Divider />
        <Row>
          <Col span="24">
            <div>
              <h2 class="text-gray-600 font-semibold tracking-wide">
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

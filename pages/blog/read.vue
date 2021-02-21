<template>
  <div class="container m-auto">
    <div class="my-8 overflow-hidden bg-white rounded-lg shadow-lg">
      <div class="shadow-lg">
        <baseBlogHeader :article="article" />
      </div>
      <div class="p-8">
        <el-row>
          <el-col :span="18">
            <div class="pb-3 my-3 border-b-2">
              <h2
                class="text-lg font-semibold leading-relaxed tracking-wide text-primary"
              >
                {{ article.summary }}
              </h2>
            </div>

            <div v-html="article.content" class="mt-5 "></div>
          </el-col>

          <el-col :span="6"> Aside</el-col>
        </el-row>
        <el-divider />
        <el-row>
          <el-col :span="24">
            <div>
              <h2 class="font-semibold tracking-wide text-gray-600">
                Partilhar com os amigos
              </h2>
            </div>
            <div class="py-5">
              <SocialNet
                :button="'small'"
                :title="article.title"
                :description="article.summary"
                :hashtags="article.category"
              ></SocialNet>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

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
  }
};
</script>


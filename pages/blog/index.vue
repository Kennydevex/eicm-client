<template>
  <div>
    <div class="container m-auto">
      <el-row class="my-5">
        <el-col :span="24" >
          <FeaturedPost :articles="featured_articles"></FeaturedPost>
        </el-col>
      </el-row>
      <el-divider />
      <el-row class="px-6 pb-6" :gutter="20">
        <el-col :span="24" :xs="24" :md="18">
          <template v-for="category in categories">
            <div :key="category.id" class="mt-5">
              <div
                :style="{ borderColor: category.color }"
                class="flex items-center justify-start mb-5 overflow-hidden border-b-2 rounded-l-lg"
              >
                <nuxt-link
                  :style="{ backgroundColor: category.color }"
                  to="/blog"
                  class="px-3 py-1 mb-1 text-sm font-bold tracking-wider text-gray-100 capitalize rounded-t-lg rounded-r-lg"
                >
                  {{ category.name }}
                </nuxt-link>
              </div>

              <el-row :gutter="16">
                <template
                  v-for="article in filterBy(
                    published_articles,
                    category.name,
                    'category'
                  )"
                >
                  <div v-if="article != null" :key="article.id">
                    <el-col
                      :span="24"
                      :xs="24"
                      :sm="24"
                      :md="category.display == 1 ? 12 : 24"
                      class="mb-5"
                    >
                      <post-card :article="article"></post-card>
                    </el-col>
                  </div>
                </template>
              </el-row>
            </div>
          </template>
        </el-col>

        <el-col :span="24" :xs="24" :md="6">
          <el-row>
            <el-col>
              <div class="my-8">
                <h5 class="px-1 mb-2 text-lg font-bold text-gray-700 uppercase">
                  Lista de Categorias
                </h5>
                <ul>
                  <template v-for="category in categories">
                    <li
                      :key="category.id"
                      class="px-1 py-4 transition duration-300 border-t border-b border-white hover:border-gray-300"
                    >
                      <nuxt-link
                        to="/"
                        class="flex items-center text-gray-600 cursor-pointer text-md"
                      >
                        <span
                          :style="{ backgroundColor: category.color }"
                          class="inline-block w-4 h-4 mr-3"
                        ></span>
                        {{ category.name }}
                        <span class="ml-auto text-gray-500"
                          >{{ articlesNumber(category.name) }}
                          {{
                            articlesNumber(category.name) == 1
                              ? "Artigo"
                              : "Artigos"
                          }}</span
                        >
                        <i class="ml-1 text-gray-500 bx bx-right-arrow-alt"></i>
                      </nuxt-link>
                    </li>
                  </template>
                </ul>
              </div>
            </el-col>
          </el-row>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Vue2Filters from "vue2-filters";
import { filter } from "lodash";

export default {
  name: "BlogIndexPage",
  layout: "landing",
  mixins: [Vue2Filters.mixin],

  async created() {
    await this.$store.dispatch("articles/getPublishedArticles");
    await this.$store.dispatch("articles/getFeaturedArticles");
    await this.$store.dispatch("categories/getCategoriesWithActivedArticles");
  },

  computed: {
    ...mapGetters({
      published_articles: "articles/published_articles",
      featured_articles: "articles/featured_articles",
      categories: "categories/categories_with_actived_articles"
    })
  },

  methods: {
    articlesNumber(category_name) {
      return filter(this.published_articles, function(a) {
        return a.category == category_name;
      }).length;
    }
  }
};
</script>

<style lang="scss" scoped></style>

<template>
  <div class="container m-auto px-3">
    <main class="my-3 rounded-lg shadow-xl bg-white">
      <Row>
        <Col span="24" class="p-0">
          <FeaturedCaroucel :articles="featured_articles"></FeaturedCaroucel>
        </Col> 
      </Row>
      <Divider />
      <Row class="pb-6 px-6" :gutter="16">
        <Col span="24" :xs="24" :md="18">
          <template v-for="category in categories">
            <div :key="category.id" class="mt-5">
              <div
                :style="{ borderColor: category.color }"
                class="mb-5 flex justify-start items-center border-b-2 overflow-hidden rounded-l-lg"
              >
                <nuxt-link
                  :style="{ backgroundColor: category.color }"
                  to="/blog"
                  class="uppercase px-3 py-1 mb-1 rounded-t-lg rounded-r-lg text-gray-300 font-bold text-xl tracking-wider"
                >
                  {{ category.name }}
                </nuxt-link>
              </div>

              <Row :gutter="16">
                <template
                  v-for="article in filterBy(
                    published_articles,
                    category.name,
                    'category'
                  )"
                >
                  <div v-if="article != null" :key="article.id">
                    <Col
                      span="24"
                      :xs="24"
                      :sm="24"
                      :md="category.display == 1 ? 12 : 24"
                      class="mb-5"
                    >
                      <post-card :article="article"></post-card>
                    </Col>
                  </div>
                </template>
              </Row>
            </div>
          </template>
        </Col>

        <Col span="24" :xs="24" :md="6">
          <Row>
            <Col span="24">
              <div class="mb-4">
                <h5 class="font-bold text-lg uppercase text-gray-700 px-1 mb-2">
                  Lista de Categorias
                </h5>
                <ul>
                  <template v-for="category in categories">
                    <li
                      :key="category.id"
                      class="px-1 py-4 border-b border-t border-white hover:border-gray-300 transition duration-300"
                    >
                      <nuxt-link
                        to="/"
                        class="flex items-center text-md text-gray-600 cursor-pointer"
                      >
                        <span
                          :style="{ backgroundColor: category.color }"
                          class="inline-block h-4 w-4 mr-3"
                        ></span>
                        {{ category.name }}
                        <span class="text-gray-500 ml-auto"
                          >{{ articlesNumber(category.name) }}
                          {{
                            articlesNumber(category.name) == 1
                              ? "Artigo"
                              : "Artigos"
                          }}</span
                        >
                        <i class="text-gray-500 bx bx-right-arrow-alt ml-1"></i>
                      </nuxt-link>
                    </li>
                  </template>
                </ul>
              </div>
            </Col>
          </Row>
        </Col>

        <Col span="24">
          <div></div>
        </Col>
      </Row>
    </main>
  </div>
</template>

<script>
import FeaturedCaroucel from "@/components/frontend/sections/FeaturedCaroucel";
import { mapGetters } from "vuex";
import Vue2Filters from "vue2-filters";
import { filter } from "lodash";

export default {
  name: "BlogIndexPage",
  layout: "landing",
  mixins: [Vue2Filters.mixin],

  components: {
    FeaturedCaroucel
  },

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

  data() {
    return {};
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

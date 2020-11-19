export default {
  async getCategories({ commit }) {
    try {
      let res = await this.$axios.$get(`categories`);
      commit("SET_CATEGORIES", res.data);
    } catch (error) {}
  },

  async getCategoriesWithActivedArticles({ commit }) {
    //  let articles = {};
    //  if (getters.featured_articles.length > 0)
    //    articles = getters.featured_articles;
    //  else if (getters.published_articles.length > 0)
    //    articles = getters.published_articles;
    //  else articles = getters.articles;

    //  let article = articles.find(article => article.slug === slug);
    //  if (article) {
    //    commit("SET_COURSE", article);
    //    return;
    //  }

    try {
      let res = await this.$axios.$get(`categories-with-actived-articles`);
      commit("SET_CATEGORIES_WITH_ACTIVED_ARTICLES", res.data);
    } catch (error) {}
  }
};

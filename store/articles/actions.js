export default {
  async getArticles({ commit }) {
    try {
      let res = await this.$axios.$get(`articles`);
      commit("SET_ARTICLES", res.data);
    } catch (error) {}
  },

  async getPublishedArticles({ commit, getters }) {
    let articles = {};
    if (getters.articles.length > 0) {
      articles = getters.articles.filter(function(article) {
        return article.status == true;
      });
      commit("SET_PUBLISHED_ARTICLES", articles);
      return;
    }
    try {
      let res = await this.$axios.$get(`published-articles`);
      commit("SET_PUBLISHED_ARTICLES", res.data);
    } catch (error) {}
  },

  async getFeaturedArticles({ commit, getters }) {
    let articles = {};
    if (getters.published_articles.length > 0) {
      articles = getters.published_articles.filter(function(article) {
        return article.featured == true;
      });
      commit("SET_FEATURED_ARTICLES", articles);
      return;
    }

    if (getters.articles.length > 0) {
      articles = getters.articles.filter(function(article) {
        return article.featured == true;
      });
      commit("SET_FEATURED_ARTICLES", articles);
      return;
    }
    try {
      let res = await this.$axios.$get(`featured-articles`);
      commit("SET_FEATURED_ARTICLES", res.data);
    } catch (error) {}
  },

  async getArticle({ commit, getters }, slug) {
    let articles = {};
    if (getters.featured_articles.length > 0) articles = getters.featured_articles;
    else if (getters.published_articles.length > 0)
      articles = getters.published_articles;
    else articles = getters.articles;

    let article = articles.find(article => article.slug === slug);
    if (article) {
      commit("SET_COURSE", article);
      return;
    }

    try {
      article = await this.$axios.$get(`articles/${slug}`);
      commit("SET_COURSE", article.data);
    } catch (error) {}
  }
};

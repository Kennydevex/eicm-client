export default {
  SET_ARTICLES(state, article) {
    state.articles = article;
  },

  SET_PUBLISHED_ARTICLES(state, article) {
    state.published_articles = article;
  },

  SET_FEATURED_ARTICLES(state, article) {
    state.featured_articles = article;
  },

  SET_ARTICLE(state, article) {
    state.article = article;
  },

  toggleCreateArticleDialog(state) {
    state.create_article_dialog = !state.create_article_dialog;
  },
  create_article_dialog(state, val) {
    state.create_article_dialog = val;
  },

  toggleUpdateArticleDialog(state) {
    state.update_article_dialog = !state.update_article_dialog;
  },
  update_article_dialog(state, val) {
    state.update_article_dialog = val;
  }
}; 

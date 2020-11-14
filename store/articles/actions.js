export default {
  async getArticles({ commit }) {
    try {
      let res = await this.$axios.$get(`articles`);
      commit("SET_ARTICLES", res.data);
    } catch (error) {}
  }
};

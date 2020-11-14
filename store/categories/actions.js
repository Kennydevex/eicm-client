export default {
  async getCategories({ commit }) {
    try {
      let res = await this.$axios.$get(`categories`);
      commit("SET_CATEGORIES", res.data);
    } catch (error) {}
  }
};

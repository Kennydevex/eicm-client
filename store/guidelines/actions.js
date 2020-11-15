export default {
  async getGuidelines({ commit }) {
    try {
      let res = await this.$axios.$get(`guidelines`);
      commit("SET_GUIDELINES", res.data);
    } catch (error) {}
  }
};

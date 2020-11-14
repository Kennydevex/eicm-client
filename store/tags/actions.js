export default {
  async getTags({ commit }) {
    try {
      let res = await this.$axios.$get(`tags`);
      commit("SET_TAGS", res.data);
    } catch (error) {}
  }
};

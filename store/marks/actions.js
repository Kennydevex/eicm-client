export default {
  async getMarks({ commit }) {
    try {
      let res = await this.$axios.$get(`marks`);
      commit("SET_MARKS", res.data);
    } catch (error) {}
  }
};

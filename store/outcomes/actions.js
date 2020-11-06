export default {
  async getOutcomes({ commit }) {
    try {
      let res = await this.$axios.$get(`outcomes`);
      commit("SET_OUTCOMES", res.data);
    } catch (error) {}
  }
};

export default {
  async getPartners({ commit }) {
    try {
      let res = await this.$axios.$get(`partners`);
      commit("SET_PARTNERS", res.data);
    } catch (error) {}
  }
};

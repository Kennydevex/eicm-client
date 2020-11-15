export default {
  async getSchools({ commit }) {
    try {
      let res = await this.$axios.$get(`schools`);
      commit("SET_SCHOOLS", res.data);
    } catch (error) {}
  }
};

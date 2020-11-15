export default {
  async getMurals({ commit }) {
    try {
      let res = await this.$axios.$get(`murals`);
      commit("SET_MURALS", res.data);
    } catch (error) {}
  }
};

export default {
  async getCharges({ commit }) {
    try {
      let res = await this.$axios.$get(`charges`);
      commit("SET_CHARGES", res.data);
    } catch (error) {}
  },
};

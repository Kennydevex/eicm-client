export default {
  async getDepartaments({ commit }) {
    try {
      let res = await this.$axios.$get(`departaments`);
      commit("SET_DEPARTAMENTS", res.data);
    } catch (error) {}
  }
};

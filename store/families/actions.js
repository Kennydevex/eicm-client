export default {
  async getFamilies({ commit }) {
    try {
      let res = await this.$axios.$get(`families`);
      commit("SET_FAMILIES", res.data);
    } catch (error) {}
  }
};

export default {
  async getUsers({ commit }, page) {
    try {
      let res = await this.$axios.$get(`users/?page=${page}`);
      commit("SET_USERS", res.data);
      commit("SET_PAGINATION", res);
    } catch (error) {}
  }
};

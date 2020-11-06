export default {
  async getTeachers({ commit }) {
    try {
      let res = await this.$axios.$get(`teachers`);
      commit("SET_TEACHERS", res.data);
    } catch (error) {}
  },

  async getActivedTeachers({ commit }) {
    try {
      let res = await this.$axios.$get(`actived-teachers`);
      commit("SET_ACTIVED_TEACHERS", res.data);
    } catch (error) {}
  }
};

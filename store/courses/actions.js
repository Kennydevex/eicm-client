export default {
  async getCourses({ commit }) {
    try {
      let res = await this.$axios.$get(`courses`);
      commit("SET_COURSES", res.data);
    } catch (error) {}
  }
};

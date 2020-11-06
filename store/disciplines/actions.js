export default {
  async getDisciplines({ commit }) {
    try {
      let res = await this.$axios.$get(`disciplines`);
      commit("SET_DISCIPLINES", res.data);
    } catch (error) {}
  }
};

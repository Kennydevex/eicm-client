export default {
  async getEmployees({ commit }) {
    try {
      let res = await this.$axios.$get(`employees`);
      commit("SET_EMPLOYEES", res.data);
    } catch (error) {}
  },

  async getPrincipalTeams({ commit }) {
    try {
      let res = await this.$axios.$get(`principal-teams`);
      commit("SET_PRINCIPAL_TEAMS", res.data);
    } catch (error) {}
  }
};

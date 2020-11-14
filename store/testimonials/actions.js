export default {
  async getTestimonials({ commit }) {
    try {
      let res = await this.$axios.$get(`testimonials`);
      commit("SET_TESTIMONIALS", res.data);
    } catch (error) {}
  }
};

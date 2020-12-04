export default {
  async getSliders({ commit }) {
    try {
      let res = await this.$axios.$get(`sliders`);
      commit("SET_SLIDERS", res.data);
    } catch (error) {}
  },

  async getActivedSliders({ commit, getters }) {
    let sliders = {};
    if (getters.sliders.length > 0) {
      sliders = getters.sliders.filter(function(slider) {
        return slider.status == true;
      });
      commit("SET_ACTIVED_SLIDERS", sliders);
      return;
    }
    try {
      let res = await this.$axios.$get(`actived-sliders`);
      commit("SET_ACTIVED_SLIDERS", res.data);
    } catch (error) {}
  }
};

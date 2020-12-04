export default {
  SET_SLIDERS(state, slider) {
    state.sliders = slider;
  },

  SET_ACTIVED_SLIDERS(state, slider) {
    state.actived_sliders = slider;
  },

  toggleCreateSliderDialog(state) {
    state.create_slider_dialog = !state.create_slider_dialog;
  },
  create_slider_dialog(state, val) {
    state.create_slider_dialog = val;
  },

  toggleUpdateSliderDialog(state) {
    state.update_slider_dialog = !state.update_slider_dialog;
  },
  update_slider_dialog(state, val) {
    state.update_slider_dialog = val;
  },

  toggleListSliderDialog(state) {
    state.list_slider_dialog = !state.list_slider_dialog;
  },

  list_slider_dialog(state, val) {
    state.list_slider_dialog = val;
  }
};

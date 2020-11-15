export default {
  SET_GUIDELINES(state, guideline) {
    state.guidelines = guideline;
  },

  toggleCreateGuidelineDialog(state) {
    state.create_guideline_dialog = !state.create_guideline_dialog;
  },

  create_guideline_dialog(state, val) {
    state.create_guideline_dialog = val;
  },

  toggleUpdateGuidelineDialog(state) {
    state.update_guideline_dialog = !state.update_guideline_dialog;
  },

  update_guideline_dialog(state, val) {
    state.update_guideline_dialog = val;
  },

  toggleListGuidelineDialog(state) {
    state.list_guideline_dialog = !state.list_guideline_dialog;
  },

  list_guideline_dialog(state, val) {
    state.list_guideline_dialog = val;
  }
};

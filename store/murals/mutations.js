export default {
  SET_MURALS(state, mural) {
    state.murals = mural;
  },

  toggleCreateMuralDialog(state) {
    state.create_mural_dialog = !state.create_mural_dialog;
  },
  create_mural_dialog(state, val) {
    state.create_mural_dialog = val;
  },

  toggleUpdateMuralDialog(state) {
    state.update_mural_dialog = !state.update_mural_dialog;
  },
  update_mural_dialog(state, val) {
    state.update_mural_dialog = val;
  },

  toggleListMuralDialog(state) {
    state.list_mural_dialog = !state.list_mural_dialog;
  },

  list_mural_dialog(state, val) {
    state.list_mural_dialog = val;
  }
};

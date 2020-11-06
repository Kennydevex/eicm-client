export default {
  SET_FAMILIES(state, family) {
    state.families = family;
  },

  toggleCreateFamilyDialog(state) {
    state.create_family_dialog = !state.create_family_dialog;
  },
  create_family_dialog(state, val) {
    state.create_family_dialog = val;
  },

  toggleUpdateFamilyDialog(state) {
    state.update_family_dialog = !state.update_family_dialog;
  },
  update_family_dialog(state, val) {
    state.update_family_dialog = val;
  }
};

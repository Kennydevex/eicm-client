export default {
  SET_SCHOOLS(state, school) {
    state.schools = school;
  },

  toggleCreateSchoolDialog(state) {
    state.create_school_dialog = !state.create_school_dialog;
  },
  create_school_dialog(state, val) {
    state.create_school_dialog = val;
  },

  toggleUpdateSchoolDialog(state) {
    state.update_school_dialog = !state.update_school_dialog;
  },
  update_school_dialog(state, val) {
    state.update_school_dialog = val;
  }
};

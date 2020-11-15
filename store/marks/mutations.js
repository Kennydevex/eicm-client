export default {
  SET_MARKS(state, mark) {
    state.marks = mark;
  },

  toggleCreateMarkDialog(state) {
    state.create_mark_dialog = !state.create_mark_dialog;
  },
  create_mark_dialog(state, val) {
    state.create_mark_dialog = val;
  },

  toggleUpdateMarkDialog(state) {
    state.update_mark_dialog = !state.update_mark_dialog;
  },
  update_mark_dialog(state, val) {
    state.update_mark_dialog = val;
  },

  toggleListMarkDialog(state) {
    state.list_mark_dialog = !state.list_mark_dialog;
  },

  list_mark_dialog(state, val) {
    state.list_mark_dialog = val;
  }
};

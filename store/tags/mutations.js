export default {
  SET_TAGS(state, tag) {
    state.tags = tag;
  },

  toggleCreateTagDialog(state) {
    state.create_tag_dialog = !state.create_tag_dialog;
  },
  create_tag_dialog(state, val) {
    state.create_tag_dialog = val;
  },

  toggleUpdateTagDialog(state) {
    state.update_tag_dialog = !state.update_tag_dialog;
  },
  update_tag_dialog(state, val) {
    state.update_tag_dialog = val;
  },

  toggleListTagDialog(state) {
    state.list_tag_dialog = !state.list_tag_dialog;
  },

  list_tag_dialog(state, val) {
    state.list_tag_dialog = val;
  }
};

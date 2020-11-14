export default {
  SET_CATEGORIES(state, category) {
    state.categories = category;
  },

  toggleCreateCategoryDialog(state) {
    state.create_category_dialog = !state.create_category_dialog;
  },
  create_category_dialog(state, val) {
    state.create_category_dialog = val;
  },

  toggleUpdateCategoryDialog(state) {
    state.update_category_dialog = !state.update_category_dialog;
  },
  update_category_dialog(state, val) {
    state.update_category_dialog = val;
  },

  toggleListCategoryDialog(state) {
    state.list_category_dialog = !state.list_category_dialog;
  },

  list_category_dialog(state, val) {
    state.list_category_dialog = val;
  }
};

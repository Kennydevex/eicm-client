export default {
  SET_USERS(state, user) {
    state.users = user;
  },

  SET_PAGINATION(state, user) {
    state.pagination = user;
  },

  toggleCreateUserDialog(state) {
    state.create_user_dialog = !state.create_user_dialog;
  },
  create_user_dialog(state, val) {
    state.create_user_dialog = val;
  },

  toggleUpdateUserDialog(state) {
    state.update_user_dialog = !state.update_user_dialog;
  },
  update_user_dialog(state, val) {
    state.update_user_dialog = val;
  }
};

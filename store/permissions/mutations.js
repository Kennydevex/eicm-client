export default {
  SET_PERMISSIONS(state, permission) {
    state.permissions = permission;
  },

  SET_PERMISSION(state, permission) {
    state.permission = permission;
  },

  SET_ROLES(state, role) {
    state.roles = role;
  },

  SET_ROLE(state, role) {
    state.role = role;
  },

  toggleCreatePermissionDialog(state) {
    state.create_permission_dialog = !state.create_permission_dialog;
  },
  create_permission_dialog(state, val) {
    state.create_permission_dialog = val;
  },

  toggleCreateRoleDialog(state) {
    state.create_role_dialog = !state.create_role_dialog;
  },
  create_role_dialog(state, val) {
    state.create_role_dialog = val;
  },

  toggleUpdateRoleDialog(state) {
    state.update_role_dialog = !state.update_role_dialog;
  },
  update_role_dialog(state, val) {
    state.update_role_dialog = val;
  },

  toggleUpdatePermissionDialog(state) {
    state.update_permission_dialog = !state.update_permission_dialog;
  },
  update_permission_dialog(state, val) {
    state.update_permission_dialog = val;
  },

  toggleListPermissionsDialog(state) {
    state.list_permissions_dialog = !state.list_permissions_dialog;
  },
  list_permissions_dialog(state, val) {
    state.list_permissions_dialog = val;
  }
};

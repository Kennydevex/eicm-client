export default {
  async getPermissions({ commit }) {
    try {
      let permissions = await this.$axios.$get("permissions");
      commit("SET_PERMISSIONS", permissions.data);
    } catch (error) {}
  },

  async getPermission({ commit, getters }, id) {
    let permission = getters.permissions.find(
      permission => permission.id === id
    );
    if (permission) {
      commit("SET_PERMISSION", permission);
      return;
    }
    try {
      permission = await this.$axios.$get(`permissions/${id}`);
      commit("SET_PERMISSION", permission);
    } catch (error) {}
  },

  async getRoles({ commit }) {
    try {
      let roles = await this.$axios.$get("roles");
      commit("SET_ROLES", roles.data);
    } catch (error) {}
  },

  async getRole({ commit, getters }, id) {
    let role = getters.roles.find(role => role.id === id);
    if (role) {
      commit("SET_ROLE", role);
      return;
    }
    try {
      role = await this.$axios.$get(`roles/${id}`);
      commit("SET_ROLE", role);
    } catch (error) {}
  }
};

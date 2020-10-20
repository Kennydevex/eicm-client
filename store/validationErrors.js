export const state = () => ({
  backend_form_errors: {},
  auth_401_errors: ""
});

export const getters = {
  backend_form_errors(state) {
    return state.backend_form_errors;
  },

  auth_401_errors(state) {
    return state.auth_401_errors;
  }
};

export const mutations = {
  SET_VALIDATION_ERRORS(state, backend_form_errors) {
    state.backend_form_errors = backend_form_errors;
  },

  SET_AUTH_401_ERRORS(state, auth_401_errors) {
    state.auth_401_errors = auth_401_errors;
  }
};

export const actions = {
  async setFormErrors({ commit }, backend_form_errors) {
    commit("SET_VALIDATION_ERRORS", backend_form_errors);
  },

  async clearFormErrors({ commit }) {
    commit("SET_VALIDATION_ERRORS", {});
  },
  async setAuth401Errors({ commit }, auth_401_errors) {
    commit("SET_AUTH_401_ERRORS", auth_401_errors);
  },

  async clearAuth401Errors({ commit }) {
    commit("SET_AUTH_401_ERRORS", "");
  }
};

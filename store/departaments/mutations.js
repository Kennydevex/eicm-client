export default {
  SET_DEPARTAMENTS(state, departament) {
    state.departaments = departament;
  },

  toggleCreateDepartamentDialog(state) {
    state.create_departament_dialog = !state.create_departament_dialog;
  },
  create_departament_dialog(state, val) {
    state.create_departament_dialog = val;
  },

  toggleUpdateDepartamentDialog(state) {
    state.update_departament_dialog = !state.update_departament_dialog;
  },
  update_departament_dialog(state, val) {
    state.update_departament_dialog = val;
  },

  toggleListDepartamentDialog(state) {
    state.list_departament_dialog = !state.list_departament_dialog;
  },

  list_departament_dialog(state, val) {
    state.list_departament_dialog = val;
  }
};

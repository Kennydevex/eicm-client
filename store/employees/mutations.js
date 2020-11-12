export default {
  SET_EMPLOYEES(state, employee) {
    state.employees = employee;
  },

  SET_PRINCIPAL_TEAMS(state, team) {
    state.principal_teams = team;
  },

  toggleCreateEmployeeDialog(state) {
    state.create_employee_dialog = !state.create_employee_dialog;
  },
  create_employee_dialog(state, val) {
    state.create_employee_dialog = val;
  },

  toggleUpdateEmployeeDialog(state) {
    state.update_employee_dialog = !state.update_employee_dialog;
  },
  update_employee_dialog(state, val) {
    state.update_employee_dialog = val;
  }
};

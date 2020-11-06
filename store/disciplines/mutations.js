export default {
  SET_DISCIPLINES(state, discipline) {
    state.disciplines = discipline;
  },

  toggleCreateDisciplineDialog(state) {
    state.create_discipline_dialog = !state.create_discipline_dialog;
  },
  create_discipline_dialog(state, val) {
    state.create_discipline_dialog = val;
  },

  toggleUpdateDisciplineDialog(state) {
    state.update_discipline_dialog = !state.update_discipline_dialog;
  },
  update_discipline_dialog(state, val) {
    state.update_discipline_dialog = val;
  }
};

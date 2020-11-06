export default {
  SET_OUTCOMES(state, outcome) {
    state.outcomes = outcome;
  },

  toggleCreateOutcomeDialog(state) {
    state.create_outcome_dialog = !state.create_outcome_dialog;
  },
  create_outcome_dialog(state, val) {
    state.create_outcome_dialog = val;
  },

  toggleUpdateOutcomeDialog(state) {
    state.update_outcome_dialog = !state.update_outcome_dialog;
  },
  update_outcome_dialog(state, val) {
    state.update_outcome_dialog = val;
  }
};

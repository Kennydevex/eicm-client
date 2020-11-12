export default {
  SET_CHARGES(state, charge) {
    state.charges = charge;
  },

  toggleCreateChargeDialog(state) {
    state.create_charge_dialog = !state.create_charge_dialog;
  },

  create_charge_dialog(state, val) {
    state.create_charge_dialog = val;
  },

  toggleUpdateChargeDialog(state) {
    state.update_charge_dialog = !state.update_charge_dialog;
  },

  update_charge_dialog(state, val) {
    state.update_charge_dialog = val;
  },

  toggleListChargeDialog(state) {
    state.list_charge_dialog = !state.list_charge_dialog;
  },

  list_charge_dialog(state, val) {
    state.list_charge_dialog = val;
  }
};

export default {
  SET_PARTNERS(state, partner) {
    state.partners = partner;
  },

  toggleCreatePartnerDialog(state) {
    state.create_partner_dialog = !state.create_partner_dialog;
  },
  create_partner_dialog(state, val) {
    state.create_partner_dialog = val;
  },

  toggleUpdatePartnerDialog(state) {
    state.update_partner_dialog = !state.update_partner_dialog;
  },
  update_partner_dialog(state, val) {
    state.update_partner_dialog = val;
  },

  toggleListPartnerDialog(state) {
    state.list_partner_dialog = !state.list_partner_dialog;
  },

  list_partner_dialog(state, val) {
    state.list_partner_dialog = val;
  }
};

export default {
  SET_TESTIMONIALS(state, testimonial) {
    state.testimonials = testimonial;
  },

  toggleCreateTestimonialDialog(state) {
    state.create_testimonial_dialog = !state.create_testimonial_dialog;
  },
  create_testimonial_dialog(state, val) {
    state.create_testimonial_dialog = val;
  },

  toggleUpdateTestimonialDialog(state) {
    state.update_testimonial_dialog = !state.update_testimonial_dialog;
  },
  update_testimonial_dialog(state, val) {
    state.update_testimonial_dialog = val;
  },

  toggleListTestimonialDialog(state) {
    state.list_testimonial_dialog = !state.list_testimonial_dialog;
  },

  list_testimonial_dialog(state, val) {
    state.list_testimonial_dialog = val;
  }
};

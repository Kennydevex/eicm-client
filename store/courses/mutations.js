export default {
  SET_COURSES(state, course) {
    state.courses = course;
  },

  toggleCreateCourseDialog(state) {
    state.create_course_dialog = !state.create_course_dialog;
  },
  create_course_dialog(state, val) {
    state.create_course_dialog = val;
  },

  toggleUpdateCourseDialog(state) {
    state.update_course_dialog = !state.update_course_dialog;
  },
  update_course_dialog(state, val) {
    state.update_course_dialog = val;
  }
};

export default {
  SET_COURSES(state, course) {
    state.courses = course;
  },

  SET_COURSES_BY_TYPE(state, course) {
    state.courses_by_type = course;
  },

  SET_ACTIVED_COURSES(state, course) {
    state.actived_courses = course;
  },

  SET_FEATURED_COURSES(state, course) {
    state.featured_courses = course;
  },

  SET_COURSE(state, course) {
    state.course = course;
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

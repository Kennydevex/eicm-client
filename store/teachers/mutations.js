export default {
  SET_TEACHERS(state, teacher) {
    state.teachers = teacher;
  },

  SET_ACTIVED_TEACHERS(state, teacher) {
    state.actived_teachers = teacher;
  },

  toggleCreateTeacherDialog(state) {
    state.create_teacher_dialog = !state.create_teacher_dialog;
  },
  create_teacher_dialog(state, val) {
    state.create_teacher_dialog = val;
  },

  toggleUpdateTeacherDialog(state) {
    state.update_teacher_dialog = !state.update_teacher_dialog;
  },
  update_teacher_dialog(state, val) {
    state.update_teacher_dialog = val;
  }
};

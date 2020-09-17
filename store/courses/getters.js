export default {
  courses(state) {
    return state.courses;
  },

  course: state => slug => {
    return state.courses.find(course => course.slug === slug);
  },

  // course(state, {slug}){
  //   return state.courses.find(course => course.slug === slug);
  // },

  featured_courses(state) {
    return state.courses.filter(function(course) {
      return course.featured == true;
    });
  }
};

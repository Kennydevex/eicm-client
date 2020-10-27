export default {
  users(state) {
    return state.users;
  },

  pagination(state) {
    return state.pagination;
  },

  // course: state => slug => {
  //   return state.users.find(course => course.slug === slug);
  // },

  // course(state, {slug}){
  //   return state.users.find(course => course.slug === slug);
  // },

  // featured_users(state) {
  //   return state.users.filter(function(course) {
  //     return course.featured == true;
  //   });
  // }
};

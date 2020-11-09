export default {
  async getCourses({ commit }) {
    try {
      let res = await this.$axios.$get(`courses`);
      commit("SET_COURSES", res.data);
    } catch (error) {}
  },

  async getActivedCourses({ commit, getters }) {
    let courses = {};
    if (getters.courses.length > 0) {
      courses = getters.courses.filter(function(course) {
        return course.status == true;
      });
      commit("SET_ACTIVED_COURSES", courses);
      return;
    }
    try {
      let res = await this.$axios.$get(`actived-courses`);
      commit("SET_ACTIVED_COURSES", res.data);
    } catch (error) {}
  },

  async getFeaturedCourses({ commit, getters }) {
    let courses = {};
    if (getters.actived_courses.length > 0) {
      courses = getters.actived_courses.filter(function(course) {
        return course.featured == true;
      });
      commit("SET_FEATURED_COURSES", courses);
      return;
    }

    if (getters.courses.length > 0) {
      courses = getters.courses.filter(function(course) {
        return course.featured == true;
      });
      commit("SET_FEATURED_COURSES", courses);
      return;
    }
    try {
      let res = await this.$axios.$get(`featured-courses`);
      commit("SET_FEATURED_COURSES", res.data);
    } catch (error) {}
  },

  async getCourse({ commit, getters }, slug) {
    let courses = {};
    if (getters.featured_courses.length > 0) courses = getters.featured_courses;
    else if (getters.actived_courses.length > 0)
      courses = getters.actived_courses;
    else courses = getters.courses;

    let course = courses.find(course => course.slug === slug);
    if (course) {
      commit("SET_COURSE", course);
      return;
    }

    try {
      course = await this.$axios.$get(`courses/${slug}`);
      commit("SET_COURSE", course.data);
    } catch (error) {}
  }
};

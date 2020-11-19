<template>
  <div class="bg-gray-200 w-full py-12 justify-center">
    <div class=" container px-3 mx-auto">
      <Row type="flex">
        <Col span="24" class="mb-10">
          <base-home-section-title>Cursos em distaques</base-home-section-title>
        </Col>

        <Col
          v-for="(course, c) in featured_courses"
          :key="c"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="8"
        >
          <base-course-card :course="course" />
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "HomeFeaturedCourses",

  computed: {
    ...mapGetters({
      featured_courses: "courses/featured_courses"
    })
  },

  methods: {}
};
</script>

<style scoped>
.section-title {
  display: inline-block;
  position: relative;
}
.section-title:after {
  background: none repeat scroll 0 0 transparent;
  bottom: 0;
  content: "";
  display: block;
  height: 4px;
  left: 0;
  position: absolute;
  background: rgb(12, 1, 1);
  transition: width 0.3s ease 0s, left 0.3s ease 0s;
  width: 100%;
}
.section-title:hover:after {
  width: 100%;
  left: 0;
}
</style>

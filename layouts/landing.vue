<template>
  <div>
    <!-- ============================================================== -->
    <div>
      <coreLandingAppNavBar />
    </div>
    <!-- ============================================================== -->
    <div class="w-full">
      <Nuxt />
    </div>
    <!-- ============================================================== -->
    <div>
      <coreLandingPageFooter />
      <coreAppFooter />
    </div>
    <!-- ============================================================== -->
  </div>
</template>

<script>
export default {
  async created() {
    this.spinLoad = true;
    await this.$store.dispatch("schools/getSchools");
    await this.$store.dispatch("courses/getFeaturedCourses");
    await this.$store.dispatch("courses/getActivedCourses");
    await this.$store.dispatch("courses/getCoursesByType", 1);
    await this.$store.dispatch("employees/getPrincipalTeams");
    await this.$store.dispatch("partners/getPartners");
    await this.$store.dispatch("testimonials/getTestimonials");
    await this.$store.dispatch("sliders/getActivedSliders");
    this.spinLoad = false;
  },

  data() {
    return { spinLoad: false };
  }
};
</script>

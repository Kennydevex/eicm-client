<template>
  <div>
    <!-- ============================================================== -->
    <div>
      <NavBar />
    </div>
    <!-- ============================================================== -->
    <div class="w-full">
      <Nuxt />
    </div>
    <!-- ============================================================== -->
    <div>
      <AppFooter />
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
  components: {
    NavBar: () => import("@/components/app/frontend/AppNavBar"),
    AppFooter: () => import("@/components/app/frontend/AppFooter")
  },

  data() {
    return { spinLoad: false };
  }
};
</script>

<template>
  <div class="antialiased text-gray-900 bg-gray-200 layout">
    <template v-if="spinLoad">
      <Spinner />
    </template>

    <template v-else>
      <div>
        <NavBar></NavBar>
      </div>

      <div>
        <Content>
          <div class="w-full">
            <Nuxt />
          </div>
        </Content>
        <AppFooter></AppFooter>
      </div>
    </template> 
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
    NavBar: () => import("@/components/frontend/AppNavBar"),
    AppFooter: () => import("@/components/frontend/AppFooter"),
    Spinner: () => import("@/components/common/Spinner")
  },

  data() {
    return { spinLoad: false };
  }
};
</script>

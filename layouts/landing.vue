<template>
  <div class="layout antialiased text-gray-900 bg-gray-200">
    <div>
      <NavBar></NavBar>
    </div>

    <div>
      <Content>
        <div>
          <Nuxt />
        </div>
      </Content>
      <AppFooter></AppFooter>
    </div>
  </div>
</template>

<script>
export default {
  async created() {
    this.spinLoad = true;
    await this.$store.dispatch("courses/getFeaturedCourses");
    await this.$store.dispatch("courses/getActivedCourses");
    await this.$store.dispatch("courses/getCoursesByType", 1);
    await this.$store.dispatch("employees/getPrincipalTeams");
    await this.$store.dispatch("partners/getPartners");
    await this.$store.dispatch("testimonials/getTestimonials");
    this.spinLoad = false;
  },
  components: {
    NavBar: () => import("@/components/frontend/AppNavBar"),
    AppFooter: () => import("@/components/frontend/AppFooter")
  },

  data() {
    return { spinLoad: false };
  }
};
</script>

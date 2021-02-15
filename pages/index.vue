<template>
  <div>
    <appLandingCarousel v-if="sliders.length > 0" :sliders="sliders" />
    <appLandingSchoolBanner />
    <appLandingSchoolSlogan />
    <appLandingTeams v-if="teams.length > 0" :teams="teams" />
    <appLandingCourses
      v-if="featured_courses.length > 0"
      :featuredCourses="featured_courses"
    />

    <appLandingArticles
      v-if="featured_articles.length > 0"
      :articles="featured_articles"
    />

    <appLandingPartners v-if="partners.length > 0" :partners="partners" />
    <appLandingTestimonials
      v-if="testimonials.length > 0"
      :testimonials="testimonials"
    />

    <appLandingContact/>

  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HomePage",
  layout: "landing",

  async created() {
    await this.$store.dispatch("articles/getFeaturedArticles");
  },

  computed: {
    ...mapGetters({
      featured_articles: "articles/featured_articles",
      featured_courses: "courses/featured_courses",
      courses: "courses/courses_by_type",
      partners: "partners/partners",
      testimonials: "testimonials/testimonials",
      sliders: "sliders/actived_sliders",
      teams: "employees/principal_teams"
    })
  }
};
</script>

<style lang="scss" scoped></style>

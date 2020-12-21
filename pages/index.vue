<template>
  <div>
    <HomeCarousel :sliders="sliders" />
    <HomeSchoolBanner />
    <HomeSchoolSlogan />
    <HomeSchoolTeam v-if="teams.length > 0" :teams="teams" />
    <HomeFeaturedCourses
      v-if="featured_courses.length > 0"
      :featuredCourses="featured_courses"
    />
    <HomeFeaturedArticles
      v-if="featured_articles.length > 0"
      :articles="featured_articles"
    />
    <HomePartners v-if="partners.length > 0" :partners="partners" />
    <HomeTestimonials
      v-if="testimonials.length > 0"
      :testimonials="testimonials"
    />
    <HomeContacts />
    <home-footer></home-footer>
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
  },

  components: {
    HomeCarousel: () => import("@/components/frontend/sections/HomeCarousel"),
    HomeTeams: () => import("@/components/frontend/sections/HomeTeams"),
    HomeSchoolBanner: () =>
      import("@/components/frontend/sections/HomeSchoolBanner"),
    HomeSchoolSlogan: () =>
      import("@/components/frontend/sections/HomeSchoolSlogan"),
    HomeSchoolTeam: () =>
      import("@/components/frontend/sections/HomeSchoolTeam"),
    HomeFeaturedCourses: () =>
      import("@/components/frontend/sections/HomeFeaturedCourses"),
    HomeFeaturedArticles: () =>
      import("@/components/frontend/sections/HomeFeaturedArticles"),
    HomePartners: () => import("@/components/frontend/sections/HomePartners"),
    HomeContacts: () => import("@/components/frontend/sections/HomeContacts"),
    HomeFooter: () => import("@/components/frontend/sections/HomeFooter"),
    PrincipalFooter: () =>
      import("@/components/frontend/sections/PrincipalFooter")
  }
};
</script>

<style lang="scss" scoped></style>

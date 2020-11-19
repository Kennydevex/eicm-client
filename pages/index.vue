<template>
  <Layout>
    <HomeCarousel />
    <HomeSchoolBanner />
    <HomeFeaturedCourses />
    <HomeFeaturedArticles :articles="featured_articles" />
    <home-footer></home-footer>
    <!-- <HomeGuidelines />
    <principal-footer></principal-footer>
    <HomeTeams />

    <HomeStudentsBanner />
   -->
  </Layout>
</template>

<script>
import HomeCarousel from "@/components/frontend/sections/HomeCarousel";
import HomeTeams from "@/components/frontend/sections/HomeTeams";
import HomeSchoolBanner from "@/components/frontend/sections/HomeSchoolBanner";
import HomeFeaturedCourses from "@/components/frontend/sections/HomeFeaturedCourses";
import HomeFeaturedArticles from "@/components/frontend/sections/HomeFeaturedArticles";
import HomeFooter from "@/components/frontend/sections/HomeFooter";
import PrincipalFooter from "@/components/frontend/sections/PrincipalFooter";
import { mapGetters } from "vuex";

export default {
  name: "HomePage",
  layout: "landing",

  async created() {
    await this.$store.dispatch("articles/getFeaturedArticles");
  },

   computed: {
    ...mapGetters({
      featured_articles: "articles/featured_articles"
    })
  },

  components: {
    HomeCarousel,
    HomeTeams,
    HomeSchoolBanner,
    HomeFeaturedCourses,
    HomeFeaturedArticles,
    HomeFooter,
    PrincipalFooter
  }
};
</script>

<style lang="scss" scoped></style>

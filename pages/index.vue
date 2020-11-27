<template>
  <Layout>
    <HomeCarousel />
    <HomeSchoolBanner />
    <HomeSchoolSlogan />
    <HomeSchoolTeam />
    <HomeFeaturedCourses />
    <HomeFeaturedArticles :articles="featured_articles" />
    <HomePartners />
    <HomeTestimonials />
    <HomeContacts />
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
import HomePartners from "@/components/frontend/sections/HomePartners";
import HomeTeams from "@/components/frontend/sections/HomeTeams";
import HomeSchoolBanner from "@/components/frontend/sections/HomeSchoolBanner";
import HomeSchoolSlogan from "@/components/frontend/sections/HomeSchoolSlogan";
import HomeSchoolTeam from "@/components/frontend/sections/HomeSchoolTeam";
import HomeFeaturedCourses from "@/components/frontend/sections/HomeFeaturedCourses";
import HomeFeaturedArticles from "@/components/frontend/sections/HomeFeaturedArticles";
import HomeTestimonials from "@/components/frontend/sections/HomeTestimonials";
import HomeContacts from "@/components/frontend/sections/HomeContacts";
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
    HomeSchoolSlogan,
    HomeSchoolTeam,
    HomeFeaturedCourses,
    HomeFeaturedArticles,
    HomePartners,
    HomeContacts,
    HomeFooter,
    PrincipalFooter
  }
};
</script>

<style lang="scss" scoped></style>

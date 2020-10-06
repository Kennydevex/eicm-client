<template>
  <Layout>
    <HomeCarousel />
    <HomeSchoolBanner />
    <HomeFeaturedCourses />
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
import HomeFooter from "@/components/frontend/sections/HomeFooter";
import PrincipalFooter from "@/components/frontend/sections/PrincipalFooter";
export default {
  name: "HomePage",
  layout: "landing",

  components: {
    HomeCarousel,
    HomeTeams,
    HomeSchoolBanner,
    HomeFeaturedCourses,
    HomeFooter,
    PrincipalFooter
  }
};
</script>

<style lang="scss" scoped></style>

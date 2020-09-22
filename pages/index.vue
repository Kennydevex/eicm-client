<template>
  <Layout>
    <HomeCarousel />
    <HomeSchoolBanner />
    <HomeFeaturedCourses />
    <principal-footer></principal-footer>
    <!-- <HomeGuidelines />
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
import PrincipalFooter from "@/components/frontend/sections/PrincipalFooter";
export default {
  name: "HomePage",
  layout: "landing",

  components: {
    HomeCarousel,
    HomeTeams,
    HomeSchoolBanner,
    HomeFeaturedCourses,
    PrincipalFooter
  }
};
</script>

<style lang="scss" scoped></style>

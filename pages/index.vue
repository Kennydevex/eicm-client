<template>
  <Layout>
    <HomeCarousel />
    <HomeSchoolBanner />
    <HomeFeaturedCourses />
    <PrincipalFooter />
    <!-- <HomeGuidelines />
    <HomeTeams />

    <HomeStudentsBanner />
   -->
  </Layout>
</template>

<script>
import HomeCarousel from "@/views/sections/HomeCarousel";
import HomeTeams from "@/views/sections/HomeTeams";
import HomeSchoolBanner from "@/views/sections/HomeSchoolBanner";
import HomeFeaturedCourses from "@/views/sections/HomeFeaturedCourses";
import PrincipalFooter from "@/views/sections/PrincipalFooter";
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

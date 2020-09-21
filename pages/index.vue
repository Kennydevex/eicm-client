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
export default {
  name: "HomePage",
  layout: "landing",

  components: {
    HomeCarousel: () => import("@/views/sections/HomeCarousel"),
    HomeTeams: () => import("@/views/sections/HomeTeams"),
    HomeSchoolBanner: () => import("@/views/sections/HomeSchoolBanner"),
    HomeFeaturedCourses: () => import("@/views/sections/HomeFeaturedCourses"),
    PrincipalFooter: () => import("@/views/sections/PrincipalFooter")
  }
};
</script>

<style lang="scss" scoped></style>

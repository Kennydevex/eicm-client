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
  components: {
    NavBar: () => import("@/components/frontend/AppNavBar"),
    AppFooter: () => import("@/components/frontend/AppFooter")
  }
};
</script>

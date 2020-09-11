<template>
  <div class="layout">
    <div>
      <AppHeader></AppHeader>
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
    AppHeader: () => import("@/components/frontend/AppHeader"),
    AppFooter: () => import("@/components/frontend/AppFooter")
  }
};
</script>

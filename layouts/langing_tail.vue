<template>
  <div class="container mx-auto">
    <AppHeader />
  </div>
  
</template>

<script>
export default {
  components: {
    AppHeader: () => import("@/components/frontend/AppHeader")
  }
};
</script>

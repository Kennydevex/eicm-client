<template>
  <section class="app-main">
    <!--<div>
          <coreBreadcrumb class="breadcrumb-container" />
        </div>-->
    <transition name="fade-transform" mode="out-in">
      <Nuxt :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: "Main",
  computed: {
    key() {
      return this.$route.path;
    }
  }
};
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  top: 50px;
}
.fixed-header + .app-main {
  padding: 15px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>

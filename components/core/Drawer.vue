<template>
  <div :class="{ 'has-logo': showLogo }">
    <!--Depois podemos tirar esta parate caso o problema de apresentação de texto não seja resolvido-->
    <!--<coreLogo v-if="showLogo" :collapse="isCollapse" />-->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeRoute"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
        router
      >
        <coreSidebarItem
          v-for="route in routes"
          :key="route.key"
          :item="route"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import variables from "@/assets/styles/variables.scss";
export default {
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      return this.$router.options.routes;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
    activeRoute() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    }
  },
  methods: {}
};
</script>

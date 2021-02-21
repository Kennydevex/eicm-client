const WIDTH = 992;

export default {
  watch: {
    $route(route) {
      if (this.device === "mobile" && this.sidebar.opened) {
        this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
      }
    }
  },
  beforeMount() {
    window.addEventListener("resize", this.$_resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.$_resizeHandler);
  },
  mounted() {
    const isMobile = this.$_isMobile();
    if (isMobile) {
      this.$store.dispatch("app/toggleDevice", "mobile");
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: true });
    }
  },
  methods: {
    $_isMobile() {
      if (process.client) {
        const rect = window.innerWidth;
        return rect - 1 < WIDTH;
      }
    },
    $_resizeHandler() {
      const isMobile = this.$_isMobile();
      this.$store.dispatch("app/toggleDevice", isMobile ? "mobile" : "desktop");

      if (isMobile) {
        this.$store.dispatch("app/closeSideBar", { withoutAnimation: true });
      }
    }
  }
};

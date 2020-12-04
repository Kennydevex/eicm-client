<template>
  <div>
    <Row>
      <Col span="24">
        <Row>
          <Col span="24">
            <Button type="primary" @click.stop="onCreateSlider()"
              >Criar Slider</Button
            >
          </Col>

          <Col span="24" class="mt-5">
            Sliders
          </Col>
        </Row>

        <create-slider></create-slider>
        <update-slider></update-slider>
      </Col>
    </Row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SliderPage",
  layout: "admin",

  async fetch({ store }) {
    await store.dispatch("sliders/getSliders");
  },

  data() {
    return {
      sending: {},
      on_load_data_to_update: {}
    };
  },

  created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_SLIDERS_DATA", () => {
        this.getSliders();
      });
    }
  },

  computed: {
    ...mapGetters({
      sliders: "sliders/sliders"
    })
  },

  methods: {
    async getSliders() {
      await this.$store.dispatch("sliders/getSliders");
    },
    async onCreateSlider() {
      this.creating_slider = true;
      await this.loadExtraData();
      this.handleModal("sliders/toggleCreateSliderDialog");
      this.creating_slider = false;
    },

    async onUpdateSlider(id) {
      this.$set(this.on_load_data_to_update, id, true);
      await this.loadExtraData();
      await this.onUpdateData(
        id,
        "sliders",
        "APP_ON_UPDATE_SLIDER",
        "sliders/toggleUpdateSliderDialog"
      );
      this.$set(this.on_load_data_to_update, id, false);
    },

    async loadExtraData() {
      await this.$store.dispatch("articles/getFeaturedArticles");
      await this.$store.dispatch("courses/getFeaturedCourses");
    }
  },

  components: {
    CreateSlider: () => import("@/components/backend/sliders/CreateSlider"),
    UpdateSlider: () => import("@/components/backend/sliders/UpdateSlider")
  }
};
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <Row>
      <Col span="24" class="mt-5">
        <Row>
          <Col span="24">
            <Button
              :loading="creating_slider"
              type="primary"
              @click.stop="onCreateSlider()"
            >
              <span v-if="!creating_slider">Criar Novo Slider</span>
              <span v-else>Solicitando...</span>
            </Button>
          </Col>
        </Row>
        <Divider></Divider>

        <Row type="flex" :gutter="16">
          <Col
            class="my-3"
            v-for="slider in sliders"
            :key="slider.id"
            span="24"
            :sm="12"
            :md="8"
            :lg="6"
          >
            <slider-card
              @onUpdate="onUpdateSlider(slider.id)"
              @onDelete="onDelete('sliders', slider.id, 'APP_UPDATE_SLIDERS_DATA')"
              @onSliderActivation="
                toggleStatus(
                  'sliders/slider-activation', 
                  slider.id,
                  slider.status,
                  'Slider',
                  'APP_UPDATE_SLIDERS_DATA'
                )
              "
              :slider="slider"
              :updating="on_load_data_to_update"
              :deleting="deleting"
              :activating="loadAtivaction"
            ></slider-card>
          </Col>
        </Row>

        <create-slider></create-slider>
        <update-slider></update-slider>
      </Col>
    </Row>
  </div>
</template>

<script>
import { handleActivations, deleteDatas } from "@/mixins/appRequest";
import { mapGetters } from "vuex";
import { requests } from "@/mixins/appRequest";
export default {
  name: "SliderPage",
  layout: "admin",

  mixins: [handleActivations, deleteDatas, requests],

  async fetch({ store }) {
    await store.dispatch("sliders/getSliders");
  },

  data() {
    return {
      sending: {},
      creating_slider: false,
      on_load_data_to_update: {},
      on_delete_data: {},
      selected: []
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

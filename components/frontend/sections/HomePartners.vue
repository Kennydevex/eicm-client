<template>
  <div class="bg-gray-200 w-full py-12 justify-center">
    <div class=" container px-3 mx-auto">
      <Row type="flex" :gutter="16">
        <Col span="24" class="mb-5">
          <base-home-section-title>Parceiros</base-home-section-title>
        </Col>

        <Col span="24" class="mt-3">
          <div data-aos="fade-right">
            <vueper-slides
              autoplay
              fade
              :infinite="true"
              :bullets="false"
              :arrows="false"
              class="no-shadow mx-5"
              :visible-slides="4"
              fixed-height="210px"
              slide-multiple
              :gap="3"
              :slide-ratio="1 / 4"
              :dragging-distance="200"
              :breakpoints="breakpoints"
            >
              <template>
                <vueper-slide v-for="partner in partners" :key="partner.id">
                  <template v-slot:content>
                    <div class="flex justify-center items-center">
                      <base-partner-card :partner="partner" />
                    </div>
                  </template>
                </vueper-slide>
              </template>
            </vueper-slides>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
  name: "HomeFeaturedCourses",

  props: {
    partners: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      pauseOnHover: true,
      internalAutoPlaying: true,
      breakpoints: {
        1200: {
          slideRatio: 1 / 5,
          arrows: false,
          bulletsOutside: false,
          visibleSlides: 2,
          slideMultiple: 2
        },
        900: {
          slideRatio: 1 / 3,
          arrows: false,
          bulletsOutside: false,
          visibleSlides: 1,
          slideMultiple: 1
        },
        600: {
          slideRatio: 1 / 2,
          arrows: false,
          bulletsOutside: false,
          visibleSlides: 1,
          slideMultiple: 1
        },
        // The order you list breakpoints does not matter, Vueper Slides will sort them for you.
        1100: {
          slideRatio: 1 / 4,
          arrows: false,
          bulletsOutside: false,
          visibleSlides: 2,
          slideMultiple: 2
        }
      }
    };
  },
  components: {
    VueperSlides,
    VueperSlide
  }
};
</script>

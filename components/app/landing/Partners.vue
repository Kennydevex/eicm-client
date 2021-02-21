<template>
  <div class="justify-center w-full py-5 bg-gray-100">
    <div class="container px-3 mx-auto ">
      <el-row>
        <el-col :span="24" class="mb-5">
          <base-section-title>Parceiros</base-section-title>
        </el-col>

        <el-col :span="24" class="mt-3">
          <div data-aos="fade-right">
            <vueper-slides
              autoplay
              fade
              :infinite="true"
              :bullets="false"
              :arrows="false"
              class="mx-5 no-shadow"
              :visible-slides="4"
              fixed-height="220px"
              slide-multiple
              :gap="3"
              :slide-ratio="1 / 4"
              :dragging-distance="200"
              :breakpoints="breakpoints"
            >
              <template>
                <vueper-slide v-for="partner in partners" :key="partner.id">
                  <template v-slot:content>
                    <div class="flex items-center justify-center">
                      <base-partner-card :partner="partner" />
                    </div>
                  </template>
                </vueper-slide>
              </template>
            </vueper-slides>
          </div>
        </el-col>
      </el-row>
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

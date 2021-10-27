<template>
  <div class="justify-center w-full py-12 pb-8 bg-white">
    <div class="container px-3 m-auto ">
      <el-row :gutter="16">
        <el-col :span="24" class="mb-10">
          <base-section-title>Equipa</base-section-title>
        </el-col>

        <el-col :span="24" class="mt-8">
          <div data-aos="fade">
            <vueper-slides
              autoplay
              fade
              :infinite="true"
              :bullets="true"
              class="mx-5 no-shadow"
              :visible-slides="3"
              fixed-height="300px"
              slide-multiple
              :gap="3"
              :slide-ratio="1 / 4"
              :dragging-distance="200"
              :breakpoints="breakpoints"
            >
              <template v-if="teams.length != 0">
                <vueper-slide v-for="team in teams" :key="team.id">
                  <template v-slot:content>
                    <div class="flex items-start justify-center">
                      <base-team-card :team="team" />
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
  name: "HomeTeams",
  props: {
    teams: {
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
          visibleSlides: 3,
          arrows: false,
          bullets: false,
          slideMultiple: 2
        },
        900: {
          slideRatio: 1 / 3,
          visibleSlides: 1,
          arrows: false,
          bullets: false,
          slideMultiple: 1
        },
        600: {
          slideRatio: 1 / 2,
          arrows: false,
          bullets: false,
          visibleSlides: 1,
          slideMultiple: 1
        }
        // The order you list breakpoints does not matter, Vueper Slides will sort them for you.
      }
    };
  },
  components: {
    VueperSlides,
    VueperSlide
  }
};
</script>

<style scoped></style>

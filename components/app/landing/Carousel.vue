<template>
  <div>
    <client-only>
      <vueper-slides
        class="no-shadow"
        :slide-ratio="1 / 2"
        fixed-height="500px"
        lazy
        lazy-load-on-drag
        fade
        ref="myVueperSlides"
        autoplay
        @image-loaded="lazy_progress = false"
        :pause-on-hover="pauseOnHover"
        @autoplay-pause="internalAutoPlaying = false"
        @autoplay-resume="internalAutoPlaying = true"
      >
        <vueper-slide
          v-for="slider in sliders"
          :key="slider.id"
          :image="
            `${publicURL}/uploads/sliders/background/${slider.background}`
          "
        >
          <template v-if="!lazy_progress" v-slot:content>
            <div
              class=" w-full h-full transition duration-500 ease-in-out group"
            >
              <div class="container z-10 h-full m-auto">
                <div class="flex flex-col justify-center w-full h-full">
                  <div class="bg-black opacity-40 transition duration-500 ease-in-out group-hover:opacity-75 w-2/3 sm:w-2/4 p-5 rounded-md">
                    <div
                      class="font-sans text-xl font-medium leading-snug tracking-widest text-white uppercase transition duration-500 ease-in-out transform md:text-2xl group-hover:text-md group-hover:-translate-y-1"
                    >
                      <span>{{ slider.title }}</span>
                      <div
                        class=" mt-2 border-b-2 md:mt-2 "
                        :style="{ borderColor: slider.color }"
                      ></div>
                    </div>

                    <div
                      class=" mt-5 text-sm leading-relaxed tracking-wider text-gray-200 transition duration-500 ease-in-out transform sm:text-lg group-hover:text-gray-300 group-hover:translate-x-2"
                    >
                      {{ slider.description | truncate(150) }}
                    </div>

                    <div class="flex items-end justify-start mt-5 mb-2">
                      <nuxt-link
                        :style="{
                          borderColor: slider.color,
                          color: slider.color
                        }"
                        class="w-32 px-4 py-2 text-sm text-center truncate transition duration-500 ease-in-out transform bg-white border-b-8 rounded-md shadow-md hover:shadow-xl focus:outline-none hover:translate-x-1"
                        :to="{
                          name:
                            slider.type == 1
                              ? 'courses-ver-slug'
                              : 'blog-ler-slug',
                          params: { slug: slider.link }
                        }"
                      >
                        {{
                          slider.btn_text ? slider.btn_text : "Ler mais"
                        }}</nuxt-link
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-if="lazy_progress" v-slot:loader>
            <div>Loading</div>
          </template>
        </vueper-slide>
        <template v-slot:pause>
          <fa class="text-primary" icon="pause" />
        </template>
      </vueper-slides>
    </client-only>
  </div>
</template>
<script>
import { VueperSlides, VueperSlide } from "vueperslides";
// import { mapGetters } from "vuex";

import "vueperslides/dist/vueperslides.css";
export default {
  name: "HomeCarousel",
  props: {
    sliders: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      lazy_progress: true,

      pauseOnHover: true,
      autoPlaying: true,
      internalAutoPlaying: true
    };
  },

  components: {
    VueperSlides,
    VueperSlide
  }
};
</script>

<style lang="css">
.vueperslides__arrow {
  color: #3e4095;
}
</style>

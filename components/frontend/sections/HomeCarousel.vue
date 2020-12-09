<template>
  <div>
    <client-only>
      <vueper-slides
        class="no-shadow"
        :slide-ratio="1 / 2"
        fixed-height="600px"
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
              class="transition duration-500 ease-in-out w-full h-full bg-black opacity-40 hover:opacity-75 group"
            >
              <div class="container m-auto ml-8 h-full">
                <div class="flex flex-col w-full h-full justify-center">
                  <div
                    class=" transition duration-500 ease-in-out text-white font-sans leading-snug text-xl md:text-2xl group-hover:text-md font-medium uppercase w-2/3 md:w-1/3 tracking-widest transform group-hover:-translate-y-1"
                  >
                    <span>{{ slider.title }}</span>
                    <div
                      class="mt-2 md:mt-2 w-1/4 border-b-2 "
                      :style="{ borderColor: slider.color }"
                    ></div>
                  </div>

                  <div
                    class="transition duration-500 ease-in-out text-gray-200 group-hover:text-gray-500 mt-5 text-lg tracking-wider leading-relaxed w-3/4 sm:w-2/4 transform group-hover:translate-x-2"
                  >
                    {{ slider.description || truncate(100) }}
                  </div>

                  <div class="mt-5 mb-2 flex justify-start items-end">
                    <nuxt-link
                      :style="{
                        borderColor: slider.color,
                        color: slider.color
                      }"
                      class=" text-sm truncate bg-white px-4 py-2 text-center border-t-8 w-32 rounded-tr-full hover:rounded-tr-md hover:rounded-tl-full   shadow-md hover:shadow-xl focus:outline-none transform hover:translate-x-1 transition duration-500 ease-in-out"
                      :to="{
                        name:
                          slider.type == 1
                            ? 'courses-ver-slug'
                            : 'article-ler-slug',
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
          </template>
          <template v-if="lazy_progress" v-slot:loader>
            <Spin size="large" fix></Spin>
          </template>
        </vueper-slide>
        <template v-slot:pause>
          <Icon type="ios-pause" />
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

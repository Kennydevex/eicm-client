<template>
  <div class="w-full overflow-hidden bg-gray-200">
    <vueper-slides
      ref="myVueperSlides"
      :parallax="parallax"
      :parallax-fixed-content="parallaxFixedContent"
      fixed-height="250px"
      :arrows="false"
      :bullets="false"
    >
      <vueper-slide :image="'sliders/slide.jpg'">
        <template v-slot:content>
          <div
            data-aos="fade-up"
            data-aos-duration="2000"
            class="flex flex-row items-center justify-center px-8 py-3 mx-8 "
          >
            <div class="mr-12 -mt-3 text-xl text-gray-400">
              &#10077;
            </div>
            <div
              class="text-xl antialiased font-semibold leading-relaxed tracking-wider text-gray-900"
            >
              {{ slogan }}
            </div>

            <div class="flex justify-end mt-3 ml-12 text-2xl text-gray-300 ">
              &#10078;
            </div>
          </div>
        </template>
      </vueper-slide>
    </vueper-slides>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { VueperSlides, VueperSlide } from "vueperslides";

import "vueperslides/dist/vueperslides.css";

export default {
  name: "SchoolSlogan",

  data() {
    return {
      parallax: 1,
      parallaxFixedContent: true
    };
  },

  computed: {
    ...mapGetters({
      slogan: "schools/slogan"
    })
  },

  components: {
    VueperSlides,
    VueperSlide
  }
};
</script>

<style lang="scss" scoped></style>

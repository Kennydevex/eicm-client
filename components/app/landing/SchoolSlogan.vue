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
      <vueper-slide :image="'banners/banner2.jpg'">
        <template v-slot:content>
          <div
            data-aos="fade-up"
            data-aos-duration="2000"
            class="flex flex-row items-center justify-center px-8 py-3 mx-8 "
          >
            <div class="mr-3 -mt-3 text-2xl text-gray-200">
              &#10077;
            </div>
            <div
              class="text-xl antialiased font-semibold leading-relaxed tracking-wider text-gray-200 uppercase"
            >
              {{ slogan }}
            </div>

            <div class="flex justify-end mt-6 ml-3 text-2xl text-gray-200 ">
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

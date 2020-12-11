<template>
  <div class="bg-gray-200">
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
            class=" transform rotate-3 bg-white px-8 py-3 rounded-tl-lg rounded-br-lg shadow-lg flex flex-row justify-center items-center"
          >
            <div class="text-2xl text-gray-400 -mt-3 mr-12">
              &#10077;
            </div>
            <div
              class="text-md font-medium text-gray-700 tracking-wider antialiased leading-relaxed"
            >
              {{ slogan }} dff gfdgfdgfhddfgfdhgthfdgfdhgfhfhfd
            </div>

            <div class=" flex justify-end text-6xl text-gray-300 mt-3 ml-12">
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

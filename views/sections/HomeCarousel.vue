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
          v-for="slide in slides"
          :key="slide.id"
          :image="slide.image"
        >
          <template v-if="!lazy_progress" v-slot:content>
            <div class="w-full h-full bg-black opacity-75">
              <div class="container m-auto px-24 h-full">
                <div class="flex flex-col w-full h-full justify-center">
                  <div
                    class="text-white font-sans leading-tight text-xl font-light uppercase w-1/4 tracking-widest"
                  >
                    <span>Título</span>
                    <div
                      class="mt-2 m-auto md:m-px md:mt-2 w-1/4 border-b-2 border-white"
                    ></div>
                  </div>

                  <div
                    class="text-gray-300 mt-10 text-5xl font-semibold tracking-tight leading-tight w-1/2"
                  >
                    Corpo do slide de teste para teste
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
import "vueperslides/dist/vueperslides.css";
export default {
  name: "HomeCarousel",
  data() {
    return {
      lazy_progress: true,

      pauseOnHover: true,
      autoPlaying: true,
      internalAutoPlaying: true,
      slides: [
        {
          id: "slide-1",
          title: "Projectos",
          content:
            "Quisque hac turpis tortor massa suscipit fringilla curae platea diam, erat hendrerit vivamus eros in vel est sodales, donec dis lacinia nam integer pellentesque netus duis.",
          image: "sliders/slide1.jpg"
        },
        {
          id: "slide-2",
          title: "Arrendar ou Comprar",
          content:
            "Luctus ligula faucibus rhoncus convallis lectus habitant nulla natoque tempus primis sed, dis tellus enim consequat aliquam ultrices neque fusce risus bibendum",
          image: "sliders/slide2.jpg"
        }
      ]
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
  color: #02636f;
}
</style>

<template>
  <div class="justify-center w-full pt-12 bg-white">
    <div class="container px-3 mx-auto ">
      <el-row>
        <el-col :span="24" class="mb-10">
          <base-section-title>Blog</base-section-title>
        </el-col>

        <el-col :span="24" class="mt-8">
          <div data-aos="fade-right">
            <vueper-slides
              autoplay
              fade
              :infinite="true"
              :bullets="true"
              class="mx-5 no-shadow"
              :visible-slides="2"
              fixed-height="300px"
              slide-multiple
              :gap="3"
              :slide-ratio="1 / 4"
              :dragging-distance="200"
              :breakpoints="breakpoints"
            >
              <template v-if="articles.length != 0">
                <vueper-slide v-for="article in articles" :key="article.id">
                  <template v-slot:content>
                    <div class="flex items-start justify-center">
                      <base-home-post-card
                        :article="article"
                      ></base-home-post-card>
                    </div>
                  </template>
                </vueper-slide>
              </template>
            </vueper-slides>
          </div>
        </el-col>

        <!--<el-col v-for="(article, a) in articles" :key="a" :xs="24" :sm="12">
          <featured-post-card :article="article"></featured-post-card>
        </el-col>-->
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
  name: "HomeFeaturedCourses",

  props: {
    articles: {
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
          visibleSlides: 2,
          arrows: true,
          bullets: true,
          slideMultiple: 2
        },
        900: {
          slideRatio: 1 / 3,
          visibleSlides: 1,
          arrows: true,
          bullets: true,
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

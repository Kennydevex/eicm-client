<template>
  <div class="bg-white w-full pt-12  justify-center">
    <div class=" container px-3 mx-auto">
      <Row type="flex" :gutter="16">
        <Col span="24" class="mb-10">
          <base-home-section-title>Blog</base-home-section-title>
        </Col>

        <Col span="24" class="mt-8">
          <div data-aos="fade-right">
            <vueper-slides
              autoplay
              fade
              :infinite="true"
              :bullets="true"
              class="no-shadow mx-5"
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
                    <div class="flex justify-center items-center">
                      <featured-post-card
                        :article="article"
                      ></featured-post-card>
                    </div>
                  </template>
                </vueper-slide>
              </template>
            </vueper-slides>
          </div>
        </Col>

        <!--<Col v-for="(article, a) in articles" :key="a" :xs="24" :sm="12">
          <featured-post-card :article="article"></featured-post-card>
        </Col>-->
      </Row>
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
          slideMultiple: 2
        },
        900: {
          slideRatio: 1 / 3,
          visibleSlides: 1,
          slideMultiple: 1
        },
        600: {
          slideRatio: 1 / 2,
          arrows: false,
          bulletsOutside: true,
          visibleSlides: 1,
          slideMultiple: 1
        },
        // The order you list breakpoints does not matter, Vueper Slides will sort them for you.
        1100: {
          slideRatio: 1 / 4,
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

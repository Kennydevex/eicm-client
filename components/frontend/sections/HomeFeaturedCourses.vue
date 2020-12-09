<template>
  <div class="bg-gray-200 w-full py-12 justify-center">
    <div class=" container px-3 mx-auto">
      <Row type="flex">
        <Col span="24" class="mb-10">
          <base-home-section-title>Cursos em distaque</base-home-section-title>
        </Col>

        <Col span="24" class="mt-8">
          <div data-aos="zoom-in">
            <vueper-slides
              autoplay
              fade
              :infinite="true"
              :bullets="true"
              class="no-shadow mx-5"
              :visible-slides="3"
              fixed-height="400px"
              slide-multiple
              :gap="3"
              :slide-ratio="1 / 4"
              :dragging-distance="200"
              :breakpoints="breakpoints"
            >
              <template v-if="featuredCourses.length != 0">
                <vueper-slide
                  v-for="course in featuredCourses"
                  :key="course.id"
                >
                  <template v-slot:content>
                    <div class="flex justify-center items-center">
                      <base-course-card :course="course" />
                    </div>
                  </template>
                </vueper-slide>
              </template>
            </vueper-slides>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
  name: "HomeFeaturedCourses",

  props: {
    featuredCourses: {
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
          visibleSlides: 2,
          slideMultiple: 2
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

<style scoped>
.section-title {
  display: inline-block;
  position: relative;
}
.section-title:after {
  background: none repeat scroll 0 0 transparent;
  bottom: 0;
  content: "";
  display: block;
  height: 4px;
  left: 0;
  position: absolute;
  background: rgb(12, 1, 1);
  transition: width 0.3s ease 0s, left 0.3s ease 0s;
  width: 100%;
}
.section-title:hover:after {
  width: 100%;
  left: 0;
}
</style>

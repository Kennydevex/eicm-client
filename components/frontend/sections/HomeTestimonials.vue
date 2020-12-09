<template>
  <div class="bg-gray-100 w-full py-12 justify-center">
    <div class=" container px-3 mx-auto">
      <Row type="flex" :gutter="16">
        <Col span="24" class="mb-5">
          <base-home-section-title>Testemunhos</base-home-section-title>
        </Col>

        <Col span="24" class="mt-3">
          <div data-aos="fade-right">
            <vueper-slides
              autoplay
              fade
              :infinite="true"
              :bullets="false"
              :arrows="true"
              class="no-shadow mx-5"
              :visible-slides="1"
              fixed-height="400px"
              slide-multiple
              :gap="3"
              :slide-ratio="1 / 4"
              :dragging-distance="200"
              :breakpoints="breakpoints"
            >
              <template>
                <vueper-slide
                  v-for="testimonial in testimonials"
                  :key="testimonial.id"
                >
                  <template v-slot:content>
                    <div class="flex justify-center items-center">
                      <testimonial-card
                        :testimonial="testimonial"
                      ></testimonial-card>
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
import { mapGetters } from "vuex";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
  name: "HomeTestimonials",

  props: {
    testimonials: {
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
          arrows: false,
          bulletsOutside: false,
          visibleSlides: 1,
          slideMultiple: 1
        },
        900: {
          slideRatio: 1 / 3,
          arrows: false,
          bulletsOutside: false,
          visibleSlides: 1,
          slideMultiple: 1
        },
        600: {
          slideRatio: 1 / 2,
          arrows: false,
          bulletsOutside: false,
          visibleSlides: 1,
          slideMultiple: 1
        },
        // The order you list breakpoints does not matter, Vueper Slides will sort them for you.
        1100: {
          slideRatio: 1 / 4,
          arrows: false,
          bulletsOutside: false,
          visibleSlides: 1,
          slideMultiple: 1
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

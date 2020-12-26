<template>
  <div>
    <client-only>
      <div>
        <vueper-slides
          autoplay
          ref="coursesSlider"
          fade
          :slide-ratio="1 / 2"
          fixed-height="500px"
          :pause-on-hover="pauseOnHover"
          @autoplay-pause="internalAutoPlaying = false"
          @autoplay-resume="internalAutoPlaying = true"
        >
          <vueper-slide
            v-for="course in courses"
            :key="course.id"
            :class="compareDate(course.release) ? 'course_slider' : ''"
            :image="'/sliders/slide.jpg'"
          >
            <!--:image="`${publicURL}/uploads/articles/covers/${article.cover}`"-->
            <template v-slot:content>
              <nuxt-link
                :to="{
                  name: 'courses-ver-slug',
                  params: { slug: course.slug }
                }"
                class="w-full h-full relative inline-block"
              >
                <div
                  class="absolute left-0 bottom-0 w-full h-full z-10"
                  style="background-image: linear-gradient(180deg,transparent,rgba(0,0,0,.7));"
                ></div>

                <div class="p-8 absolute bottom-0 left-0 z-20 w-full md:w-1/2">
                  <span
                    class="px-4 py-1 rounded-md text-gray-400 font-semibold inline-flex items-center justify-center mb-2"
                    :style="{ backgroundColor: course.color }"
                    >{{ cousesType(course.type) }}</span
                  >
                  <h2
                    class="text-4xl font-semibold text-gray-400 leading-tight"
                  >
                    {{ course.name }}
                  </h2>
                  <p
                    class="my-3 tracking-wide leading-relaxed text-gray-400 text-base"
                  >
                    {{ course.presentation | truncate(130) }}
                  </p>
                  <div class="flex mt-3">
                    <!--<img
                      :src="
                        `${publicURL}/uploads/avatars/${article.user_avatar}`
                      "
                      class="h-10 w-10 rounded-full mr-2 object-cover"
                    />-->
                    <div>
                      <p class="font-semibold text-gray-400 text-xs">
                        Curso lançado:
                        {{
                          compareDate(course.release)
                            ? $moment(course.release).fromNow()
                            : $moment(course.release).toNow()
                        }}
                      </p>
                    </div>
                  </div>
                </div> </nuxt-link
              >-->
            </template>
          </vueper-slide>
          <template v-slot:pause>
            <Icon type="ios-pause" />
          </template>
        </vueper-slides>
      </div>
    </client-only>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
  props: {
    courses: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      pauseOnHover: true,
      internalAutoPlaying: true
    };
  },
  methods: {
    cousesType(type) {
      return type == 3
        ? "ACP"
        : type == 2
        ? "Formações Profissionais"
        : type == 1
        ? "Cursos da Via Técnica"
        : "Outros";
    },
    compareDate(date) {
      if (this.$moment(date) >= this.$moment().subtract(5, "years")) {
        return true;
      }
      return false;
    }
  },
  components: {
    VueperSlides,
    VueperSlide
  }
};
</script>

<style lang="css" scoped>
.vueperslides__arrow {
  color: #3e4095;
}

.course_slider:before {
  content: "Curso Novo";
  position: absolute;
  top: -18px;
  right: -18px;
  padding: 4px 25px;
  background: orange;
  color: #fff;
  font-size: 10px;
  transform: translateX(30%) rotate(45deg);
  transform-origin: 0 0;
  box-shadow: 0 0 9px rgba(0, 0, 0, 0.2);
}
</style>

<template>
  <div>
    <client-only>
      <div class="rounded-t-lg shadow-xl overflow-hidden">
        <vueper-slides
          class="no-shadow"
          fade
          ref="blogSlider"
          fractions
          :slide-ratio="1 / 2"
          fixed-height="500px"
          :pause-on-hover="pauseOnHover"
          @autoplay-pause="internalAutoPlaying = false"
          @autoplay-resume="internalAutoPlaying = true"
        >
          <vueper-slide
            v-for="article in articles"
            :key="article.id"
            :image="`${publicURL}/uploads/articles/covers/${article.cover}`"
          >
            <template v-slot:content>
              <nuxt-link
                :to="{ name: 'blog-ler-slug', params: { slug: article.slug } }"
                class="p-8 w-full h-full relative inline-block"
              >
                <div
                  class="absolute left-0 bottom-0 w-full h-full z-10"
                  style="background-image: linear-gradient(180deg,transparent,rgba(0,0,0,.7));"
                ></div>

                <div class="p-4 absolute bottom-0 left-0 z-20">
                  <span
                    class="px-4 py-1 bg-primary rounded-md text-gray-200 uppercase inline-flex items-center justify-center mb-2"
                    >{{ article.category }}</span
                  >
                  <h2
                    class="text-4xl font-semibold text-gray-100 leading-tight"
                  >
                    {{ article.title }}
                  </h2>
                  <p
                    class="my-3 pl-6 border-l-4 border-gray-700 tracking-wide leading-relaxed text-gray-300 text-lg"
                  >
                    {{ article.summary | truncate(150) }}
                  </p>
                  <div class="flex mt-3">
                    <img
                      :src="
                        `${publicURL}/uploads/avatars/${article.user_avatar}`
                      "
                      class="h-10 w-10 rounded-full mr-2 object-cover"
                    />
                    <div>
                      <p class="font-semibold text-gray-200 text-sm">
                        {{ article.user }}
                      </p>
                      <p class="font-semibold text-gray-400 text-xs">
                        {{ $moment(article.created_at).fromNow() }}
                      </p>
                    </div>
                  </div>
                </div>
              </nuxt-link>
            </template>
          </vueper-slide>
          <template v-slot:pause>
          <fa class="text-primary" icon="pause" />
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

<style lang="css" scoped>
.vueperslides__arrow {
  color: #3e4095;
}
</style>

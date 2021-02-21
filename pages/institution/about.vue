<template>
  <div>
    <div class="mb-8">
      <div>
        <core-landing-page-header>Sobre a Instituição</core-landing-page-header>
      </div>

      <div class="container m-auto">
        <div
          class="flex flex-col items-center justify-center"
        >
          <div
            class="mt-8 text-2xl font-bold leading-tight tracking-wide text-center text-gray-800 uppercase"
          >
            {{ name }}
          </div>
          <div
            class="px-3 py-1 mt-3 mb-3 text-sm font-bold tracking-widest text-center text-gray-700 uppercase bg-gray-300 rounded-md"
          >
            {{ abbr }}
          </div>

          <el-divider></el-divider>

          <div class="mb-8">
            <p
              class="px-4 text-base leading-relaxed tracking-wide text-justify text-gray-800 md:px-24"
            >
              {{ about }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AboutPage",
  layout: "landing",

  data: function() {
    return {};
  },
  methods: {},
  computed: {
    ...mapGetters({
      about: "schools/about",
      name: "schools/name",
      abbr: "schools/abbr"
    })
  },

};
</script>

<style scoped></style>

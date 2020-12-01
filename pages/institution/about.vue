<template>
  <div class="mb-8">
    <div>
      <general-page-header :title="'Sobre a Instituição'"></general-page-header>
    </div>

    <div class="container m-auto px-3 bg-white  rounded-lg shadow-lg">
      <div
        class="flex flex-col justify-center items-center"
      >
        <div
          class="mt-8 text-lg capitalize font-semibold text-primary tracking-wide text-center leading-tight"
        >
          {{ name }}
        </div>
        <div
          class="mb-8 py-1 px-3 mt-3 bg-gray-300 rounded-md text-center font-bold text-gray-700 text-sm uppercase tracking-widest"
        >
          {{ abbr }}
        </div>


        <div class="mb-8">
          <p
            class="text-justify px-4 md:px-24 text-base leading-relaxed tracking-wide text-gray-800"
          >
            {{ about }}
          </p>
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
      abbr: "schools/abbr",
    })
  },
  components: {
    GeneralPageHeader: () => import("@/views/sections/GeneralPageHeader")
  }
};
</script>

<style scoped></style>

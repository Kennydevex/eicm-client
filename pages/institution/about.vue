<template>
  <div>
    <div class="mb-8">
      <div>
        <general-page-header
          :title="'Sobre a Instituição'"
        ></general-page-header>
      </div>

      <div class="container m-auto">
        <div class="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg">
          <div
            class="mt-8 text-lg font-semibold leading-tight tracking-wide text-center capitalize text-primary"
          >
            {{ name }}
          </div>
          <div
            class="px-3 py-1 mt-3 mb-8 text-sm font-bold tracking-widest text-center text-gray-700 uppercase bg-gray-300 rounded-md"
          >
            {{ abbr }}
          </div>

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
    <home-footer :bgColor="'#F3F4F6'"></home-footer>
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
  components: {
    GeneralPageHeader: () => import("@/views/sections/GeneralPageHeader"),
    HomeFooter: () => import("@/components/frontend/sections/HomeFooter")
  }
};
</script>

<style scoped></style>

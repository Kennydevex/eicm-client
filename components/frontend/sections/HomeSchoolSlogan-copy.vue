<template>
  <div class="bg-gray-200">
    <div class="flex justify-center items-center py-16">
      <div class=" w-96 flex flex-col">
        <div class="flex justify-start text-4xl text-gray-400 -mb-5">
          &#10077;
        </div>
        <div
          class="w-full text-center py-1 px-2  text-md tracking-wider font-sans antialiased leading-relaxed"
        >
          {{ slogan }}
        </div>

        <parallax>
          <img src="sliders/slide.jpg" alt="very cool bg" />
        </parallax>
        <div class=" flex justify-end text-4xl text-gray-400 -mt-3 ">
          &#10078;
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Parallax from "vue-parallaxy";

export default {
  name: "SchoolSlogan",

  computed: {
    ...mapGetters({
      slogan: "schools/slogan"
    })
  },
   components: {
      Parallax
    }
};
</script>

<style lang="scss" scoped></style>

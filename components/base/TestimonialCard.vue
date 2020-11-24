<template>
  <div class=" w-full md:w-2/3  flex items-center justify-center px-5 py-12">
    <div
      class="w-full mx-auto rounded-lg bg-white shadow-lg px-5 pt-5 pb-10 text-gray-800"
      style="max-width: 500px"
    >
      <div class="w-full pt-1 pb-5">
        <div
          class="overflow-hidden border-2 border-white rounded-full w-20 h-20 -mt-16 mx-auto shadow-xl"
        >
          <img  :src="`${publicURL}/uploads/schools/testimonials/${testimonial.avatar}`" alt="" />
        </div>
      </div>
      <div class="w-full mb-10">
        <div class="text-3xl text-indigo-500 text-left leading-tight h-3">
          “
        </div>
        <p class="text-sm text-gray-600 text-center px-5">
          {{ testimonial.message }}
        </p>
        <div
          class="text-3xl text-indigo-500 text-right leading-tight h-3 -mt-3"
        >
          ”
        </div>
      </div>
      <div class="w-full">
        <p class="text-md text-indigo-500 font-bold text-center">
          {{ testimonial.name }}
        </p>
        <p class="text-xs text-gray-500 text-center">
          --{{ testimonial.job_title }} &bull; {{ testimonial.institution }}--
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    testimonial: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>

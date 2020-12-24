<template>
  <div
    class="flex items-center justify-center w-full px-5 py-12 transform md:w-2/3 "
    :class="testimonial.id % 2 == 0 ? '-skew-y-2' : 'skew-x-2'"
  >
    <div
      class="w-full px-5 pt-5 pb-10 mx-auto text-gray-800 bg-white rounded-lg shadow-lg"
      style="max-width: 500px"
    >
      <div class="w-full pt-1 pb-5">
        <div
          class="w-20 h-20 mx-auto -mt-16 overflow-hidden border-2 border-white rounded-full shadow-xl"
        >
          <img
            :src="
              `${publicURL}/uploads/schools/testimonials/${testimonial.avatar}`
            "
            alt=""
          />
        </div>
      </div>
      <div class="w-full mb-10">
        <div class="h-3 text-3xl leading-tight text-left text-indigo-500">
          “
        </div>
        <p class="px-5 text-sm text-center text-gray-600">
          {{ testimonial.message }}
        </p>
        <div
          class="h-3 -mt-3 text-3xl leading-tight text-right text-indigo-500"
        >
          ”
        </div>
      </div>
      <div class="w-full">
        <p class="font-bold text-center text-indigo-500 text-md">
          {{ testimonial.name }}
        </p>
        <p class="text-xs text-center text-gray-500">
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

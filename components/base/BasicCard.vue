<template>
  <div
    class="max-w-sm overflow-hidden border border-gray-200 rounded-lg shadow-lg cursor-pointer"
    @click="redirectToPageWithParam('courses-ver-slug', course.slug)"
  >
    <img
      class="w-full h-40"
      :src="`${publicURL}/uploads/courses/covers/${course.cover}`"
      :alt="course.abbr"
    />
    <div class="p-5 mb-2">
      <div class="text-xl font-bold text-gray-800">{{ course.name }}</div>
      <div class="mb-3 -mt-1">
        <div class="text-xs font-semibold tracking-wide text-gray-500">
          {{ course.departament.name }} &bull;
          {{ $moment(course.release).format("l") }}
        </div>
      </div>
      <p class="text-sm text-justify text-gray-700">
        {{ course.summary | truncate(80) }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    course: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>

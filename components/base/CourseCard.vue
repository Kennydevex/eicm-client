<template>
  <div
    class="m-3 cursor-pointer"
    @click="redirectToPageWithParam('courses-ver-slug', course.slug)"
  >
    <div class="relative pb-5/6">
      <img
        class="absolute h-full w-full object-cover rounded-lg shadow-md"
        :src="`${publicURL}/uploads/courses/covers/${course.cover}`"
        :alt="course.abbr"
      />
    </div>
    <div class="relative px-4 -mt-16">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <div class="flex items-baseline">
          <!--<span
            class="inline-block bg-teal-200 text-teal-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide"
            >Novo</span
          >-->
          <div
            class="text-gray-600 text-xs uppercase font-semibold tracking-wide"
          >
            {{ course.departament.name }}
          </div>
        </div>
        <h4 class="mt-1 font-semibold text-lg leading-tight truncate">
          {{ course.name }}
        </h4>
        <div class="mt-1">
          {{ $moment(course.release).format("ll") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["course"],
  methods: {}
};
</script>

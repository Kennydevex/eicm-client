<template>
  <div
    class="cursor-pointer w-96 h-64"
    @click="redirectToPageWithParam('courses-ver-slug', course.slug)"
  >
  
    <div class="relative pb-5/6 w-full">
      <img
        class="absolute object-cover w-full h-full rounded-lg shadow-2xl"
        :src="`${publicURL}/uploads/courses/covers/${course.cover}`"
        :alt="course.abbr"
      />
    </div>
    <div class="relative px-4 -mt-16">
      <div class="p-6 bg-white rounded-lg shadow-xl">
        <div class="flex items-baseline">
          <!--<span
            class="inline-block px-2 text-xs font-semibold tracking-wide text-teal-800 uppercase bg-teal-200 rounded-full"
            >Novo</span
          >-->
          <div
            class="text-xs font-semibold tracking-wide text-gray-600 uppercase"
          >
            {{ course.departament.name }}
          </div>
        </div>
        <div class="mt-1 text-lg font-semibold leading-tight truncate">
          {{ course.name }} 
        </div>
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

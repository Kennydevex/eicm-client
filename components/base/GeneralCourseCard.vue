<template>
  <div class="w-full">
    <div class="py-2">
      <div
        class="flex flex-col overflow-hidden bg-white border border-gray-200 rounded-lg shadow-md sm:flex-row"
      >
       
        <div
          @click="redirectToPageWithParam('courses-ver-slug', course.slug)"
          class="object-cover w-full bg-cover cursor-pointer sm:w-1/3 "
          :style="{
            backgroundImage: `url(${publicURL}/uploads/courses/covers/${course.cover})`
          }"
        ></div>
        <div class="w-full p-5 sm:w-2/3">
          <div class="items-baseline hidden mb-1 sm:flex">
            <div
              class="text-xs font-semibold tracking-wide text-gray-600 uppercase"
            >
              <span
                class="px-2 py-1 text-gray-700 bg-gray-300 rounded-md shadow-sm cursor-pointer"
              >
                {{ course.departament.name }}</span
              >
              &bull; {{ $moment(course.created_at).format("ll") }}
            </div>
          </div>

          <div class="border-b ">
            <h1
              @click="redirectToPageWithParam('courses-ver-slug', course.slug)"
              class="text-xl font-bold text-gray-800 truncate cursor-pointer hover:text-primary"
            >
              {{ course.name }}
            </h1>
            <p class="mt-2 leading-relaxed tracking-wide text-gray-700 text-md">
              {{ course.presentation | truncate(100) }}
            </p>
            <div class="flex my-1 item-center">
              <button
                @click="
                  redirectToPageWithParam('courses-ver-slug', course.slug)
                "
                class="my-1 text-sm font-semibold text-primary"
              >
                Ver Detalhes
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between mt-3">
            <div class="text-xs tracking-tight text-gray-600">
              <span>Duração:</span>
              <span
                >{{ course.duration }}
                {{
                  course.duration_type == 1
                    ? "Dias"
                    : course.duration_type == 2
                    ? "Meses"
                    : "Anos"
                }}</span
              >
            </div>

            <div class="flex text-xs tracking-tight text-gray-600 sm:hidden">
              {{ $moment(course.created_at).format("ll") }}
            </div>
          </div>
        </div>
      </div>
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

<template>
  <div class="w-full">
    <div class="py-2">
      <div class="flex bg-white shadow-2xl rounded-lg overflow-hidden">
        <div
          @click="redirectToPageWithParam('courses-ver-slug', course.slug)"
          class="w-1/3 bg-cover cursor-pointer"
          :style="{
            backgroundImage: `url(${publicURL}/uploads/courses/covers/${course.cover})`
          }"
        ></div>
        <div class="w-2/3 p-5">
          <div class="flex items-baseline mb-1">
            <div
              class="text-gray-600 text-xs uppercase font-semibold tracking-wide"
            >
              <span
                class="py-1 px-2 bg-gray-300 rounded-md text-gray-700 cursor-pointer shadow-sm"
              >
                {{ course.departament.name }}</span
              >
              &bull; {{ $moment(course.created_at).format("ll") }}
            </div>
          </div>

          <div class=" border-b">
            <h1
              @click="redirectToPageWithParam('courses-ver-slug', course.slug)"
              class="text-gray-800 font-bold text-xl cursor-pointer truncate hover:text-primary"
            >
              {{ course.name }}
            </h1>
            <p class="mt-2 text-gray-700 text-md tracking-wide leading-relaxed">
              {{ course.presentation | truncate(100) }}
            </p>
            <div class="flex item-center my-1">
              <button
                @click="
                  redirectToPageWithParam('courses-ver-slug', course.slug)
                "
                class="px-3 py-1 text-primary text-sm font-bold rounded"
              >
                Ver
              </button>
            </div>
          </div>

          <div class="flex mt-3 justify justify-between">
            <div class="text-gray-700 tracking-tight">
              <span>Duração:</span>
              <span class="px-2 py-1 bg-gray-200 rounded-full"
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
            <div
              v-if="course.featured"
              class="px-3 py-1 bg-yellow-300 text-gray-700 rounded-lg text-sm font-semibold tracking-wide border shadow-lg"
            >
              <Icon type="md-star" /> <span>Destaque</span>
            </div>
            <!--<div class="author flex items-center">
              <Icon type="md-person" class="text-gray-600" />
              <div class="ml-1">
                <span class="text-xs tracking-tighter text-gray-700">
                  <a href="#" class="text-gray-600 tracking-wide">{{
                    course.user
                  }}</a>
                </span>
                <span> </span>
              </div>
            </div>-->
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

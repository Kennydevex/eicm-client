<template>
  <div>
    <div
      class="max-w-md mx-auto overflow-hidden bg-white border shadow-md rounded-xl md:max-w-2xl"
    >
      <div class="md:flex">
        <div
          class="cursor-pointer md:flex-shrink-0"
          @click="redirectToPageWithParam('courses-ver-slug', course.slug)"
        >
          <img
            class="object-cover w-full h-48 md:h-56 md:w-48"
            :src="`${publicURL}/uploads/courses/covers/${course.cover}`"
            :alt="course.abbr"
          />
        </div>
        <div class="p-5">
          <div>
            <div
              class="text-sm font-semibold tracking-wide uppercase text-primary"
            >
              {{ course.abbr }}
            </div>
            <div
              class="mt-2 mb-3 text-xs font-semibold tracking-wide text-gray-500 uppercase"
            >
              <span class="px-2 py-1 bg-indigo-200 rounded-md">
                {{ course.departament.name }}</span
              >
              &bull; {{ $moment(course.created_at).format("ll") }}
            </div>
            <nuxt-link
              :to="{ name: 'courses-ver-slug', params: { slug: course.slug } }"
              class="block mt-1 text-lg font-medium leading-tight text-black hover:underline"
              >{{ course.name }}</nuxt-link
            >
            <p class="mt-2 text-gray-500">
              {{ course.summary | truncate(80) }}
            </p>
          </div>
          <div class="flex items-center justify-between mt-3">
            <div class="text-xs font-semibold tracking-tight text-gray-400">
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

            <div
              v-if="course.featured"
              class="flex text-2xl tracking-tight text-yellow-400"
            >
              <Tooltip placement="top" content="Curso em Destaque">
                <Icon type="ios-star" />
              </Tooltip>
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

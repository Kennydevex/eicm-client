<template>
  <div>
    <div class="relative mx-auto overflow-hidden shadow-2xl border-b">
      <!--<div
            class="ribbon z-10 flex items-center justify-center bg-red-500 text-sm whitespace-no-wrap px-2"
          >
            NOVO
          </div>-->

      <div class="h-96 mb-4 md:mb-0 w-full mx-auto relative">
        <div
          class="absolute left-0 bottom-0 w-full h-full"
          style="background-image: linear-gradient(180deg,transparent,rgba(0,0,0,.7));"
        ></div>
        <img
          :src="`${publicURL}/uploads/courses/covers/${course.cover}`"
          class="w-full h-full z-0 object-cover object-center"
        />

        <div class="absolute bottom-0 w-full flex-col justify-center pb-10">
          <div class="w-full text-center">
            <span
              class="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2 rounded-sm font-semibold"
              >{{ course.family.name }}</span
            >
            <h2 class="text-4xl font-semibold text-gray-100 leading-tight">
              {{ course.name }}
            </h2>

            <div class="mt-3" v-if="course.teachers.length > 0">
              <Tooltip placement="right" content="Cordenador do curso">
                <img
                  src="/teams/default.png"
                  class="h-10 w-10 rounded-full mr-2 object-cover bg-white p-2"
                />
              </Tooltip>

              <div>
                <p class="font-semibold text-gray-200 text-sm">
                  {{ course.teachers[0].employee.person.name }}
                </p>
                <p class="font-semibold text-gray-400 text-xs">
                  Cordenador
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["course"]
};
</script>

<style lang="scss" scoped></style>

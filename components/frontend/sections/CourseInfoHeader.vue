<template>
  <div>
    <div class="relative mx-auto overflow-hidden shadow-2xl">
      <!--<div
            class="z-10 flex items-center justify-center px-2 text-sm whitespace-no-wrap bg-red-500 ribbon"
          >
            NOVO
          </div>-->

      <div class="relative w-full h-64 mx-auto mb-4 sm:h-96 md:mb-0">
        <div
          class="absolute bottom-0 left-0 w-full h-full"
          style="background-image: linear-gradient(180deg,transparent,rgba(0,0,0,.4));"
        ></div>
        <img
          :src="`${publicURL}/uploads/courses/covers/${course.cover}`"
          class="z-0 object-cover object-center w-full h-full"
        />

        <div class="absolute bottom-0 flex-col justify-center w-full pb-10 ml-8">
          <div class="w-full text-left">
            <span
              class="inline-flex items-center justify-center px-4 py-1 mb-2 font-semibold text-gray-200 bg-black rounded-sm"
              >{{ course.family.name }}</span
            >
            <h2 class="text-4xl font-semibold leading-tight text-gray-100">
              {{ course.name }}
            </h2>

            <div class="mt-3" v-if="course.teachers.length > 0">
              <Tooltip placement="right" content="Cordenador do curso">
                <img
                  src="/teams/default.png"
                  class="object-cover w-10 h-10 p-2 mr-2 bg-white rounded-full"
                />
              </Tooltip>

              <div>
                <p class="text-sm font-semibold text-gray-200">
                  {{ course.teachers[0].employee.person.name }}
                </p>
                <p class="text-xs font-semibold text-gray-400">
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

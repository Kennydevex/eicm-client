<template>
  <div
    class="h-64 bg-cover bg-center w-full flex flex-col justify-center items-center shadow-xl mb-8 bg-black"
    :style="{
      backgroundImage: `url(${publicURL}/uploads/courses/covers/${cover})`
    }"
  >
  fvrtrtt
    <div
      class="bg-black bg-opacity-50 p-3 uppercase text-xl text-gray-200 font-sans font-semibold tracking-wide leading-relaxed text-center border-2 border-white shadow-md"
    >
      {{ course }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["course", "cover"]
};
</script>

<style lang="scss" scoped></style>

<template>
  <div
    class="h-64 w-full flex flex-col justify-center items-center shadow-xl mb-8 bg-black"
    style="background-image: url('/sliders/slide.jpg');"
  >
    <div
      class="bg-black bg-opacity-50 p-3 uppercase text-xl text-gray-200 font-sans font-semibold tracking-wide leading-relaxed text-center border-2 border-white shadow-md"
    >
      {{ course }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["course"]
};
</script>

<style lang="scss" scoped></style>

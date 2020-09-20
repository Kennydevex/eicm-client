<template>
  <div
    class="r h-64 bg-cover bg-center w-full flex flex-col justify-center items-center shadow-xl mb-8 bg-black"
    style="background-image: url('/sliders/slide.jpg');"
  >
    <div
      class="rounded-lg bg-black bg-opacity-50 p-3 uppercase text-xl text-gray-200 font-sans font-semibold tracking-widest leading-relaxed text-center border-2 border-white shadow-md"
    >
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeralPageHeader',
  props: ["title"]
};
</script>

<style lang="scss" scoped></style>

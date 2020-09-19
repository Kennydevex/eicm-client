<template>
  <div
    class="h-64 bg-cover bg-center w-full flex flex-col justify-center items-center shadow-xl mb-8 bg-black"
    style="background-image: url('/sliders/slide.jpg');"
  >
    <div
      class="bg-black bg-opacity-50 p-3 uppercase text-xl text-gray-200 font-sans font-semibold tracking-wide leading-relaxed text-center border-2 border-white shadow-md"
    >
      {{ title }}
    </div>
    <div
      class="italic text-sm w-56 text-center text-white pt-3 font-sans leading-snug tracking-wider"
    >
      <span class="text-lg text-gray-100">&#34;</span>Uma equipa dinâmica, qeu
      trabalha com afinco para servir a comunidade educativa<span>&#34;</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title"]
};
</script>

<style lang="scss" scoped></style>

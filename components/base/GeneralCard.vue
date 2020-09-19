<template>
  <div class="bg-white rounded-lg overflow-hidden shadow-lg">
    <div class="relative bg-red-500 pb-1/2">
      <img
        class="absolute top-0 h-full w-full object-cover object-center"
        src="/sliders/slide.jpg"
        alt="Sunset in the mountains"
      />
    </div>

    <div class="p-6">
      <div class="flex items-baseline">
        <span
          class="inline-block bg-teal-200 text-teal-800 text-xs px-2 mr-2 rounded-full select-none font-semibold tracking-wide"
          >Novo</span
        >
        <div
          class="text-gray-600 text-xs uppercase font-semibold tracking-wide"
        >
          Curso Via Técnica
          <!--&bull; Há 3 Anos-->
        </div>
      </div>
      <h4 class="font-semibold text-lg my-1 leading-snug truncate">
        Informática de Gestão
      </h4>
      <div class="text-gray-800 leading-relaxed tracking-wide">
        Lorem ipsum dolor sit amet consectetur adipiscing...
      </div>
      <div class="inline-flex mt-2">
        <Rate show-text v-model="valueHalf" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GeneralCard",
  props: ["course"],

  data() {
    return {
      valueHalf: 2.5
    };
  }
};
</script>

<style lang="scss" scoped></style>

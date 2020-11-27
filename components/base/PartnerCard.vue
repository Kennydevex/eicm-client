<template>
  <div class="group">
    <a
      class="p-5 w-40 mx-8 flex flex-col justify-center items-center bg-white  shadow-lg hover:shadow-xl rounded-lg"
      :href="partner.link"
      target="_blank"
    >
      <div
        class="p-2 inline-flex  border border-gray-200 rounded-lg overflow-hidden w-full h-full"
      >
        <img
          :src="`${publicURL}/uploads/schools/partners/${partner.logo}`"
          alt=""
          class="h-full w-full"
        />
      </div>
      <div class="mt-2">
        <h2
          class="text-md font-sans font-semibold text-gray-600 tracking-wide leading-snug"
        >
          {{ partner.name }}
        </h2>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    partner: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>

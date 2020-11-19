<template>
  <div class="mb-4 md:mb-0 h-96 w-full mx-auto relative rounded-t-lg">
    <div
      class="absolute left-0 bottom-0 w-full h-full z-10"
      style="background-image: linear-gradient(180deg,  transparent, rgba(0, 0, 0, 0.7) );"
    ></div>
    <img
      :src="`${publicURL}/uploads/articles/covers/${article.cover}`"
      class="absolute left-0 top-0 w-full h-full z-0 object-cover"
    />
    <div class="p-4 absolute bottom-0 left-0 z-20">
      <a
        href="#"
        class="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2"
        >{{ article.category }}</a
      >
      <h2 class="text-4xl font-semibold text-gray-100 leading-tight">
        {{ article.title }}
      </h2>
      <div class="flex mt-3">
        <img
          :src="`${publicURL}/uploads/avatars/${article.user_avatar}`"
          class="h-10 w-10 rounded-full mr-2 object-cover"
        />
        <div>
          <p class="font-semibold text-gray-200 text-sm">{{ article.user }}</p>
          <p class="font-semibold text-gray-400 text-xs">
            {{ $moment(article.created_at).fromNow() }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>

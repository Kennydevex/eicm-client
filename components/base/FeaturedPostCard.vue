<template>
  <div class="w-full">
    <div class="py-2">
      <div class="flex overflow-hidden bg-white border rounded-lg shadow-xl">
        <div
          @click="redirectToPageWithParam('blog-ler-slug', article.slug)"
          class="hidden w-1/3 bg-cover cursor-pointer sm:flex"
          :style="{
            backgroundImage: `url(${publicURL}/uploads/articles/covers/${article.cover})`
          }"
        ></div>
        <div class="w-full p-5 sm:w-2/3">
          <div class="flex items-baseline mb-1">
            <div
              class="text-xs font-semibold tracking-wide text-gray-600 uppercase"
            >
              <span
                class="px-2 py-1 text-gray-700 bg-gray-300 rounded-md shadow-sm cursor-pointer"
              >
                {{ article.category }}</span
              >
              &bull; {{ $moment(article.created_at).fromNow() }}
            </div>
          </div>

          <div class="border-b ">
            <h1
              @click="redirectToPageWithParam('blog-ler-slug', article.slug)"
              class="text-xl font-bold text-gray-800 truncate cursor-pointer hover:text-primary"
            >
              {{ article.title }}
            </h1>
            <p class="mt-2 leading-relaxed tracking-wide text-gray-700 text-md">
              {{ article.summary | truncate(100) }}
            </p>
            <div class="flex my-1 item-center">
              <button
                @click="redirectToPageWithParam('blog-ler-slug', article.slug)"
                class="px-3 py-1 text-sm font-bold rounded text-primary"
              >
                Ler mais
              </button>
            </div>
          </div>

          <div class="inline-flex mt-3">
            <div class="flex items-center author">
              <Icon type="md-person" class="text-gray-600" />
              <div class="ml-1">
                <span class="text-xs tracking-tighter text-gray-700">
                  <a href="#" class="tracking-wide text-gray-600">{{
                    article.user
                  }}</a>
                </span>
                <span> </span>
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

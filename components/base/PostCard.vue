<template>
  <div class="overflow-hidden bg-white rounded-lg">
    <div class="relative h-48 bg-red-500">
      <img
        class="absolute top-0 object-cover object-center w-full h-full cursor-pointer"
        :src="`${publicURL}/uploads/articles/covers/${article.cover}`"
        alt="Capa do artigo"
        @click="redirectToPageWithParam('blog-ler-slug', article.slug)"
      />
    </div>

    <div class="p-6">
      <div class="flex items-baseline mb-2">
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
      <h4
        @click="redirectToPageWithParam('blog-ler-slug', article.slug)"
        class="my-1 text-lg font-semibold leading-snug truncate cursor-pointer hover:text-primary"
      >
        {{ article.title }}
      </h4>
      <div
        class="pb-1 text-sm antialiased leading-relaxed tracking-normal text-justify text-gray-800"
      >
        {{ article.summary | truncate(100) }}
      </div>
      <!--<div class="flex items-center justify-between pb-3 border-b ">
        <nuxt-link
          :to="{ name: 'blog-ler-slug', params: { slug: article.slug } }"
          class="px-3 py-1 text-sm bg-white border border-gray-200 rounded-md shadow-lg text-primary hover:shadow-none hover:border-primary"
          >Ler mais</nuxt-link
        >
      </div>-->
      <div class="inline-flex mt-1">
        <div class="flex items-center my-3 -ml-3 author">
          <div class="user-logo">
            <img
              class="object-cover w-8 h-8 p-1 mx-4 border-2 rounded-full shadow"
              :src="`${publicURL}/uploads/avatars/${article.user_avatar}`"
              alt="avatar"
            />
          </div>
          <div>
            <div class="flex flex-col text-xs tracking-wide text-gray-600">
              Publicado por:
            </div>
            <h2 class="text-sm tracking-tighter text-gray-900">
              <a href="#" class="tracking-wide text-gray-800">{{
                article.user
              }}</a>
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostCard",
  props: {
    article: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },

  data() {
    return {
      valueHalf: 2.5
    };
  }
};
</script>

<style lang="scss" scoped></style>

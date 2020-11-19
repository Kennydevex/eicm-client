<template>
  <div class="bg-white rounded-lg overflow-hidden shadow-xl">
    <div class="relative bg-red-500 h-48">
      <img
        class="absolute top-0 h-full w-full object-cover object-center cursor-pointer"
        :src="`${publicURL}/uploads/articles/covers/${article.cover}`"
        alt="Capa do artigo"
        @click="redirectToPageWithParam('blog-ler-slug', article.slug)"
      />
    </div>

    <div class="p-6">
      <div class="flex items-baseline mb-2">
        <div
          class="text-gray-600 text-xs uppercase font-semibold tracking-wide"
        >
          <span
            class="py-1 px-2 bg-gray-300 rounded-md text-gray-700 cursor-pointer shadow-sm"
          >
            {{ article.category }}</span
          >
          &bull; {{ $moment(article.created_at).fromNow() }}
        </div>
      </div>
      <h4
        @click="redirectToPageWithParam('blog-ler-slug', article.slug)"
        class="font-semibold text-lg my-1 leading-snug truncate cursor-pointer hover:text-primary"
      >
        {{ article.title }}
      </h4>
      <div
        class="text-gray-800 pb-1 leading-relaxed tracking-wide text-justify"
      >
        {{ article.summary | truncate(100) }}
      </div>
      <!--<div class="flex items-center justify-between border-b pb-3 ">
        <nuxt-link
          :to="{ name: 'blog-ler-slug', params: { slug: article.slug } }"
          class="text-primary text-sm py-1 px-3 bg-white border border-gray-200 shadow-lg rounded-md hover:shadow-none hover:border-primary"
          >Ler mais</nuxt-link
        >
      </div>-->
      <div class="inline-flex mt-1">
        <div class="author flex items-center -ml-3 my-3">
          <div class="user-logo">
            <img
              class="w-8 h-8 object-cover rounded-full mx-4  shadow p-1 border-2"
              :src="`${publicURL}/uploads/avatars/${article.user_avatar}`"
              alt="avatar"
            />
          </div>
          <div>
            <div class="flex flex-col text-gray-600 text-xs tracking-wide">
              Publicado por:
            </div>
            <h2 class="text-sm tracking-tighter text-gray-900">
              <a href="#" class="text-gray-800 tracking-wide">{{
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

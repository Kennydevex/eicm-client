<template>
  <div class="w-full">
    <div class="py-2">
      <div class="flex bg-white shadow-lg rounded-lg overflow-hidden">
        <div
          class="w-1/3 bg-cover"
          style="background-image: url('https://images.unsplash.com/photo-1494726161322-5360d4d0eeae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80')"
        ></div>
        <div class="w-2/3 p-5">
          <div class="flex items-baseline mb-1">
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

          <div class=" border-b">
            <h1 class="text-gray-800 font-bold text-xl truncate">
              {{ article.title }} sdfgdvfd g fd gfd gf dg fdg fg dfg fdgfd
            </h1>
            <p class="mt-2 text-gray-700 text-md">
              {{ article.summary | truncate(100) }}
            </p>
            <div class="flex item-center my-1">
              <button class="pr-3 py-1 text-primary text-sm font-bold rounded">
                Ler mais
              </button>
            </div>
          </div>

          <div class="inline-flex mt-3">
            <div class="author flex items-center">
              <Icon type="md-person" class="text-gray-600" />
              <div class="ml-1">
                <span class="text-xs tracking-tighter text-gray-700">
                  <a href="#" class="text-gray-600 tracking-wide">{{
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

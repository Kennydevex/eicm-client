<template>
  <div class="flex flex-col justify-center m-5">
    <div class="relative py-1 sm:max-w-md sm:mx-auto">
      <div
        class="absolute inset-0 transform shadow-lg sm:rounded-3xl -skew-y-2 bg-gradient-to-r from-primary to-light-blue-500 sm:skew-y-0 sm:-rotate-3"
      ></div>
      <div class="relative px-3 py-5 bg-white shadow-lg sm:rounded-3xl">
        <div class="max-w-md mx-auto">
          <div>
            <div class="flex flex-col items-center justify-center">
              <div
                class="inline-flex w-24 h-24 overflow-hidden border border-gray-200 rounded-full shadow-lg md:h-32 md:w-32"
              >
                <img
                  :src="`${publicURL}/uploads/avatars/${team.avatar}`"
                  alt=""
                  class="w-full h-full"
                />
              </div>

              <div class="w-full pb-2 text-center border-b">
                <h2 class="mt-3 text-lg font-semibold text-gray-800">
                  {{ team.person.name }}
                </h2>
                <h6 class="mt-1 text-sm font-semibold text-gray-600 ">
                  {{ team.charges[0].name }}
                </h6>
                <p class="mt-2 text-xs text-center text-gray-500">
                  {{ team.charges[0].description }}
                </p>
              </div>

              <div>
                <ul class="flex flex-row mt-3 space-x-2">
                  <li v-if="team.facebook">
                    <a
                      :href="team.facebook"
                      target="_blank"
                      class="flex items-center justify-center w-8 h-8 text-gray-800 bg-gray-300 border-gray-800 rounded-full group hover:bg-gray-600"
                    >
                      <Icon
                        size="16"
                        class="text-primary group-hover:text-white"
                        type="logo-facebook"
                      />
                    </a>
                  </li>
                  <li v-if="team.twitter">
                    <a
                      :href="team.twitter"
                      target="_blank"
                      class="flex items-center justify-center w-8 h-8 text-gray-800 bg-gray-300 border-gray-800 rounded-full group hover:bg-gray-600"
                    >
                      <Icon
                        size="16"
                        class="text-primary group-hover:text-white"
                        type="logo-twitter"
                      />
                    </a>
                  </li>
                  <li v-if="team.linkedin">
                    <a
                      :href="team.linkedin"
                      target="_blank"
                      class="flex items-center justify-center w-8 h-8 text-gray-800 bg-gray-300 border-gray-800 rounded-full group hover:bg-gray-600"
                    >
                      <Icon
                        size="16"
                        class="text-primary group-hover:text-white"
                        type="logo-linkedin"
                      />
                    </a>
                  </li>
                  <li v-if="team.email">
                    <a
                      :href="`mailto:${team.email}`"
                      class="flex items-center justify-center w-8 h-8 text-gray-800 bg-gray-300 border-gray-800 rounded-full group hover:bg-gray-600"
                    >
                      <Icon
                        size="16"
                        class="text-primary group-hover:text-white"
                        type="md-mail"
                      />
                    </a>
                  </li>
                </ul>
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
    team: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>

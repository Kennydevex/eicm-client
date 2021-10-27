<template>
  <div
    class="flex items-center justify-center max-w-md p-5 m-8 bg-white rounded-lg shadow-lg sm:rounded-none sm:shadow-none"
  >
    <div class="flex flex-col items-center justify-center">
      <div
        class="inline-flex w-24 h-24 overflow-hidden border-2 border-gray-200 rounded-full shadow-none sm:shadow-lg"
      >
        <img
          :src="`${publicURL}/uploads/avatars/${team.avatar}`"
          alt=""
          class="w-full h-full"
        />
      </div>

      <div class="w-full pb-2 text-center border-b">
        <h2 class="mt-3 text-lg font-semibold text-gray-600">
          {{ team.person.name }}
        </h2>
        <h6 class="mt-1 text-sm font-semibold text-gray-500 ">
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
              class="flex items-center justify-center w-8 h-8 text-gray-800 bg-gray-300 border-gray-600 rounded-full group hover:bg-gray-500"
            >
              <fa
                class="text-primary group-hover:text-white"
                :icon="['fab', 'facebook-f']"
              />
            </a>
          </li>
          <li v-if="team.twitter">
            <a
              :href="team.twitter"
              target="_blank"
              class="flex items-center justify-center w-8 h-8 text-gray-800 bg-gray-300 border-gray-600 rounded-full group hover:bg-gray-500"
            >
              <fa
                class="text-primary group-hover:text-white"
                :icon="['fab', 'twitter']"
              />
            </a>
          </li>
          <li v-if="team.linkedin">
            <a
              :href="team.linkedin"
              target="_blank"
              class="flex items-center justify-center w-8 h-8 text-gray-800 bg-gray-300 border-gray-600 rounded-full group hover:bg-gray-500"
            >
              <fa
                class="text-primary group-hover:text-white"
                :icon="['fab', 'linkedin-in']"
              />
            </a>
          </li>
          <li v-if="team.email">
            <a
              :href="`mailto:${team.email}`"
              class="flex items-center justify-center w-8 h-8 text-gray-800 bg-gray-300 border-gray-600 rounded-full group hover:bg-gray-500"
            >
              <fa class="text-primary group-hover:text-white" icon="envelope" />
            </a>
          </li>
        </ul>
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

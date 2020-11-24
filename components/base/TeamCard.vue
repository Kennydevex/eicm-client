<template>
  <div
    class="w-10/12 bg-white p-6 rounded-lg border border-gray-200 shadow-2xl flex items-center justify-center"
  >
    <div class="flex flex-col items-center justify-center">
      <div
        class="inline-flex shadow-lg border border-gray-200 rounded-full overflow-hidden h-24 w-24 md:h-32 md:w-32"
      >
        <img
          :src="`${publicURL}/uploads/avatars/${team.avatar}`"
          alt=""
          class="h-full w-full"
        />
      </div>

      <div class="border-b text-center w-full pb-2">
        <h2 class="mt-3 font-semibold text-lg text-gray-800">
          {{ team.person.name }}
        </h2>
        <h6 class="mt-1 text-sm font-semibold text-gray-600 ">
          {{ team.charges[0].name }}
        </h6>
        <p class="text-xs text-gray-500 text-center mt-2">
          {{ team.charges[0].description }}
        </p>
      </div>

      <div>
        <ul class="flex flex-row mt-3 space-x-2">
          <li v-if="team.facebook">
            <a
              :href="team.facebook"
              target="_blank"
              class="group flex items-center justify-center h-8 w-8 bg-gray-300 hover:bg-gray-600 rounded-full text-gray-800 border-gray-800"
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
              class="group flex items-center justify-center h-8 w-8 bg-gray-300 hover:bg-gray-600 rounded-full text-gray-800 border-gray-800"
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
              class="group flex items-center justify-center h-8 w-8 bg-gray-300 hover:bg-gray-600 rounded-full text-gray-800 border-gray-800"
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
              class="group flex items-center justify-center h-8 w-8 bg-gray-300 hover:bg-gray-600 rounded-full text-gray-800 border-gray-800"
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

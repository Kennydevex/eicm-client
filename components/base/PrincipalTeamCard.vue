<template>
  <div
    class="overflow-hidden p-6 m-3 bg-transparent md:w-64 md:h-64"
  >
    <img
      class="h-32 w-32 rounded-full mx-auto"
      :src=" team.avatar || 'logo.png'"
    />
    <div class="mt-3 text-center">
      <h2 class="text-xl tracking-wide select-none">{{ team.name }}</h2>
      <div class="text-purple-600 font-semibold tracking-wider select-none">
        Diretor
      </div>
      <div class="text-gray-600 font-normal">{{ team.email }}</div>
      <div class="text-gray-700">{{ team.phone }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrincipalTeamCard",
  props: ["team"],
  data: function() {
    return {};
  },
  methods: {}
};
</script>

<style scoped></style>

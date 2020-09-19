<template>
  <div class="p-6 overflow-hidden bg-transparent shadow-xl bg-white rounded-lg">
    <img
      class="h-32 w-32 rounded-full mx-auto"
      :src="team.avatar || 'logo.png'"
    />
    <div class="mt-3 text-center block">
      <div
        class="text-gray-700 text-base font-bold tracking-widest select-none"
      >
        Diretor
      </div>
      <h2
        class="text-2xl tracking-wider select-none capitalize font-semibold text-gray-800"
      >
        {{ team.name }}
      </h2>

      <div class="mt-2 p-3 bg-primary rounded-lg">
        <div class="text-gray-300 text-sm tracking-wider leading-relaxed">
          <Icon type="md-mail" /> {{ team.email }}
        </div>
        <div class="text-gray-300 text-sm tracking-wider leading-relaxed">
          <Icon type="md-call" /> {{ team.phone }}
        </div>
      </div>
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

<template>
  <div class="container mx-auto px-3 my-16 ">
    <div class="justify-evenly items-center md:flex">
      <template v-for="(team, index) in teams">
        <base-principal-team-card :team="team" :key="index" />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeTeams",
  data: function() {
    return {
      teams: [
        {
          name: "Donaciano Oliveira",
          position: "Diretor",
          phone: "9187599",
          email: "dona@gmail.com",
          avatar: "teams/team1.png"
        },
        {
          name: "Santos Oliveira",
          position: "Sub-diretor",
          phone: "9197599",
          email: "santos@gmail.com",
          avatar: "teams/team2.png"
        },

        {
          name: "Katia Oliveira",
          position: "Sub-diretora",
          phone: "9197599",
          email: "santos@gmail.com",
          avatar: "teams/team3.png"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style scoped></style>

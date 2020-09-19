<template>
  <div class="mb-8">
    <div>
      <team-page-header :title="'Corpo Diretivo'"></team-page-header>
    </div>

    <div class="container m-auto px-3">
      <Row :gutter="24" type="flex" justify="center">
        <Col
        class="mt-4"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          v-for="(team, t) in teams"
          :key="t"
        >
          <base-principal-team-card :team="team"></base-principal-team-card>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Team",
  layout: "landing",

  data: function() {
    return {
      teams: [
        {
          name: "Donaciano Oliveira",
          position: "Diretor",
          phone: "9187599",
          email: "dona@gmail.com",
          avatar: "/teams/team1.png"
        },
        {
          name: "Santos Oliveira",
          position: "Sub-diretor",
          phone: "9197599",
          email: "santos@gmail.com",
          avatar: "/teams/team2.png"
        },

        {
          name: "Katia Oliveira",
          position: "Sub-diretora",
          phone: "9197599",
          email: "santos@gmail.com",
          avatar: "/teams/team3.png"
        },

        {
          name: "Katia Oliveira",
          position: "Sub-diretora",
          phone: "9197599",
          email: "santos@gmail.com",
          avatar: "/teams/team3.png"
        },

         {
          name: "Katia Oliveira",
          position: "Sub-diretora",
          phone: "9197599",
          email: "santos@gmail.com",
          avatar: "/teams/team3.png"
        },

         {
          name: "Katia Oliveira",
          position: "Sub-diretora",
          phone: "9197599",
          email: "santos@gmail.com",
          avatar: "/teams/team3.png"
        }
      ]
    };
  },
  methods: {},
  components: {
    TeamPageHeader: () => import("@/views/sections/TeamPageHeader")
  }
};
</script>

<style scoped></style>

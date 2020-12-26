<template>
  <div class="mb-8">
    <div>
      <team-page-header :title="'Corpo Diretivo'"></team-page-header>
    </div>

    <div class="container m-auto">
      <Row :gutter="16" type="flex" justify="center">
        <Col
          class="flex justify-center mt-4"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          v-for="(team, t) in teams"
          :key="t"
        >
          <base-team-card :team="team" :key="index" />
        </Col>
      </Row>
    </div>
    <home-footer :bgColor="'#F3F4F6'"></home-footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Team",
  layout: "landing",

  data: function() {
    return {};
  },
  methods: {},
  components: {
    TeamPageHeader: () => import("@/views/sections/TeamPageHeader"),
    HomeFooter: () => import("@/components/frontend/sections/HomeFooter")
  },
  computed: {
    ...mapGetters({
      teams: "employees/principal_teams"
    })
  }
};
</script>

<style scoped></style>

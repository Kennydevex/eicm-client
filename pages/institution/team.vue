<template>
  <div class="mb-8">
    <div>
      <team-page-header :title="'Corpo Diretivo'"></team-page-header>
    </div>

    <div class="container m-auto px-3">
      <Row :gutter="16" type="flex" justify="center">
        <Col
          class="mt-4 flex justify-center"
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
    TeamPageHeader: () => import("@/views/sections/TeamPageHeader")
  },
  computed: {
    ...mapGetters({
      teams: "employees/principal_teams"
    })
  }
};
</script>

<style scoped></style>

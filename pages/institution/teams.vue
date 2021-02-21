<template>
  <div>
    <div>
      <core-landing-page-header>Corpo Diretivo</core-landing-page-header>
    </div>
    <div class="container m-auto">
      <el-row class="flex items-center justify-center">
        <el-col
          class="flex justify-center"
          span="24"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          v-for="(team, t) in teams"
          :key="t"
        >
          <base-team-card :team="team" :key="index" />
        </el-col>
      </el-row>
    </div>
    <home-footer :bgColor="'#F3F4F6'"></home-footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Teams",
  layout: "landing",

  computed: {
    ...mapGetters({
      teams: "employees/principal_teams"
    })
  },

  methods: {}
};
</script>

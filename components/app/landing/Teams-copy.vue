<template>
  <div class="justify-center w-full py-12 pb-8 bg-white">
    <div class="container px-3 m-auto ">
      <el-row :gutter="16">
        <el-col :span="24" class="mb-10">
          <base-section-title>Equipa</base-section-title>
        </el-col>

        <el-row>
          <template v-for="(team, index) in teams">
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :key="index">
              <base-team-card :team="team" :key="index" />
            </el-col>
          </template>
        </el-row>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeTeams",
  props: {
    teams: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>

<style scoped></style>

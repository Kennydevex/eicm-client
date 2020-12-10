<template>
  <div class="bg-white w-full py-12 justify-center">
    <div class=" container px-3 mx-auto">
      <Row type="flex" justify="center" align="middle" :gutter="16">
        <Col span="24" class="mb-10">
          <base-home-section-title>Equipa</base-home-section-title>
        </Col>

        <template v-for="(team, index) in teams">
          <Col span="24" :xs="24" :sm="12" :md="8" :key="index" class="mb-6 flex justify-center">
            <base-team-card :team="team" :key="index"/>
          </Col>
        </template>
      </Row>
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
  },
  
};
</script>

<style scoped></style>

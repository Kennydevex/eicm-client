<template>
  <div class="justify-center w-full py-12 pb-8 bg-white">
    <div class="container m-auto px-3  ">
      <Row type="flex" justify="center" align="middle" :gutter="16">
        <Col span="24" class="mb-10">
          <base-home-section-title>Equipa</base-home-section-title>
        </Col>

        <template v-for="(team, index) in teams">
          <Col span="24" :xs="24" :sm="12" :md="8" :lg="6" :key="index" class="flex justify-center mb-3">
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

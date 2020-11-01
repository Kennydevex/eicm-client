<template>
  <div>
    <Row class="mb-3" :gutter="16">
      <Col span="12">
        <div>
          <Button type="primary" @click.stop="onCreateSchool()"
            >Registar Instituição</Button
          >
          <create-school></create-school>
        </div>
      </Col>
    </Row>
    <Row :gutter="16">
      <Col
        span="24"
        :xs="24"
        :sm="12"
        v-for="(school, s) in schools"
        :key="s"
        class="mb-3"
      >
        <base-school-presentation
          @onUpdate="onUpdateSchool($event)"
          :school="school"
        ></base-school-presentation>
        <update-school></update-school>
      </Col>
    </Row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SchoolPage",
  layout: "admin",

  async fetch({ store }) {
    await store.dispatch("schools/getUsers", 1);
  },

  data() {
    return {
      sending: {}
    };
  },

  created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_SCHOOLS_DATA", () => {
        this.getSchools();
      });
    }
  },

  computed: {
    ...mapGetters({
      schools: "schools/schools"
    })
  },

  methods: {
    async getSchools() {
      await this.$store.dispatch("schools/getSchools");
    },
    async onCreateSchool() {
      this.handleModal("schools/toggleCreateSchoolDialog");
    },
    onUpdateSchool(id) {
      try {
        this.$set(this.sending, id, true);
        this.$axios.$get(`schools/${id}`).then(res => {
          process.client
            ? window.getApp.$emit("APP_ON_UPDATE_SCHOOL", res.data)
            : "";
          this.$set(this.sending, id, false);
          this.handleModal("schools/toggleUpdateSchoolDialog");
        });
      } catch (error) {}
    }
  },

  components: {
    CreateSchool: () => import("@/components/backend/schools/CreateSchool"),
    UpdateSchool: () => import("@/components/backend/schools/UpdateSchool")
  }
};
</script>

<style lang="scss" scoped></style>

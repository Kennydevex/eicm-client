<template>
  <div>
    <Row>
      <Col span="24">
        <Tabs>
          <TabPane label="Geral" name="institution_info">
            <Row>
              <Col span="24">
                <Button type="primary" @click.stop="onCreateSchool()"
                  >Registar Instituição</Button
                >
                <create-school></create-school>
              </Col>

              <Col span="24" class="mt-5">
                <base-school-presentation
                  @onUpdate="onUpdateSchool($event)"
                  :school="schools[0]"
                ></base-school-presentation>
                <update-school></update-school>
              </Col>
            </Row>
          </TabPane>
          <TabPane label="Diretrizes" name="guidelines">
            <Row>
              <Col span="24">
                <list-guidelines></list-guidelines>
              </Col>
            </Row>
          </TabPane>
          <TabPane label="Marcos Históricos" name="marks">
            <Row>
              <Col span="24">
                <list-marks></list-marks>
              </Col>
            </Row>
          </TabPane>
          <TabPane label="Mural" name="murals">
            <Row>
              <Col span="24">
                <list-murals></list-murals>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
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
    await store.dispatch("guidelines/getGuidelines");
    await store.dispatch("marks/getMarks");
    await store.dispatch("murals/getMurals");
  },

  data() {
    return {
      sending: {},
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
    UpdateSchool: () => import("@/components/backend/schools/UpdateSchool"),
    ListGuidelines: () =>
      import("@/components/backend/guidelines/ListGuidelines"),
    ListMarks: () => import("@/components/backend/marks/ListMarks"),
    ListMurals: () => import("@/components/backend/murals/ListMurals")
  }
};
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <el-row>
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="antialiased text-gray-700 "
              >Editar Instiruição "<span class="italic text-gray-500">{{
                formData.name
              }}</span
              >"</span
            >
          </div>

          <div>
            <appBackendFormsSchool
              :creating="creatingSchool"
              :formData="formData"
              ref="schoolForm"
            ></appBackendFormsSchool>
          </div>

          <el-divider></el-divider>

          <div class="flex items-end justify-end">
            <el-button @click.stop="cancelSchoolForm()">Cancelar</el-button>
            <el-button type="primary" @click.stop="onUpdateSchool()"
              >Guardar Arterações</el-button
            >
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "EditSchool",
  layout: "admin",

  async asyncData({ $axios, params }) {
    const { data } = await $axios.$get(`/schools/${params.slug}`);
    return { formData: data };
  },

  async fetch({ store }) {
    await store.dispatch("tags/getTags");
    await store.dispatch("categories/getCategories");
  },
  data() {
    return {
      creatingSchool: false,
      formData: {
        id: "",
        name: "",
        abbr: "",
        about: "",
        history: "",
        slogan: "",
        logo: "default.svg",
        cover: "default.svg",
        opning: "",
        primary_color: "",
        secundary_color: "",
        director_msg: "",
        banner_msg: "",
        banner_img: "",
        contacts: [],
        marks: [],
        guidelines: [],
        murals: [],
        location: {
          id: "",
          country: "Cabo Verde",
          state: "São Vicente",
          county: "São Vicente",
          parish: "Nossa Srª da Luz",
          city: "Mindelo",
          zone: "Laginha",
          street: "Rua Faed",
          postcode: "7100",
          geo: {
            id: "",
            lat: "",
            lng: ""
          }
        }
      }
    };
  },
  mounted() {
    this.$refs.schoolForm.initFilesUploaded();
  },

  methods: {
    async onUpdateSchool() {
      this.$refs.schoolForm.updateSchool();
    },

    async cancelSchoolForm() {
      this.$refs.schoolForm.cancelSchoolForm();
      this.redirectToPageByName("school");
    }
  }
};
</script>

<style lang="scss" scoped></style>

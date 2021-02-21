<template>
  <div>
    <el-row>
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="antialiased text-gray-700 "
              >Registar um novo artigo</span
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
            <el-button type="primary" @click.stop="onSaveSchool()"
              >Guardar Artigo</el-button
            >
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "CreateSchool",
  layout: "admin",

  data() {
    return {
      creatingSchool: true,

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

  methods: {
    async onSaveSchool() {
      await this.$refs.schoolForm.addSchool();
    },

    async cancelSchoolForm() {
      this.$refs.schoolForm.cancelSchoolForm();
      this.redirectToPageByName("school");
    }
  }
};
</script>

<style lang="scss" scoped></style>

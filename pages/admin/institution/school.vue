<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button
          :loading_data="loading_data"
          size="medium"
          type="primary"
          @click.stop="redirectToPageByName('create-school')"
          ><span v-if="!loading_data">Criar Nova Instituição</span>
          <span v-else>Solicitando dados...</span></el-button
        >
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24">
        <appBackendCommonDataTable
          :deleteEntity="'schools'"
          :updateEntity="'APP_UPDATE_SCHOOLS_DATA'"
          :tableFields="tableFields"
          :searchParams="[{ name: 'Nome', key: 'name' }]"
          :sendingData="sending"
          :dataSourse="schools"
          @handleEdit="onEditSchool($event)"
          @handleDelete="onDeleteSchool($event)"
        >
        </appBackendCommonDataTable>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { handleActivations, deleteDatas } from "@/mixins/appRequest";
import { mapGetters } from "vuex";

export default {
  name: "SchoolsIndex",
  mixins: [handleActivations, deleteDatas],

  async fetch({ store }) {
    await store.dispatch("schools/getSchools");
  },

  data() {
    return {
      selected: [],
      tableFields: [
        { label: "Abreviatura", name: "abbr" },
        { label: "Nome", name: "name" }
      ],
      sending: {},
      singleSchool: {},
      loading_data: false
    };
  },

  computed: {
    ...mapGetters({
      schools: "schools/schools"
    })
  },

  async created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_SCHOOLS_DATA", () => {
        this.getSchools(1);
      });
    }
  },

  methods: {
    async onCreateSchool() {
      this.redirectToPageByName("create-school");
    },

    async onEditSchool(ev) {
      await this.redirectToPageWithParam("edit-school", ev[1].slug);
    },

    onDeleteSchool(ev) {
      this.onDelete("schools", ev[1].id, "APP_UPDATE_SCHOOLS_DATA");
    },

    async getSchools(page) {
      await this.$store.dispatch("schools/getSchools", page);
    },

    
  }
};
</script>

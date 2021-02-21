<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button size="medium" type="primary" @click.stop="onCreateMark()"
          >Registar Novo Marco</el-button
        >
        <appBackendCommonRegisterDialog
          @save-data="onSaveMark()"
          @update-data="onUpdateMark()"
          @cancel-data="cancelMarkForm()"
          :dialogVisible="create_mark_dialog"
          :dialogTitle="mark_dialog_title"
          :dialogWidth="400"
          :creatingRecord="creatingMark"
        >
          <appBackendFormsMark
            :creating="creatingMark"
            :formData="formData"
            ref="markForm"
          ></appBackendFormsMark>
        </appBackendCommonRegisterDialog>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24">
        <appBackendCommonDataTable
        :deleteEntity="'marks'"
          :updateEntity="'APP_UPDATE_MARKS_DATA'"
          :tableFields="tableFields"
          :searchParams="[{ name: 'Designação', key: 'designation' }]"
          :sendingData="sending"
          :dataSourse="marks"
          @handleEdit="onEditMark($event)"
          @handleDelete="onDeleteMark($event)"
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
  name: "MarksIndex",
  mixins: [handleActivations, deleteDatas],

  async fetch({ store }) {
    await store.dispatch("marks/getMarks", 1);
  },

  data() {
    return {
      creatingMark: "",
      selected: [],
      tableFields: [
        { label: "Designação", name: "designation" },
        { label: "Descrição", name: "content" }
      ],
      sending: {},
      singleMark: {},
      formData: {
       id: "",
        designation: "",
        content: "",
        begin: "",
        end: ""
      }
    };
  },

  computed: {
    ...mapGetters({
      marks: "marks/marks"
      //   pagination: "marks/pagination"
    }),
    create_mark_dialog: {
      get() {
        return this.$store.state.marks.create_mark_dialog;
      },
      set(val) {
        this.$store.commit("marks/create_mark_dialog", val);
      }
    },
    mark_dialog_title() {
      return this.creatingMark ? "Registar Marco" : "Editar Marco";
    }
  },

  async created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_MARKS_DATA", () => {
        this.getMarks(1);
      });
    }
  },

  methods: {
    async cancelMarkForm() {
      this.$refs.markForm.cancelMarkForm();
    },
    async onSaveMark() {
      this.$refs.markForm.addMark();
    },
    async onUpdateMark() {
      this.$refs.markForm.updateMark();
    },
    async onCreateMark() {
      this.resetFormData();
      this.creatingMark = true;
      await this.handleModal("marks/toggleCreateMarkDialog");
    },

    async onEditMark(ev) {
      this.creatingMark = false;
      try {
        this.$set(this.sending, ev[1].id, true);
        await this.$axios.$get(`marks/${ev[1].id}`).then(res => {
          this.singleMark = res.data;
          this.formData = this.singleMark;
          this.handleModal("marks/toggleCreateMarkDialog");
          this.$set(this.sending, ev[1].id, false);
        });
      } catch (error) {
        this.actionMsg("Algo correu mal", "error");
      }
    },

    onDeleteMark(ev) {
      this.onDelete("marks", ev[1].id, "APP_UPDATE_MARKS_DATA");
    },

    resetFormData() {
      this.formData = {
       id: "",
        designation: "",
        content: "",
        begin: "",
        end: ""
      };
    },

    async getMarks(page) {
      await this.$store.dispatch("marks/getMarks", page);
    }
  }
};
</script>

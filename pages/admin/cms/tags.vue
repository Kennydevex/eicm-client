<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button size="medium" type="primary" @click.stop="onCreateTag()"
          >Registar Novo Marcador</el-button
        >
        <appBackendCommonRegisterDialog
          @save-data="onSaveTag()"
          @update-data="onUpdateTag()"
          @cancel-data="cancelTagForm()"
          :dialogVisible="create_tag_dialog"
          :dialogTitle="tag_dialog_title"
          :dialogWidth="400"
          :creatingRecord="creatingTag"
        >
          <appBackendFormsTag
            :creating="creatingTag"
            :formData="formData"
            ref="tagForm"
          ></appBackendFormsTag>
        </appBackendCommonRegisterDialog>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24">
        <appBackendCommonDataTable
        :deleteEntity="'tags'"
          :updateEntity="'APP_UPDATE_TAGS_DATA'"
          :tableFields="tableFields"
          :searchParams="[{ name: 'Nome', key: 'name' }]"
          :sendingData="sending"
          :dataSourse="tags"
          @handleEdit="onEditTag($event)"
          @handleDelete="onDeleteTag($event)"
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
  name: "TagsIndex",
  mixins: [handleActivations, deleteDatas],

  async fetch({ store }) {
    await store.dispatch("tags/getTags", 1);
  },

  data() {
    return {
      creatingTag: "",
      selected: [],
      tableFields: [
        { label: "Nome", name: "name" },
        { label: "Descrição", name: "description" }
      ],
      sending: {},
      singleTag: {},
      formData: {
        id: "",
        name: "",
        description: "",
      }
    };
  },

  computed: {
    ...mapGetters({
      tags: "tags/tags"
      //   pagination: "tags/pagination"
    }),
    create_tag_dialog: {
      get() {
        return this.$store.state.tags.create_tag_dialog;
      },
      set(val) {
        this.$store.commit("tags/create_tag_dialog", val);
      }
    },
    tag_dialog_title() {
      return this.creatingTag ? "Registar Marcador" : "Editar Marcador";
    }
  },

  async created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_TAGS_DATA", () => {
        this.getTags(1);
      });
    }
  },

  methods: {
    async cancelTagForm() {
      this.$refs.tagForm.cancelTagForm();
    },
    async onSaveTag() {
      this.$refs.tagForm.addTag();
    },
    async onUpdateTag() {
      this.$refs.tagForm.updateTag();
    },
    async onCreateTag() {
      this.resetFormData();
      this.creatingTag = true;
      await this.handleModal("tags/toggleCreateTagDialog");
    },

    async onEditTag(ev) {
      this.creatingTag = false;
      try {
        this.$set(this.sending, ev[1].id, true);
        await this.$axios.$get(`tags/${ev[1].id}`).then(res => {
          this.singleTag = res.data;
          this.formData = this.singleTag;
          this.handleModal("tags/toggleCreateTagDialog");
          this.$set(this.sending, ev[1].id, false);
        });
      } catch (error) {
        this.actionMsg("Algo correu mal", "error");
      }
    },

    onDeleteTag(ev) {
      this.onDelete("tags", ev[1].id, "APP_UPDATE_TAGS_DATA");
    },

    resetFormData() {
      this.formData = {
        id: "",
        name: "",
        description: "",
      };
    },

    async getTags(page) {
      await this.$store.dispatch("tags/getTags", page);
    }
  }
};
</script>

<template>
  <Row>
    <Col span="24">
      <Button type="primary" @click.stop="onCreateMark()">
        <span>Novo Marcador</span>
      </Button>
      <create-mark></create-mark>
    </Col>

    <Col span="24" class="mt-5">
      <Table
        border
        :columns="marks_header"
        :data="marks"
        context-menu
        show-context-menu
        @on-contextmenu="handleContextMenu"
        :class="on_load_data_to_update ? 'cursor-wait' : ''"
      >
        <template slot="contextMenu">
          <DropdownItem @click.native="handleContextMenuEdit"
            >Editar</DropdownItem
          >
          <DropdownItem
            @click.native="handleContextMenuDelete"
            style="color: #ed4014"
            >Eliminar</DropdownItem
          >
        </template>

        <template slot-scope="{ row }" slot="content">
          <span>{{ row.content | truncate(50) }}</span>
        </template>
        <template slot-scope="{ row }" slot="begin">
          <span>{{ $moment(row.begin).format("ll") }}</span>
        </template>

        <template slot-scope="{ row }" slot="end">
          <span>{{
            row.end ? $moment(row.end).format("ll") : "A determinar"
          }}</span>
        </template>
      </Table>
      <div>
        <update-mark></update-mark>
      </div>
    </Col>
  </Row>
</template>

<script>
import { mapGetters } from "vuex";
import { deleteDatas, requests } from "@/mixins/appRequest";

export default {
  name: "ListMarks",
  mixins: [deleteDatas, requests],

  data() {
    return {
      on_load_data_to_update: false,
      context_mark: {},
      selected: [],

      marks_header: [
        {
          title: "Deseguinação",
          key: "designation",
          minWidth: 150
        },
        {
          title: "Descrição",
          slot: "content",
          minWidth: 150
        },
        {
          title: "Início",
          slot: "begin",
          width: 160,
          align: "center"
        },
        {
          title: "Fim",
          slot: "end",
          width: 160,
          align: "center"
        }

        // {
        //   title: "Action",
        //   slot: "action",
        //   width: 150,
        //   align: "center"
        // }
      ]
    };
  },

  created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_MARKS_DATA", () => {
        this.getMarks();
      });
    }
  },

  computed: {
    ...mapGetters({ marks: "marks/marks" })
  },

  methods: {
    onCreateMark() {
      this.handleModal("marks/toggleCreateMarkDialog");
    },

    async onUpdateMark(id) {
      // this.$set(this.on_load_data_to_update, id, true);
      this.on_load_data_to_update = true;
      await this.onUpdateData(
        id,
        "marks",
        "APP_ON_UPDATE_MARK",
        "marks/toggleUpdateMarkDialog"
      );
      this.on_load_data_to_update = false;

      // this.$set(this.on_load_data_to_update, id, false);
    },

    async getMarks() {
      await this.$store.dispatch("marks/getMarks");
    },

    handleContextMenu(row) {
      this.context_mark = row;
    },

    handleContextMenuEdit() {
      this.onUpdateMark(this.context_mark.id);
    },
    handleContextMenuDelete() {
      this.onDelete("marks", this.context_mark.id, "APP_UPDATE_MARKS_DATA");
    }
  },

  components: {
    CreateMark: () => import("@/components/backend/marks/CreateMark"),
    UpdateMark: () => import("@/components/backend/marks/UpdateMark")
  }
};
</script>

<style lang="scss" scoped></style>

<template>
  <Row>
    <Col span="24">
      <Button type="primary" @click.stop="onCreateDiscipline()">
        <span>Nova Disciplina</span>
      </Button>
      <create-discipline></create-discipline>
    </Col>

    <Col span="24" class="mt-5">
      <Table
        border
        :columns="disciplines_header"
        :data="disciplines"
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

        <template slot-scope="{ row }" slot="description">
          <span>{{ row.description | truncate(50) }}</span>
        </template>

        <template slot-scope="{ row }" slot="type">
          <span>{{ row.type }}</span>
        </template>
      </Table>
      <div>
        <update-discipline></update-discipline>
      </div>
    </Col>
  </Row>
</template>

<script>
import { mapGetters } from "vuex";
import { deleteDatas, requests } from "@/mixins/appRequest";

export default {
  name: "ListDisciplines",
  mixins: [deleteDatas, requests],

  data() {
    return {
      on_load_data_to_update: false,
      context_discipline: {},
      selected: [],

      disciplines_header: [
        {
          title: "Nome",
          key: "name",
          minWidth: 150,
          sortable: true
        },
        {
          title: "Descrição",
          slot: "description",
          minWidth: 150
        },
        {
          title: "Tipo",
          slot: "type",
          width: 100
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
      window.getApp.$on("APP_UPDATE_DISCIPLINES_DATA", () => {
        this.getDisciplines();
      });
    }
  },

  computed: {
    ...mapGetters({ disciplines: "disciplines/disciplines" })
  },

  methods: {
    onCreateDiscipline() {
      this.handleModal("disciplines/toggleCreateDisciplineDialog");
    },

    async onUpdateDiscipline(id) {
      // this.$set(this.on_load_data_to_update, id, true);
      this.on_load_data_to_update = true;
      await this.onUpdateData(
        id,
        "disciplines",
        "APP_ON_UPDATE_DISCIPLINE",
        "disciplines/toggleUpdateDisciplineDialog"
      );
      this.on_load_data_to_update = false;

      // this.$set(this.on_load_data_to_update, id, false);
    },

    async getDisciplines() {
      await this.$store.dispatch("disciplines/getDisciplines");
    },

    handleContextMenu(row) {
      this.context_discipline = row;
    },

    handleContextMenuEdit() {
      this.onUpdateDiscipline(this.context_discipline.id);
    },
    handleContextMenuDelete() {
      this.onDelete(
        "disciplines",
        this.context_discipline.id,
        "APP_UPDATE_DISCIPLINES_DATA"
      );
    }
  },

  components: {
    CreateDiscipline: () =>
      import("@/components/backend/disciplines/CreateDiscipline"),
    UpdateDiscipline: () =>
      import("@/components/backend/disciplines/UpdateDiscipline")
  }
};
</script>

<style lang="scss" scoped></style>

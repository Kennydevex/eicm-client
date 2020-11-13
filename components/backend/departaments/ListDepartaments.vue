<template>
  <Row>
    <Col span="24">
      <Button type="primary" @click.stop="onCreateDepartament()">
        <span>Novo Departamento</span>
      </Button>
      <create-departament></create-departament>
    </Col>

    <Col span="24" class="mt-5">
      <Table
        border
        :columns="departaments_header"
        :data="departaments"
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

      </Table>
      <div>
        <update-departament></update-departament>
      </div>
    </Col>
  </Row>
</template>

<script>
import { mapGetters } from "vuex";
import { deleteDatas, requests } from "@/mixins/appRequest";

export default {
  name: "ListDepartaments",
  mixins: [deleteDatas, requests],

  data() {
    return {
      on_load_data_to_update: false,
      context_departament: {},
      selected: [],

      departaments_header: [
        {
          title: "Nome",
          key: "name",
          minWidth: 150
        },
        {
          title: "Descrição",
          slot: "description",
          minWidth: 150
        },
       
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
      window.getApp.$on("APP_UPDATE_DEPARTAMENTS_DATA", () => {
        this.getDepartaments();
      });
    }
  },

  computed: {
    ...mapGetters({ departaments: "departaments/departaments" })
  },

  methods: {
    onCreateDepartament() {
      this.handleModal("departaments/toggleCreateDepartamentDialog");
    },

    async onUpdateDepartament(id) {
      // this.$set(this.on_load_data_to_update, id, true);
      this.on_load_data_to_update = true;
      await this.onUpdateData(
        id,
        "departaments",
        "APP_ON_UPDATE_DEPARTAMENT",
        "departaments/toggleUpdateDepartamentDialog"
      );
      this.on_load_data_to_update = false;

      // this.$set(this.on_load_data_to_update, id, false);
    },

    async getDepartaments() {
      await this.$store.dispatch("departaments/getDepartaments");
    },

    handleContextMenu(row) {
      this.context_departament = row;
    },

    handleContextMenuEdit() {
      this.onUpdateDepartament(this.context_departament.id);
    },
    handleContextMenuDelete() {
      this.onDelete(
        "departaments",
        this.context_departament.id,
        "APP_UPDATE_DEPARTAMENTS_DATA"
      );
    }
  },

  components: {
    CreateDepartament: () => import("@/components/backend/departaments/CreateDepartament"),
    UpdateDepartament: () => import("@/components/backend/departaments/UpdateDepartament")
  }
};
</script>

<style lang="scss" scoped></style>

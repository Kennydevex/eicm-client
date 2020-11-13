<template>
  <Row>
    <Col span="24">
      Mini Estatistica
    </Col>

    <Col span="24" class="my-3">
      <Button
        :loading="creating_employee"
        type="primary"
        @click.stop="onCreateEmployee()"
      >
        <span v-if="!creating_employee">Novo Colaborador</span>
        <span v-else>Solicitando...</span></Button
      >
      <Button
        :loading="loading_charges"
        type="primary"
        @click.stop="onListCharges()"
      >
        <span v-if="!loading_charges">Gerir Cargos</span>
        <span v-else>Carregando Cargos...</span></Button
      >
      <Button v-if="selected.length > 1" type="primary"
        >Elminar Selecionados</Button
      >
      <create-employee></create-employee>
      <update-employee></update-employee>
      <charges-index></charges-index>
    </Col>

    <Col span="24">
      <Table
        border
        :columns="employees_header"
        :data="employees"
        context-menu
        show-context-menu
        @on-contextmenu="handleContextMenu"
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
          <DropdownItem @click.native="handleContextMenuActive">{{
            context_employee.active ? "Desativar" : "Ativar"
          }}</DropdownItem>
        </template>
        <!--<template slot-scope="{ row }" slot="avatar">
          <div class="h-full w-full flex items-center justify-center">
            <img
              class="w-8 rounded-full"
              :src="`${publicURL}/uploads/avatars/${row.avatar}`"
              :alt="row.name"
            />
          </div>
        </template>-->
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.person.name }}</strong>
        </template>
        <template slot-scope="{ row }" slot="email">
          <span>{{ row.email }}</span>
        </template>
        <template slot-scope="{ row }" slot="active">
          <Tag type="dot" :color="row.active ? 'primary' : 'warning'">{{
            row.active ? "Ativo" : "Desativo"
          }}</Tag>
        </template>
        <template slot-scope="{ row }" slot="is_teacher">
          <Tag type="dot" :color="row.is_teacher ? 'primary' : 'warning'">{{
            row.is_teacher ? "S" : "N"
          }}</Tag>
        </template>
        <template slot-scope="{ row }" slot="sync_user_account">
          <Tag
            type="dot"
            :color="row.sync_user_account ? 'primary' : 'warning'"
            >{{ row.sync_user_account ? "Registada" : "Sem conta" }}</Tag
          >
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button
            type="primary"
            size="small"
            style="margin-right: 5px"
            :loading="on_load_data_to_update[row.id]"
            @click="onUpdateEmployee(row.id)"
          >
            <Icon v-if="!on_load_data_to_update[row.id]" type="md-create" />
          </Button>
          <Button
            type="error"
            size="small"
            :loading="deleting[row.id]"
            @click="onDelete('employees', row.id, 'APP_UPDATE_EMPLOYEES_DATA')"
          >
            <Icon v-if="!deleting[row.id]" type="md-trash"
          /></Button>
        </template>
      </Table>
    </Col>
  </Row>
</template>

<script>
import { mapGetters } from "vuex";
import { requests, handleActivations, deleteDatas } from "@/mixins/appRequest";

export default {
  layout: "admin",
  name: "CollaboratonrsIndex",
  mixins: [handleActivations, deleteDatas, requests],

  async fetch({ store }) {
    await store.dispatch("employees/getEmployees");
  },

  computed: {
    ...mapGetters({
      employees: "employees/employees"
    })
  },

  async created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_EMPLOYEES_DATA", () => {
        this.getEmployees();
      });
    }
  },
  data() {
    return {
      loading_charges: false,
      on_load_data_to_update: {},
      creating_employee: false,
      selected: [],
      context_employee: {},
      single_employee: [],
      employees_header: [
        // {
        //   title: "Perfil",
        //   slot: "avatar",
        //   minWidth: 80
        // },
        {
          title: "Nome",
          slot: "name",
          minWidth: 150
        },
        {
          title: "Email",
          slot: "email",
          minWidth: 180
        },

        {
          title: "Estado",
          slot: "active",
          width: 120,
          align: "center"
        },
        {
          title: "Leciona",
          slot: "is_teacher",
          width: 100,
          align: "center"
        },
        {
          title: "Conta",
          slot: "sync_user_account",
          width: 150,
          align: "center"
        },

        {
          title: "Action",
          slot: "action",
          width: 150,
          align: "center"
        }
      ]
    };
  },

  methods: {
    async onCreateEmployee() {
      this.creating_employee = true;
      await this.loadExtraData();
      this.handleModal("employees/toggleCreateEmployeeDialog");
      this.creating_employee = false;
    },

    async onUpdateEmployee(id) {
      this.$set(this.on_load_data_to_update, id, true);
      await this.loadExtraData();
      await this.onUpdateData(
        id,
        "employees",
        "APP_ON_UPDATE_EMPLOYEE",
        "employees/toggleUpdateEmployeeDialog"
      );
      this.$set(this.on_load_data_to_update, id, false);
    },

    async onListCharges() {
      this.loading_charges = true;
      await this.$store.dispatch("charges/getCharges");
      this.loading_charges = false;
      this.$store.commit("charges/toggleListChargeDialog");
    },

    async loadExtraData() {
      await this.$store.dispatch("charges/getCharges");
    },

    async getEmployees() {
      await this.$store.dispatch("employees/getEmployees");
    },

    handleContextMenu(row) {
      this.context_employee = row;
    },
    handleContextMenuActive() {
      this.toggleStatus(
        "employees/employee-activation",
        this.context_employee.id,
        this.context_employee.active,
        "Colaborador",
        "APP_UPDATE_EMPLOYEES_DATA"
      );
    },

    handleContextMenuEdit() {
      this.onUpdateEmployee(this.context_employee.id);
    },
    handleContextMenuDelete() {
      this.onDelete(
        "employees",
        this.context_employee.id,
        "APP_UPDATE_EMPLOYEES_DATA"
      );
    }
  },

  components: {
    CreateEmployee: () =>
      import("@/components/backend/employees/CreateEmployee"),
    UpdateEmployee: () =>
      import("@/components/backend/employees/UpdateEmployee"),
    ChargesIndex: () => import("@/components/backend/charges/ChargesIndex"),
  }
};
</script>

<style lang="scss" scoped></style>

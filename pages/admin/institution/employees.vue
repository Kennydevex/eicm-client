<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button size="medium" type="primary" @click.stop="onCreateEmployee()"
          >Registo de Colaborador</el-button
        >
        <appBackendCommonRegisterDialog
          @save-data="onSaveEmployee()"
          @update-data="onUpdateEmployee()"
          @cancel-data="cancelEmployeeForm()"
          :dialogVisible="create_employee_dialog"
          :dialogTitle="employee_dialog_title"
          :dialogWidth="400"
          :creatingRecord="creatingEmployee"
        >
          <appBackendFormsEmployee
            :creating="creatingEmployee"
            :formData="formData"
            ref="employeeForm"
          ></appBackendFormsEmployee>
        </appBackendCommonRegisterDialog>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24">
        <appBackendCommonDataTable
          :deleteEntity="'employees'"
          :updateEntity="'APP_UPDATE_EMPLOYEES_DATA'"
          :tableFields="tableFields"
          :searchParams="[{ name: 'Nome', key: 'name' }]"
          :sendingData="sending"
          :dataSourse="employees"
          @handleEdit="onEditEmployee($event)"
          @handleDelete="onDeleteEmployee($event)"
        >
          <template v-slot:column_after>
            <el-table-column header-align="center" align="center" label="Responsabilidade" width="120">
              <template slot-scope="{ row }">
                <el-popover trigger="hover" placement="top">
                  <p class="mb-3">
                    <b>Propessor:</b>
                    {{
                      row.is_teacher ? "Tambem é professor" : "Não é Professor"
                    }}
                    <el-button type="text">Alterar</el-button>
                  </p>
                  <p>
                    <b> Utilizador:</b>
                    <span
                      :class="
                        row.person.user == null || !row.person.user
                          ? 'text-red-400'
                          : 'text-green-600'
                      "
                      >{{
                        row.person.user == null || !row.person.user
                          ? "Sem conta de utilizador"
                          : "Possui conta de utilizador"
                      }}</span
                    >
                  </p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ row.charges[0].name }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>

            <el-table-column header-align="center" align="center" label="Ativação" width="80">
              <template slot-scope="{ row }">
                <el-popover trigger="hover" placement="top">
                  <p>
                    <b>Ativação:</b>
                    <span
                      :class="!row.active ? 'text-red-400' : 'text-green-600'"
                    >
                      {{
                        row.active ? "Colaborador ativo" : "Colaborador inativo"
                      }}
                    </span>

                    <el-button
                      @click="
                        toggleStatus(
                          'employees/employee-activation',
                          row.id,
                          row.active,
                          'Colaborador',
                          'APP_UPDATE_EMPLOYEES_DATA'
                        )
                      "
                      type="text"
                      >{{ row.active ? "Inativar" : "Ativar" }}</el-button
                    >
                  </p>
                  <p>
                    <b>Destaque:</b>
                    {{ row.team ? "Colaborador em destaque" : "Sem Destaque" }}
                    <el-button
                      @click="
                        toggleStatus(
                          'employees/employee-handle-team',
                          row.id,
                          row.team,
                          'Colaborador',
                          'APP_UPDATE_EMPLOYEES_DATA',
                          true
                        )
                      "
                      type="text"
                      >{{ row.team ? "Tirar destaque" : "Destacar" }}</el-button
                    >
                  </p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag
                      :type="row.active ? 'success' : 'info'"
                      size="medium"
                      >{{ row.active ? "Ativo" : "Inativo" }}</el-tag
                    >
                  </div>
                </el-popover>
              </template>
            </el-table-column>
          </template>
        </appBackendCommonDataTable>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { handleActivations, deleteDatas, requests } from "@/mixins/appRequest";
import { mapGetters } from "vuex";

export default {
  name: "EmployeesIndex",
  mixins: [handleActivations, deleteDatas, requests],

  async fetch({ store }) {
    await store.dispatch("employees/getEmployees");
  },

  data() {
    return {
      creatingEmployee: false,
      selected: [],
      tableFields: [
        { label: "Nome", name: "person.name" },
        { label: "Email", name: "email" }
        // { label: "Cargo", name: "charges.0.name" },
      ],
      sending: {},
      singleEmployee: {},
      formData: {
        id: "",
        ic: "",
        email: "",
        facebook: "",
        twitter: "",
        linkedin: "",
        avatar: "default.svg",
        team: false,
        active: false,
        sync_user_account: false,
        is_teacher: false,
        sync_email: false,
        default_password: false,
        person: {
          id: "",
          name: "",
          gender: "m",
          birthday: "",
          phone: "",
          person_id: "",
          school_id: "",
          user: {
            id: "",
            name: "",
            email: "",
            password: ""
          }
        },
        charges: [
          {
            encumbrance: {
              charge_id: "",
              activity_begin: "",
              activity_end: ""
            }
          }
        ]
      }
    };
  },

  computed: {
    ...mapGetters({
      employees: "employees/employees"
    }),
    create_employee_dialog: {
      get() {
        return this.$store.state.employees.create_employee_dialog;
      },
      set(val) {
        this.$store.commit("employees/create_employee_dialog", val);
      }
    },
    employee_dialog_title() {
      return this.creatingEmployee
        ? "Registar Colaborador"
        : "Editar Colaborador";
    }
  },

  async created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_EMPLOYEES_DATA", () => {
        this.getEmployees(1);
      });
    }
  },

  methods: {
    async cancelEmployeeForm() {
      this.$refs.employeeForm.cancelEmployeeForm();
    },
    async onSaveEmployee() {
      this.$refs.employeeForm.addEmployee();
    },
    async onUpdateEmployee() {
      this.$refs.employeeForm.updateEmployee();
    },
    async onCreateEmployee() {
      this.getCharges();
      this.resetFormData();
      this.creatingEmployee = true;
      await this.handleModal("employees/toggleCreateEmployeeDialog");
    },

    async onEditEmployee(ev) {
      this.getCharges();

      this.creatingEmployee = false;
      try {
        this.$set(this.sending, ev[1].id, true);
        await this.$axios.$get(`employees/${ev[1].id}`).then(res => {
          this.singleEmployee = res.data;
          if (this.singleEmployee.charges.length == 0) {
            this.singleEmployee.charges.push({
              encumbrance: {
                charge_id: "",
                activity_begin: "",
                activity_end: ""
              }
            });
          }
          this.formData = this.singleEmployee;
          this.handleModal("employees/toggleCreateEmployeeDialog");
          this.$set(this.sending, ev[1].id, false);
        });
        this.$refs.employeeForm.initFilesUploaded();
      } catch (error) {
        this.actionMsg("Algo correu mal", "error");
      }
    },

    onDeleteEmployee(ev) {
      this.onDelete("employees", ev[1].id, "APP_UPDATE_EMPLOYEES_DATA");
    },

    resetFormData() {
      this.formData = {
        id: "",
        ic: "",
        email: "",
        facebook: "",
        twitter: "",
        linkedin: "",
        avatar: "default.svg",
        team: false,
        active: false,
        sync_user_account: false,
        is_teacher: false,
        sync_email: false,
        default_password: false,
        person: {
          id: "",
          name: "",
          gender: "m",
          birthday: "",
          phone: "",
          person_id: "",
          school_id: "",
          user: {
            id: "",
            name: "",
            email: "",
            password: ""
          }
        },
        charges: [
          {
            encumbrance: {
              charge_id: "",
              activity_begin: "",
              activity_end: ""
            }
          }
        ]
      };
    },

    async getEmployees(page) {
      await this.$store.dispatch("employees/getEmployees", page);
    },

    async getCharges(page) {
      await this.$store.dispatch("charges/getCharges");
    }
  }
};
</script>

<template>
  <div>
    <Row>
      <Col span="24">
        Estatistica Geral
      </Col>
      <Col span="24">
        Funcionalidades de procura
      </Col>
      <Col span="24" class="my-3">
        <Button type="primary" @click.stop="onCreateUser()"
          >Registar Utilizador</Button
        >
        <Button v-if="selected.length>1" type="primary" @click.stop="onDelete('users','','APP_UPDATE_USERS_DATA', true)">Elminar</Button
        >
        <create-user></create-user>
        <update-user></update-user>
      </Col>
      <Divider></Divider>
      <Col span="24">
        <Table
          stripe
          border
          ref="selection"
          :columns="user_table_header"
          :data="users"
          context-menu
          show-context-menu
          @on-contextmenu="handleContextMenu"
          @on-selection-change="handleSelectUser"
        >
          <template slot="contextMenu">
           <DropdownItem @click.native="handleContextMenuStatus"
              >{{context_user.status?'Desativar':'Ativar'}}</DropdownItem
            >
            <DropdownItem @click.native="handleContextMenuEdit"
              >Editar</DropdownItem
            >
            <DropdownItem
              @click.native="handleContextMenuDelete"
              style="color: #ed4014"
              >Eliminar</DropdownItem
            >
          </template>
        </Table>
        <!--<Pagination
          :data_source="pagination"
          @paginate="getUsers($event)"
        ></Pagination>-->
      </Col>
    </Row>
  </div>
</template>

<script>
import { log } from "util";
import { mapGetters } from "vuex";
import { handleActivations, deleteDatas } from "@/mixins/appRequest";

export default {
  name: "UsersIndex",
  layout: "admin",
  mixins: [handleActivations, deleteDatas],

  async fetch({ store }) {
    await store.dispatch("users/getUsers", 1);
  },

  data() {
    return {
      selected: [],
      context_user: {},
      user_table_header: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "Nome",
          render: (h, params) => <span>{params.row.person.name}</span>,
          sortable: true
        },
        {
          title: "Email",
          key: "email",
          sortable: true
        },

        {
          title: "Estado",
          key: "status",
          align: "center",
          width: 150,
          render: (h, params) => {
            const row = params.row;
            const color = row.status ? "success" : "warning";
            const text = row.status ? "Activo" : "Disativo";
            return h(
              "Button",
              {
                props: {
                  type: color,
                  size: "small",
                  ghost: true,
                  loading: this.loadAtivaction[row.id]
                },
                on: {
                  click: () => {
                    this.toggleStatus(
                      "users/user-activation",
                      row.id,
                      row.status,
                      "Utilizador",
                      "APP_UPDATE_USERS_DATA"
                    );
                  }
                }
              },
              this.loadAtivaction[row.id] && row.status
                ? "Desativanto..."
                : this.loadAtivaction[row.id] && !row.status
                ? "Ativando..."
                : text
            );
          }
        },

        {
          title: "Oerações",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            //  :loading="update_sending[item.id]"
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                    loading: this.sending[params.row.id]
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.onUpdateUser(params.row.id);
                    }
                  }
                },
                [
                  h("Icon", {
                    props: {
                      type: "ios-create",
                      size: "16"
                    }
                  })
                ]
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    loading: this.deleting[params.row.id]
                  },
                  on: {
                    click: () => {
                      this.onDelete(
                        "users",
                        params.row.id,
                        "APP_UPDATE_USERS_DATA"
                      );
                      // this.onDeleteUser(params.index);
                    }
                  }
                },
                this.deleting[params.row.id]
                  ? "..."
                  : [
                      h("Icon", {
                        props: {
                          type: "ios-trash",
                          size: "16"
                        }
                      })
                    ]
              )
            ]);
          }
        }
      ],
      sending: {},
      single_user: []
    };
  },

  computed: {
    ...mapGetters({
      users: "users/users",
      pagination: "users/pagination"
    })
  },

  async created() {
    await this.$store.dispatch("permissions/getPermissions");
    await this.$store.dispatch("permissions/getRoles");
    if (process.client) {
      window.getApp.$on("APP_UPDATE_USERS_DATA", () => {
        this.getUsers(1);
      });
    }
  },
  methods: {
    handleSelectUser(selectedItems) {
      this.selected=selectedItems;
      console.log(this.selected);
    },

   
    handleContextMenu(row) {
      this.context_user = row;
    },
     handleContextMenuStatus() {
       this.toggleStatus("users/user-activation", this.context_user.id, this.context_user.status,"Utilizador","APP_UPDATE_USERS_DATA");                
    },
    handleContextMenuEdit() {
      this.onUpdateUser(this.context_user.id);                    
    },
    handleContextMenuDelete() {
       this.onDelete("users",this.context_user.id, "APP_UPDATE_USERS_DATA");
    },
    async getUsers(page) {
      await this.$store.dispatch("users/getUsers", page);
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    async onCreateUser() {
      this.handleModal("users/toggleCreateUserDialog");
    },
    onUpdateUser(id) {
      try {
        this.$set(this.sending, id, true);
        this.$axios.$get(`users/${id}`).then(res => {
          process.client
            ? window.getApp.$emit("APP_ON_UPDATE_USER", res.data)
            : "";
          this.$set(this.sending, id, false);
          // this.$store.commit("users/toggleUpdateUserDialog");
          this.handleModal("users/toggleUpdateUserDialog");
        });
      } catch (error) {}

      // this.$set(this.sending, id, true);
      // try {
      //   let { data } = await this.$axios.$get(`users/${id}`);
      //   this.$data.single_user = data;
      //   this.$set(this.sending, id, false);
      //   this.$store.commit("users/toggleUpdateUserDialog");

      //   process.client
      //     ? window.getApp.$emit("APP_ON_UPDATE_USER", this.$data.single_user)
      //     : "";
      // } catch (error) {}
    },
    onDeleteUser(index) {
      console.log(this.users.splice(index, 1));
      // this.users.splice(index, 1);
    }
  },
  components: {
    CreateUser: () => import("@/components/backend/users/CreateUser"),
    UpdateUser: () => import("@/components/backend/users/UpdateUser"),
    Pagination: () => import("@/components/common/Pagination")
  }
};
</script>

<style lang="scss" scoped></style>

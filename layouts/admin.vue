<template>
  <div class="border-white bored-1 bg-gray-200 relative overflow-hidden">
    <Layout class="h-screen">
      <Sider
        width="250"
        ref="side1"
        hide-trigger
        collapsible
        :collapsed-width="78"
        v-model="isCollapsed"
        class="bg-gray-900"
      >
        <div
          class="p-3 pl-6 h-16 w-full box-border flex justify-start items-center bg-gray-800"
        >
          <span
            class="text-gray-100 font-bold text-2xl"
            :class="isCollapsed ? 'text-lg font-semibold' : ''"
            >EICM<span v-show="!isCollapsed" class="font-light text-xl"
              >-GDC</span
            >
          </span>
          <!-- <img
            class="w-32 text-gray-100"
            :src="isCollapsed ? 'logo/tiny_logo.svg' : 'logo/logo.svg'"
          />-->
        </div>
        <Menu
          theme="light"
          width="auto"
          class="bg-gray-900"
          :class="menuitemClasses"
          accordion
        >
          <MenuItem name="dashboard">
            <Icon size="20" type="ios-square" />
            <span>Dashboard</span>
          </MenuItem>

          <Submenu name="sys">
            <template slot="title">
              <Icon size="20" type="ios-cog" />
              <span :class="isCollapsed ? 'hidden' : ''">
                Sistema
              </span>
            </template>
            <MenuItem :to="{ name: 'admin-sys-users' }" name="sys-users">
              Gestão de Utilizadores</MenuItem
            >
            <MenuItem :to="{ name: 'admin-sys-permissions' }" name="sys-roles"
              >Gestão de Permissções de Acesso</MenuItem
            >
            <!--<MenuItem :to="{ name: 'admin-sys-roles' }" name="sys-permissions"
              >Permissões</MenuItem
            >-->
          </Submenu>
          <Submenu name="institution">
            <template slot="title">
              <Icon size="20" type="ios-home" />
              Instituição
            </template>
            <MenuGroup title="INFORMAÇOES">
              <MenuItem
                name="institution-about"
                :to="{ name: 'admin-institution-school' }"
                >Minha Escola</MenuItem
              >
              <MenuItem name="institution-history">Historia</MenuItem>
              <MenuItem name="institution-guidelines">Diretrizes</MenuItem>
            </MenuGroup>
            <MenuGroup title="RECURSOS">
              <MenuItem name="institution-collaborators" :to="{ name: 'admin-institution-collaborators' }"
                >Colaboradores</MenuItem
              >
              <MenuItem name="institution-team">Equipas</MenuItem>
            </MenuGroup>
          </Submenu>
          <Submenu name="course">
            <template slot="title">
              <Icon size="20" type="ios-school" />
              Cursos e Formações
            </template>
            <MenuItem name="course-course" :to="{ name: 'admin-formations-courses' }">Cursos</MenuItem>
            <MenuItem name="course-subject">Disciplinas</MenuItem>
            <MenuItem name="course-category">Categogias</MenuItem>
          </Submenu>
          <Submenu name="cms">
            <template slot="title">
              <Icon type="ios-paper" />
              CMS
            </template>
            <MenuItem name="cms-categories">Categorias</MenuItem>
            <MenuItem name="cms-tags">Marcadores</MenuItem>
            <MenuItem name="cms-media">Media</MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
        <Header class="bg-white shadow-sm p-0">
          <div class="flex justify-between">
            <div>
              <Icon
                @click.native="collapsedSider"
                :class="rotateIcon"
                :style="{ margin: '0 20px' }"
                type="md-menu"
                size="24"
              ></Icon>
            </div>
            <div class="flex items-center justify-center">
              <Icon
                @click.native="handleFullScreen"
                :style="{ margin: '0 20px' }"
                type="ios-expand"
                size="24"
                class="cursor-pointer"
              ></Icon>
              <Dropdown
                v-on:on-click="handleUserDropdownEvents($event)"
                trigger="hover"
                style="margin-left: 20px"
              >
                <a href="javascript:void(0)">
                  <Avatar class="cursor-pointer mr-5" src="teams/team1.png" />
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="perfil"
                    ><Icon
                      size="20"
                      class="mr-3"
                      type="ios-person"
                    />Perfil</DropdownItem
                  >
                  <DropdownItem name="logout"
                    ><Icon
                      size="20"
                      class="mr-3"
                      type="md-log-out"
                    />Logout</DropdownItem
                  >
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content class="m-5 p-3 bg-white">
          <Nuxt />
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import Util from "@/utility";

export default {
  name: "AdminLayout",

  middleware: ["auth"],

  created() {
    process.client ? (window.getApp = this) : "";
    this.vueGates(); // Uma opção crítica, mas no caso de problema é so chama-lo em cada componente explicitamente
  },

  data() {
    return {
      isCollapsed: false,
      visible: false
    };
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    handleUserDropdownEvents(ev) {
      switch (ev) {
        case "perfil":
          console.log("ver perfil");
          break;
        case "logout":
          this.logout();
          break;

        default:
          break;
      }
    },

    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    handleFullScreen() {
      Util.toggleFullScreen();
    },
    handleOpen() {
      this.visible = true;
    },
    handleClose() {
      this.visible = false;
    }
  }
};
</script>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>

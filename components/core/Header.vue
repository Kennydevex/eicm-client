<template>
  <div class="shadow-lg navbar">
    <coreHamburger
      :is-active="sidebar.opened"
      @toggleClick="toggleSideBar"
      class="hamburger-container"
    />

    <coreBreadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item icon="el-icon-user">
            <span>{{ "Kenny Silva" }}</span>
          </el-dropdown-item>
          <nuxt-link to="/" divided>
            <el-dropdown-item icon="el-icon-s-home" divided>
              Início
            </el-dropdown-item>
          </nuxt-link>
        
          <el-dropdown-item divided>
            <span @click="logout">Terminar sessão</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["sidebar", "avatar", "auth"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      console.log("Logout");
      //   await this.$store.dispatch("auth/logout");
      this.$router.push(`/`);
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;
        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
    .avatar-container {
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

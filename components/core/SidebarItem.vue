<template>
  <div v-if="!item.hidden">
    <el-menu-item
      :index="item.name"
      :route="{ path: item.path }"
      v-if="!item.children"
      :key="item.name"
    >
      <i
        v-if="item.meta && item.meta.icon"
        :class="`el-icon-` + item.meta.icon"
        class="icon"
      ></i>
      <span slot="title">{{ item.meta.title }}</span>
    </el-menu-item>

    <el-submenu :index="item.name" v-else>
      <template slot="title">
        <i
          v-if="item.meta && item.meta.icon"
          :class="`el-icon-` + item.meta.icon"
          class="icon"
        ></i>
        <span slot="title">{{ item.meta.title }}</span>
      </template>
      <el-menu-item
        v-for="subMenu in item.children"
        :index="subMenu.name"
        :route="{ path: subMenu.path }"
        :key="subMenu.name"
      >
        <span>{{ subMenu.meta.title }}</span>
      </el-menu-item>
    </el-submenu>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.icon {
  font-size: 20px;
}
.menu-vertical:not(.el-menu--collapse) {
  width: 256px;
}
.el-menu--collapse {
  width: 80px;
  .collapse-text-center {
    text-align: center;
  }
}
</style>
